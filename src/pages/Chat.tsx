import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SYSTEM_PROMPT } from '../knowledge/context';
import { fetchGithubContext } from '../lib/github';
import './Chat.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type BootLine =
  | { kind: 'blank' }
  | { kind: 'text'; text: string }
  | { kind: 'step'; label: string; ms: number };

const BOOT_LINES: BootLine[] = [
  { kind: 'text', text: 'PD-Workstation  BIOS v3.14   2026.05.14' },
  { kind: 'text', text: '-'.repeat(44) },
  { kind: 'blank' },
  { kind: 'step', label: 'hardware initialization',          ms: 55  },
  { kind: 'step', label: 'memory check: 16384MB',            ms: 80  },
  { kind: 'step', label: 'kernel pd-linux 6.1.0',            ms: 115 },
  { kind: 'step', label: 'filesystems [ext4]',               ms: 70  },
  { kind: 'blank' },
  { kind: 'step', label: 'network subsystem',                ms: 60  },
  { kind: 'step', label: 'eth0  172.16.0.1/24',              ms: 90  },
  { kind: 'blank' },
  { kind: 'step', label: 'portfolio services',               ms: 65  },
  { kind: 'step', label: 'knowledge base  [6.5k tokens]',    ms: 160 },
  { kind: 'step', label: 'github context fetch',             ms: 210 },
  { kind: 'step', label: 'api keys  [gemini-2.5 + groq]',    ms: 90  },
  { kind: 'blank' },
  { kind: 'text', text: '-'.repeat(44) },
  { kind: 'blank' },
  { kind: 'text', text: '  JARVIS v1.0  operational.' },
  { kind: 'blank' },
];

