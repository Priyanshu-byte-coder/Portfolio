import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SYSTEM_PROMPT } from '../knowledge/context';
import { fetchGithubContext } from '../lib/github';
import './Chat.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
}

type BootLine =
  | { kind: 'blank' }
  | { kind: 'text'; text: string }
  | { kind: 'step'; tag: string; label: string; badge: 'OK' | 'PASS' | 'ERR'; ms: number };

const W = 50;

function step(tag: string, label: string, badge: 'OK' | 'PASS' | 'ERR', ms: number): BootLine {
  return { kind: 'step', tag, label, badge, ms };
}

const now = new Date();
const SESSION_DATE = now.toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
});
const SESSION_TIME = now.toLocaleTimeString('en-US', {
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
});

const BOOT_LINES: BootLine[] = [
  { kind: 'text', text: 'PD-Workstation  BIOS v3.14.0   Build 2026.05' },
  { kind: 'text', text: '─'.repeat(W) },
  { kind: 'blank' },
  step('BIOS', 'Initializing hardware components', 'OK', 55),
  step('BIOS', 'Memory check: 16384MB', 'PASS', 80),
  step('KRNL', 'Loading pd-linux 6.1.0-pd-generic', 'OK', 110),
  step('  FS', 'Mounting filesystems [ext4, ro→rw]', 'OK', 75),
  { kind: 'blank' },
  step(' NET', 'Starting network subsystem', 'OK', 60),
  step(' NET', 'Bringing up eth0  [172.16.0.1/24]', 'OK', 100),
  { kind: 'blank' },
  step('INIT', 'Starting portfolio services', 'OK', 70),
  step('  AI', 'Loading knowledge base  [6.5k tokens]', 'OK', 160),
  step('  AI', 'Fetching GitHub context  [Priyanshu-byte-coder]', 'OK', 210),
  step(' API', 'Connecting to Groq  llama-3.3-70b-versatile', 'OK', 130),
  { kind: 'blank' },
  { kind: 'text', text: '─'.repeat(W) },
  { kind: 'blank' },
  { kind: 'text', text: '  pd.bot  v1.0   all systems nominal' },
  { kind: 'text', text: `  Session started: ${SESSION_DATE}  ${SESSION_TIME}` },
  { kind: 'blank' },
  { kind: 'text', text: '─'.repeat(W) },
  { kind: 'blank' },
  { kind: 'text', text: '  Type a question to begin.' },
  { kind: 'blank' },
];

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY = 20;

