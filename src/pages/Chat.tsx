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
  { kind: 'step', label: 'hardware initialization',        ms: 55  },
  { kind: 'step', label: 'memory check: 16384MB',          ms: 80  },
  { kind: 'step', label: 'kernel pd-linux 6.1.0',          ms: 115 },
  { kind: 'step', label: 'filesystems [ext4]',             ms: 70  },
  { kind: 'blank' },
  { kind: 'step', label: 'network subsystem',              ms: 60  },
  { kind: 'step', label: 'eth0  172.16.0.1/24',            ms: 90  },
  { kind: 'blank' },
  { kind: 'step', label: 'portfolio services',             ms: 65  },
  { kind: 'step', label: 'knowledge base  [6.5k tokens]',  ms: 160 },
  { kind: 'step', label: 'github context fetch',           ms: 210 },
  { kind: 'step', label: 'groq api  llama-3.3-70b',        ms: 125 },
  { kind: 'blank' },
  { kind: 'text', text: '-'.repeat(44) },
  { kind: 'blank' },
  { kind: 'text', text: '  pd.bot v1.0  operational.' },
  { kind: 'blank' },
];

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL        = 'llama-3.3-70b-versatile';
const MAX_HISTORY  = 20;

function uid() { return Math.random().toString(36).slice(2, 9); }

function BootLineEl({ line, idx }: { line: BootLine; idx: number }) {
  if (line.kind === 'blank') return <div key={idx} className="bl-gap" />;
  if (line.kind === 'text')  return <div key={idx} className="bl-text">{line.text}</div>;

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
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [apiErr, setApiErr]             = useState(false);
  const [streaming, setStreaming]       = useState('');
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootDone, setBootDone]         = useState(false);

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

  // ── Fetch system prompt ─────────────────────────────────────────
  useEffect(() => {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) { setApiErr(true); return; }
    fetchGithubContext().then(ctx => {
      setSystemPrompt(SYSTEM_PROMPT.replace('{GITHUB_CONTEXT}', ctx));
      setMessages([{
        id: uid(), role: 'assistant',
        content: 'pd.bot online. Systems nominal.\nQuery Priyanshu Doshi\'s portfolio. All data loaded.',
      }]);
    });
  }, []);

  // ── Scroll to bottom ────────────────────────────────────────────
  const scrollBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(scrollBottom, [messages, streaming, visibleLines, bootDone, scrollBottom]);

  useEffect(() => {
    if (bootDone) setTimeout(() => inputRef.current?.focus(), 80);
  }, [bootDone]);

  // ── Send ────────────────────────────────────────────────────────
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading || !systemPrompt) return;
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text.trim() };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setInput('');
    setLoading(true);
    setStreaming('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...nextMsgs.slice(-MAX_HISTORY).map(m => ({ role: m.role, content: m.content })),
          ],
          stream: true,
          temperature: 0.65,
          max_tokens: 512,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
            if (delta) { acc += delta; setStreaming(acc); }
          } catch { /* skip */ }
        }
      }

      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: acc }]);
      setStreaming('');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => [...prev, {
        id: uid(), role: 'assistant',
        content: `[ERR] ${err instanceof Error ? err.message : 'unknown'}\nCheck VITE_GROQ_API_KEY in .env.local`,
      }]);
      setStreaming('');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [loading, systemPrompt, messages]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); send(input); }
    if (e.key === 'c' && e.ctrlKey) { e.preventDefault(); stop(); }
  };

  const stop = () => {
    abortRef.current?.abort();
    setLoading(false);
    if (streaming) {
      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: streaming }]);
      setStreaming('');
    }
  };

  const isReady = !!systemPrompt && !apiErr;

  return (
    <div className="chat-page">
      <div className="chat-terminal">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="term-header">
          <Link to="/" className="term-exit">[exit]</Link>
          <span className="term-id">pd@workstation :: pd.bot v1.0</span>
          <span className={`term-status ${isReady ? 'st-ok' : apiErr ? 'st-err' : 'st-wait'}`}>
            [{isReady ? 'connected' : apiErr ? 'no key' : 'init...'}]
          </span>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div
          className="term-body"
          ref={bodyRef}
          onClick={() => !loading && inputRef.current?.focus()}
        >
          {!bootDone ? (
            /* Boot phase */
            <>
              {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
                <BootLineEl key={i} line={l} idx={i} />
              ))}
              {visibleLines < BOOT_LINES.length && (
                <span className="boot-caret">_</span>
              )}
            </>
          ) : (
            /* Chat phase */
            <>
              {apiErr && (
                <div className="err-line">
                  [ERR] VITE_GROQ_API_KEY not set. Add to .env.local and restart.
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
                  <pre className="msg-bot processing">processing...</pre>
                </div>
              )}

              {/* Inline input line */}
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