// ── Gemini streaming ────────────────────────────────────────────────
async function streamGemini(
  systemPrompt: string,
  history: { role: string; content: string }[],
  apiKey: string,
  signal: AbortSignal,
  onChunk: (acc: string) => void,
): Promise<string> {
  // Gemini requires conversation to start with a user message
  const firstUser = history.findIndex(m => m.role === 'user');
  const contents = history.slice(firstUser).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { temperature: 0.65, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${msg.slice(0, 120)}`);
  }

  const reader  = res.body!.getReader();
  const decoder = new TextDecoder();
  let acc = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const line of decoder.decode(value, { stream: true }).split('\n')) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (!data || data === '[DONE]') continue;
      try {
        const delta = JSON.parse(data).candidates?.[0]?.content?.parts?.[0]?.text;
        if (delta) { acc += delta; onChunk(acc); }
      } catch { /* skip malformed */ }
    }
  }

  return acc;
}

// ── Groq streaming ──────────────────────────────────────────────────
async function streamGroq(
  systemPrompt: string,
  history: { role: string; content: string }[],
  apiKey: string,
  signal: AbortSignal,
  onChunk: (acc: string) => void,
): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    signal,
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, ...history],
      stream: true,
      temperature: 0.65,
      max_tokens: 512,
    }),
  });

  if (!res.ok) throw new Error(`Groq ${res.status}`);

  const reader  = res.body!.getReader();
  const decoder = new TextDecoder();
  let acc = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const line of decoder.decode(value, { stream: true }).split('\n')) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      try {
        const delta = JSON.parse(data).choices?.[0]?.delta?.content;
        if (delta) { acc += delta; onChunk(acc); }
      } catch { /* skip */ }
    }
  }

  return acc;
}

// ────────────────────────────────────────────────────────────────────
const MAX_HISTORY = 20;
function uid() { return Math.random().toString(36).slice(2, 9); }

function BootLineEl({ line }: { line: BootLine }) {
  if (line.kind === 'blank') return <div className="bl-gap" />;
  if (line.kind === 'text')  return <div className="bl-text">{line.text}</div>;
  const cap   = 32;
  const label = line.label.length > cap ? line.label.slice(0, cap) : line.label;
  const dots  = '.'.repeat(Math.max(3, cap - label.length + 5));
  return (
    <div className="bl-step">
      <span className="bl-label">  {label}</span>
      <span className="bl-dots">{dots}</span>
      <span className="bl-ok">done</span>
    </div>
  );
}

export const Chat: React.FC = () => {
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const [systemPrompt, setSystemPrompt]   = useState<string | null>(null);
  const [apiErr, setApiErr]               = useState(false);
  const [streaming, setStreaming]         = useState('');
  const [visibleLines, setVisibleLines]   = useState(0);
  const [bootDone, setBootDone]           = useState(false);
  const [activeProvider, setProvider]     = useState<'gemini' | 'groq' | 'fallback' | null>(null);

  const bodyRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Boot animation ──────────────────────────────────────────────
  useEffect(() => {
    let cum = 250;
    const delays = BOOT_LINES.map(l => {
      cum += l.kind === 'step' ? l.ms : l.kind === 'blank' ? 20 : 35;
      return cum;
    });
    const timers = delays.map((d, i) => window.setTimeout(() => setVisibleLines(i + 1), d));
    const done   = window.setTimeout(() => setBootDone(true), cum + 550);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  // ── System prompt ───────────────────────────────────────────────
  useEffect(() => {
    const gKey = import.meta.env.VITE_GEMINI_API_KEY;
    const qKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!gKey && !qKey) { setApiErr(true); return; }

    fetchGithubContext().then(ctx => {
      setSystemPrompt(SYSTEM_PROMPT.replace('{GITHUB_CONTEXT}', ctx));
      setMessages([{
        id: uid(), role: 'assistant',
        content: 'JARVIS online. All systems nominal.\nPortfolio data loaded. GitHub context synced.\nState your query.',
      }]);
    });
  }, []);

  // ── Scroll ──────────────────────────────────────────────────────
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, visibleLines, bootDone]);

  useEffect(() => {
    if (bootDone) setTimeout(() => inputRef.current?.focus(), 80);
  }, [bootDone]);

  // ── Send with provider fallback ─────────────────────────────────
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading || !systemPrompt) return;

    const gKey = import.meta.env.VITE_GEMINI_API_KEY;
    const qKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!gKey && !qKey) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text.trim() };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setInput('');
    setLoading(true);
    setStreaming('');

    const history = nextMsgs
      .slice(-MAX_HISTORY)
      .map(m => ({ role: m.role, content: m.content }));

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    const onChunk = (acc: string) => setStreaming(acc);

    let acc = '';

    try {
      // ── Try Groq first ──
      if (qKey) {
        try {
          setProvider('groq');
          acc = await streamGroq(systemPrompt, history, qKey, signal, onChunk);
        } catch (err) {
          if (err instanceof Error && err.name === 'AbortError') throw err;
          // Groq failed — fall back to Gemini
          if (gKey) {
            setProvider('fallback');
            setStreaming('');
            acc = await streamGemini(systemPrompt, history, gKey, signal, onChunk);
          } else {
            throw err; // no fallback available
          }
        }
      } else if (gKey) {
        // ── Gemini only ──
        setProvider('gemini');
        acc = await streamGemini(systemPrompt, history, gKey, signal, onChunk);
      }

      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: acc }]);
      setStreaming('');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => [...prev, {
        id: uid(), role: 'assistant',
        content: `[ERR] ${err instanceof Error ? err.message : 'unknown'}\nBoth providers failed or no API key set.`,
      }]);
      setStreaming('');
    } finally {
      setLoading(false);
      setProvider(prev => prev === 'fallback' ? 'gemini' : prev);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [loading, systemPrompt, messages]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); send(input); }
    if (e.key === 'c' && e.ctrlKey) { e.preventDefault(); doStop(); }
  };

  const doStop = () => {
    abortRef.current?.abort();
    setLoading(false);
    if (streaming) {
      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: streaming }]);
      setStreaming('');
    }
  };

  const hasKey = !!(import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GROQ_API_KEY);
  const isReady = !!systemPrompt && !apiErr && hasKey;

  const providerLabel =
    activeProvider === 'groq'     ? 'groq/llama-3.3-70b' :
    activeProvider === 'gemini'   ? 'gemini-2.5-flash' :
    activeProvider === 'fallback' ? 'switching...' :
    import.meta.env.VITE_GROQ_API_KEY ? 'groq/llama-3.3-70b' : 'gemini-2.5-flash';

  return (
    <div className="chat-page">
      <div className="chat-terminal">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="term-header">
          <Link to="/" className="term-exit">[exit]</Link>
          <span className="term-id">
            JARVIS
            <span className="term-sep"> // </span>
            Priyanshu Doshi — Portfolio Intelligence
          </span>
          <span className={`term-status ${isReady ? 'st-ok' : apiErr ? 'st-err' : 'st-wait'}`}>
            [{isReady ? providerLabel : apiErr ? 'no key' : 'init'}]
          </span>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div
          className="term-body"
          ref={bodyRef}
          onClick={() => !loading && inputRef.current?.focus()}
        >
          {!bootDone ? (
            <>
              {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
                <BootLineEl key={i} line={l} />
              ))}
              {visibleLines < BOOT_LINES.length && <span className="boot-caret">_</span>}
            </>
          ) : (
            <>
              {apiErr && (
                <div className="err-line">
                  [ERR] No API key found. Set VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY in .env.local
                </div>
              )}

              {messages.map(m => (
                <div key={m.id} className="msg-block">
                  {m.role === 'user' ? (
                    <div className="msg-user">
                      <span className="user-prompt">pd@workstation:~$&nbsp;</span>{m.content}
                    </div>
                  ) : (
                    <pre className="msg-bot">{m.content}</pre>
                  )}
                </div>
              ))}

              {streaming && (
                <div className="msg-block">
                  <pre className="msg-bot">{streaming}<span className="inline-caret">_</span></pre>
                </div>
              )}

              {loading && !streaming && (
                <div className="msg-block">
                  <pre className="msg-bot processing">
                    {activeProvider === 'fallback' ? 'groq failed. switching to gemini...' : 'processing...'}
                  </pre>
                </div>
              )}

              {!loading && (
                <div className="input-line">
                  <span className="user-prompt">pd@workstation:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="term-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKey}
                    disabled={!isReady}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              )}

              {loading && (
                <div className="ctrl-hint">^C to interrupt</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