const SUGGESTIONS = [
  'What has Priyanshu built?',
  'Tell me about his IEEE publication.',
  'Top hackathon wins?',
  'How did LUMIN.AI work technically?',
  'What stack does he use?',
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function renderBootLine(line: BootLine, i: number) {
  if (line.kind === 'blank') return <div key={i} className="bl-blank" aria-hidden />;
  if (line.kind === 'text') return <div key={i} className="bl-text">{line.text}</div>;

  const maxLabel = 38;
  const label = line.label.length > maxLabel ? line.label.slice(0, maxLabel - 1) + '…' : line.label;
  const dots = '·'.repeat(Math.max(2, maxLabel - label.length + 3));

  return (
    <div key={i} className="bl-step">
      <span className="bl-tag">[{line.tag}]</span>
      <span className="bl-label">{label}</span>
      <span className="bl-dots">{dots}</span>
      <span className={`bl-badge bl-badge--${line.badge}`}>{line.badge}</span>
    </div>
  );
}

export const Chat: React.FC = () => {
  const [messages, setMessages]           = useState<Message[]>([]);
  const [input, setInput]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const [systemPrompt, setSystemPrompt]   = useState<string | null>(null);
  const [apiStatus, setApiStatus]         = useState<'ok' | 'error'>('ok');
  const [streamingContent, setStreaming]  = useState('');
  const [visibleLines, setVisibleLines]   = useState(0);
  const [bootDone, setBootDone]           = useState(false);

  const bootRef  = useRef<HTMLDivElement>(null);
  const msgsRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Boot animation ──────────────────────────────────────────
  useEffect(() => {
    let cum = 300;
    const delays = BOOT_LINES.map(line => {
      cum += line.kind === 'step' ? line.ms : line.kind === 'blank' ? 25 : 40;
      return cum;
    });
    const timers = delays.map((d, idx) =>
      window.setTimeout(() => setVisibleLines(idx + 1), d)
    );
    const doneTimer = window.setTimeout(() => setBootDone(true), cum + 700);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    bootRef.current?.scrollTo({ top: bootRef.current.scrollHeight });
  }, [visibleLines]);

  // ── Build system prompt ─────────────────────────────────────
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) { setApiStatus('error'); return; }
    fetchGithubContext().then(ctx => {
      setSystemPrompt(SYSTEM_PROMPT.replace('{GITHUB_CONTEXT}', ctx));
      setMessages([{
        id: uid(), role: 'assistant', ts: Date.now(),
        content: 'pd.bot ready.\n\nAsk me anything about Priyanshu — projects, research, achievements, stack choices, or why he thought building a PLC-controlled gantry robot for a hackathon was a reasonable idea.',
      }]);
    });
  }, []);

  // ── Auto-scroll chat ────────────────────────────────────────
  useEffect(() => {
    msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (bootDone) setTimeout(() => inputRef.current?.focus(), 120);
  }, [bootDone]);

  // ── Send message ────────────────────────────────────────────
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading || !systemPrompt) return;
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text.trim(), ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreaming('');

    const history = [...messages, userMsg]
      .slice(-MAX_HISTORY)
      .map(m => ({ role: m.role, content: m.content }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'system', content: systemPrompt }, ...history],
          stream: true,
          temperature: 0.72,
          max_tokens: 1024,
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

      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: acc, ts: Date.now() }]);
      setStreaming('');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => [...prev, {
        id: uid(), role: 'assistant', ts: Date.now(),
        content: `[ERR] ${err instanceof Error ? err.message : 'Unknown error'}\nVerify VITE_GROQ_API_KEY in .env.local`,
      }]);
      setStreaming('');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [loading, systemPrompt, messages]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const stop = () => {
    abortRef.current?.abort();
    setLoading(false);
    if (streamingContent) {
      setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: streamingContent, ts: Date.now() }]);
      setStreaming('');
    }
  };

  const fmt = (ts: number) =>
    new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const isReady = !!systemPrompt && apiStatus === 'ok';

  return (
    <div className="chat-page">
      <div className="chat-terminal">

        {/* ── UNIX header bar ── */}
        <div className="term-header">
          <Link to="/" className="term-back">← back</Link>
          <span className="term-title">pd@workstation  <span className="term-sep">::</span>  pd.bot v1.0</span>
          <span className={`term-conn ${isReady ? 'conn-ok' : apiStatus === 'error' ? 'conn-err' : 'conn-wait'}`}>
            <span className="conn-dot" />
            {isReady ? 'CONNECTED' : apiStatus === 'error' ? 'NO KEY' : 'INIT'}
          </span>
        </div>

        {/* ── Boot screen ── */}
        {!bootDone ? (
          <div className="boot-screen" ref={bootRef}>
            {BOOT_LINES.slice(0, visibleLines).map((l, i) => renderBootLine(l, i))}
            {visibleLines < BOOT_LINES.length && (
              <span className="boot-caret">_</span>
            )}
          </div>
        ) : (
          <>
            {/* ── Messages ── */}
            <div className="chat-messages" ref={msgsRef}>
              {apiStatus === 'error' && (
                <div className="error-line">
                  [ERR] VITE_GROQ_API_KEY not found — add to .env.local and restart
                </div>
              )}

              {messages.map(m => (
                <div key={m.id} className={`msg msg--${m.role}`}>
                  {m.role === 'user' ? (
                    <>
                      <div className="msg-user-line">
                        <span className="unix-prompt">pd@workstation:~$&nbsp;</span>
                        <span className="user-text">{m.content}</span>
                      </div>
                      <div className="msg-meta">{fmt(m.ts)}</div>
                    </>
                  ) : (
                    <>
                      <pre className="assistant-output">{m.content}</pre>
                      <div className="msg-meta">{fmt(m.ts)}</div>
                    </>
                  )}
                </div>
              ))}

              {streamingContent && (
                <div className="msg msg--assistant">
                  <pre className="assistant-output">
                    {streamingContent}<span className="inline-caret">_</span>
                  </pre>
                </div>
              )}

              {loading && !streamingContent && (
                <div className="msg msg--assistant">
                  <span className="thinking">
                    processing<span className="thinking-dots"><span /><span /><span /></span>
                  </span>
                </div>
              )}

              <div ref={msgsRef} />
            </div>

            {/* ── Suggestions ── */}
            {messages.length <= 1 && !loading && (
              <div className="suggestions">
                <div className="suggestions-label">-- suggested queries --</div>
                <div className="suggestions-grid">
                  {SUGGESTIONS.map(s => (
                    <button key={s} className="suggestion-btn" onClick={() => send(s)}>
                      <span className="sug-arrow">&gt;&nbsp;</span>{s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input ── */}
            <div className="input-row">
              <span className="unix-prompt input-prompt">pd@workstation:~$&nbsp;</span>
              <textarea
                ref={inputRef}
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="query..."
                disabled={!isReady || loading}
                rows={1}
              />
              {loading
                ? <button className="cmd-btn cmd-stop" onClick={stop} title="^C">^C</button>
                : <button className="cmd-btn" onClick={() => send(input)} disabled={!input.trim() || !isReady}>RET</button>
              }
            </div>
          </>
        )}

        {/* ── Status bar ── */}
        <div className="statusbar">
          <span>pd.bot v1.0</span>
          <span className="sb-sep">|</span>
          <span className="sb-model">{MODEL}</span>
          <span className="sb-fill" />
          <span>ENTER: send</span>
          <span className="sb-sep">|</span>
          <span>SHIFT+ENTER: newline</span>
          <span className="sb-sep">|</span>
          <span>^C: stop</span>
        </div>
      </div>
    </div>
  );
};
