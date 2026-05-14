import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SYSTEM_PROMPT } from '../knowledge/context';
import { fetchGithubContext } from '../lib/github';
import './Chat.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'cmd';
  content: string;
}

type BootLine =
  | { kind: 'blank' }
  | { kind: 'text'; text: string }
  | { kind: 'step'; label: string; ms: number };

// ─── Boot sequence ────────────────────────────────────────────────────────────

const BOOT_LINES: BootLine[] = [
  { kind: 'text', text: 'PD-Workstation  BIOS v3.14   2026.05.14' },
  { kind: 'text', text: '-'.repeat(44) },
  { kind: 'blank' },
  { kind: 'step', label: 'hardware initialization',       ms: 55  },
  { kind: 'step', label: 'memory check: 16384MB',         ms: 80  },
  { kind: 'step', label: 'kernel pd-linux 6.1.0',         ms: 115 },
  { kind: 'step', label: 'filesystems [ext4]',            ms: 70  },
  { kind: 'blank' },
  { kind: 'step', label: 'network subsystem',             ms: 60  },
  { kind: 'step', label: 'eth0  172.16.0.1/24',           ms: 90  },
  { kind: 'blank' },
  { kind: 'step', label: 'portfolio services',            ms: 65  },
  { kind: 'step', label: 'knowledge base  [6.5k tokens]', ms: 160 },
  { kind: 'step', label: 'github context fetch',          ms: 210 },
  { kind: 'step', label: 'groq api  llama-3.3-70b',       ms: 125 },
  { kind: 'blank' },
  { kind: 'text', text: '-'.repeat(44) },
  { kind: 'blank' },
  { kind: 'text', text: '  JARVIS v1.0  operational.' },
  { kind: 'blank' },
];

// ─── Shutdown sequence ────────────────────────────────────────────────────────

const SHUTDOWN_LINES = [
  'JARVIS shutdown initiated.',
  '  flushing conversation memory........ done',
  '  closing API connections............. done',
  '  writing session log................. done',
  '  unmounting filesystems.............. done',
  '',
  'session terminated. goodbye.',
  '',
];

// ─── Built-in command outputs ─────────────────────────────────────────────────

const MAN_PAGE = `JARVIS(1)              Portfolio Intelligence               JARVIS(1)

NAME
  jarvis - Priyanshu Doshi portfolio intelligence terminal

SYNOPSIS
  <natural language query>
  <built-in command>

BUILT-IN COMMANDS
  clear            clear the terminal screen
  exit             terminate session  (also: logout, quit)
  history          display command history
  whoami           current user
  pwd              print working directory
  uname -a         kernel and system information
  uptime           session duration
  date             current date and time
  ls               list all projects  (also: ls projects)
  cat contact      display contact information
  ps               list running processes
  neofetch         system info overview
  man jarvis       display this manual

KEYBOARD SHORTCUTS
  Ctrl+C           terminate session  (or cancel active query)
  Ctrl+L           clear screen
  Ctrl+D           logout
  Ctrl+U           clear current input line
  Tab              autocomplete command
  Arrow Up/Down    navigate command history

DESCRIPTION
  JARVIS is a read-only portfolio intelligence system.
  It answers queries about Priyanshu Doshi — projects,
  research, skills, experience, achievements, contact.
  For other tasks, consult a general-purpose AI.`;

const HELP_TEXT = `AVAILABLE QUERY DOMAINS:
  - projects and technical architecture
  - research and IEEE publication
  - skills and technology stack
  - work experience and internships
  - achievements and hackathon wins
  - contact information

BUILT-IN COMMANDS: clear, exit, logout, history, whoami,
  pwd, uname -a, uptime, date, ls, cat contact, ps, neofetch

type 'man jarvis' for full documentation.`;

const PS_OUTPUT = `  PID  STAT  COMMAND
    1  S     init
   42  S     jarvis-daemon
  137  S     knowledge-base-loader
  201  S     groq-api-client
  256  S     github-context-fetcher
  512  S     session-monitor
  777  R     bash`;

const LS_OUTPUT = `PROJECTS:
  - Spectra Scan       [DINOv2, OpenVINO, Electron, PLC]
  - LUMIN.AI           [XGBoost, Groq, FastAPI, Next.js]
  - SOLV.ai            [DistilBERT, Whisper, Twilio]
  - SENTINEL           [Raspberry Pi 5, Ollama, Flask]
  - bloom              [Supabase pgvector, Groq, Next.js]
  - devtrack           [Next.js, GitHub REST API]
  - TokenScope         [Electron, OS keychain]
  - PropSpace          [React, Zustand, React Leaflet]
  - MZHub              [Next.js, Three.js, GSAP]
  - Movie Recommender  [Scikit-learn, Streamlit, TMDb]`;

const CONTACT_OUTPUT = `CONTACT:
  email     doshipriyanshu3@gmail.com
  phone     +91 9549926195
  location  Ahmedabad, Gujarat, India
  github    github.com/Priyanshu-byte-coder
  linkedin  linkedin.com/in/priyanshu-doshi-21a54230a
  twitter   x.com/Priyanshu_26_11
  leetcode  leetcode.com/u/Priyanshu_doshi`;

const TAB_COMPLETIONS = [
  'cat contact', 'clear', 'date', 'exit', 'history',
  'logout', 'ls', 'ls projects', 'man jarvis',
  'neofetch', 'ps', 'pwd', 'quit', 'uname -a', 'uptime', 'whoami',
];

const AI_PASSTHROUGH = new Set(['help']); // these go to JARVIS AI, not local

function getNeofetch(uptime: string) {
  return `  .---.        guest@pd-workstation
 /     \\       ---------------------
|  PD  |       OS:      pd-linux 6.1.0-pd-generic
 \\     /       Host:    PD-Workstation [2026]
  '---'        Kernel:  6.1.0-pd-generic x86_64
               CPU:     Intel Core i7-12700H
               Memory:  16384MB
               Shell:   jarvis v1.0
               Model:   llama-3.3-70b-versatile
               Uptime:  ${uptime}`;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL        = 'llama-3.3-70b-versatile';
const MAX_HISTORY  = 20;

function uid() { return Math.random().toString(36).slice(2, 9); }

function formatUptime(startMs: number) {
  const s = Math.floor((Date.now() - startMs) / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

function BootLineEl({ line }: { line: BootLine }) {
  if (line.kind === 'blank') return <div className="bl-gap" />;
  if (line.kind === 'text')  return <div className="bl-text">{line.text}</div>;
  const cap   = 32;
  const label = line.label.slice(0, cap);
  const dots  = '.'.repeat(Math.max(3, cap - label.length + 5));
  return (
    <div className="bl-step">
      <span className="bl-label">  {label}</span>
      <span className="bl-dots">{dots}</span>
      <span className="bl-ok">done</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Chat: React.FC = () => {
  const navigate     = useNavigate();
  const sessionStart = useRef(Date.now());

  // Core state
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [apiErr, setApiErr]             = useState(false);
  const [streaming, setStreaming]       = useState('');

  // Boot
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootDone, setBootDone]         = useState(false);

  // Shutdown
  const [shuttingDown, setShuttingDown]     = useState(false);
  const [shutdownProgress, setShutdownProg] = useState<string[]>([]);

  // Refs
  const bodyRef      = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);
  const abortRef     = useRef<AbortController | null>(null);
  const cmdHistory   = useRef<string[]>([]);
  const histIdx      = useRef(-1);
  const savedInput   = useRef('');

  // ── Boot animation ───────────────────────────────────────────
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

  // ── System prompt fetch ──────────────────────────────────────
  useEffect(() => {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) { setApiErr(true); return; }
    fetchGithubContext().then(ctx => {
      setSystemPrompt(SYSTEM_PROMPT.replace('{GITHUB_CONTEXT}', ctx));
      setMessages([{
        id: uid(), role: 'assistant',
        content: 'JARVIS online. All systems nominal.\nPortfolio data loaded. GitHub context synced.\nState your query.',
      }]);
    });
  }, []);

  // ── Auto-scroll ──────────────────────────────────────────────
  const scrollBottom = () => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  useEffect(scrollBottom, [messages, streaming, visibleLines, bootDone, shutdownProgress]);

  useEffect(() => {
    if (bootDone && !shuttingDown) setTimeout(() => inputRef.current?.focus(), 80);
  }, [bootDone, shuttingDown]);

  // ── Shutdown sequence ────────────────────────────────────────
  const initiateShutdown = useCallback((signal?: string) => {
    setShuttingDown(true);
    setLoading(false);
    abortRef.current?.abort();

    const lines = signal
      ? [signal, '', ...SHUTDOWN_LINES]
      : [...SHUTDOWN_LINES];

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setShutdownProg(lines.slice(0, i));
      if (i >= lines.length) {
        clearInterval(timer);
        setTimeout(() => navigate('/'), 1400);
      }
    }, 130);
  }, [navigate]);

  // ── Built-in command handler ─────────────────────────────────
  const runBuiltIn = useCallback((cmd: string): string | 'CLEAR' | 'EXIT' | 'AI' => {
    const c = cmd.trim().toLowerCase();

    if (AI_PASSTHROUGH.has(c)) return 'AI';

    switch (c) {
      case 'clear':                    return 'CLEAR';
      case 'exit':
      case 'logout':
      case 'quit':                     return 'EXIT';
      case 'whoami':                   return 'guest@pd-workstation';
      case 'pwd':                      return '/home/guest/portfolio/priyanshu-doshi';
      case 'uname -a':                 return 'pd-linux 6.1.0-pd-generic #1 SMP 2026.05.14 x86_64 GNU/Linux';
      case 'date':                     return new Date().toString();
      case 'uptime': {
        const up = formatUptime(sessionStart.current);
        return `up ${up}  load avg: 0.01 0.00 0.00`;
      }
      case 'history': {
        const h = cmdHistory.current;
        return h.length === 0
          ? 'no commands in history.'
          : h.map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`).join('\n');
      }
      case 'ls':
      case 'ls projects':              return LS_OUTPUT;
      case 'cat contact':              return CONTACT_OUTPUT;
      case 'man jarvis':               return MAN_PAGE;
      case 'ps':                       return PS_OUTPUT;
      case 'neofetch':                 return getNeofetch(formatUptime(sessionStart.current));
      default: {
        // Unknown command — send to AI if it looks like a question, else error
        const looksLikeAI = !c.match(/^[a-z_\-\.]+(\s[a-z_\-\.]+)?$/) || c.split(' ').length > 2;
        return looksLikeAI ? 'AI' : `bash: ${c}: command not found\ntype 'help' or 'man jarvis' for available commands.`;
      }
    }
  }, []);

  // ── Tab completion ───────────────────────────────────────────
  const tabComplete = useCallback(() => {
    if (!input.trim()) return;
    const match = TAB_COMPLETIONS.find(c => c.startsWith(input.toLowerCase()));
    if (match) setInput(match);
  }, [input]);

  // ── History navigation ───────────────────────────────────────
  const navigateHistory = useCallback((dir: 'up' | 'down') => {
    const hist = cmdHistory.current;
    if (hist.length === 0) return;

    if (dir === 'up') {
      if (histIdx.current === -1) {
        savedInput.current = input;
        histIdx.current = hist.length - 1;
      } else if (histIdx.current > 0) {
        histIdx.current--;
      }
      setInput(hist[histIdx.current]);
    } else {
      if (histIdx.current === -1) return;
      if (histIdx.current < hist.length - 1) {
        histIdx.current++;
        setInput(hist[histIdx.current]);
      } else {
        histIdx.current = -1;
        setInput(savedInput.current);
      }
    }
  }, [input]);

  // ── Send ─────────────────────────────────────────────────────
  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const trimmed = text.trim();
    histIdx.current = -1;

    // Add to history (avoid consecutive duplicates)
    const hist = cmdHistory.current;
    if (hist[hist.length - 1] !== trimmed) {
      cmdHistory.current = [...hist, trimmed].slice(-100);
    }

    // Check built-in
    const builtinResult = runBuiltIn(trimmed);

    if (builtinResult === 'CLEAR') {
      setInput('');
      setMessages([{
        id: uid(), role: 'assistant',
        content: 'JARVIS online. All systems nominal.\nPortfolio data loaded. GitHub context synced.\nState your query.',
      }]);
      return;
    }

    if (builtinResult === 'EXIT') {
      setInput('');
      initiateShutdown();
      return;
    }

    // Show user line
    const userMsg: Message = { id: uid(), role: 'user', content: trimmed };
    setInput('');

    if (builtinResult !== 'AI') {
      // Local command output
      setMessages(prev => [
        ...prev,
        userMsg,
        { id: uid(), role: 'cmd', content: builtinResult },
      ]);
      setTimeout(() => inputRef.current?.focus(), 40);
      return;
    }

    // Send to AI
    if (!systemPrompt || apiErr) return;
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) return;

    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
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
            ...nextMsgs.slice(-MAX_HISTORY).map(m => ({
              role: m.role === 'cmd' ? 'assistant' : m.role,
              content: m.content,
            })),
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
        id: uid(), role: 'cmd',
        content: `[ERR] ${err instanceof Error ? err.message : 'unknown error'}`,
      }]);
      setStreaming('');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [loading, systemPrompt, apiErr, messages, runBuiltIn, initiateShutdown]);

  // ── Keyboard handler ─────────────────────────────────────────
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      send(input);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (loading) {
        // Cancel active query
        abortRef.current?.abort();
        setLoading(false);
        if (streaming) {
          setMessages(prev => [...prev, { id: uid(), role: 'assistant', content: streaming }]);
          setStreaming('');
        }
        setMessages(prev => [...prev, { id: uid(), role: 'cmd', content: '^C' }]);
        setTimeout(() => inputRef.current?.focus(), 40);
      } else {
        // Exit
        initiateShutdown('^C');
      }
    } else if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      if (!loading) initiateShutdown();
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setMessages([{
        id: uid(), role: 'assistant',
        content: 'JARVIS online. All systems nominal.\nPortfolio data loaded. GitHub context synced.\nState your query.',
      }]);
      setInput('');
    } else if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete();
    }
  };

  const isReady = !!systemPrompt && !apiErr;

  // ─────────────────────────────────────────────────────────────

  return (
    <div className="chat-page">
      <div className="chat-terminal">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="term-header">
          <Link to="/" className="term-exit">[exit]</Link>
          <span className="term-id">
            JARVIS
            <span className="term-sep"> :: </span>
            Priyanshu Doshi — Portfolio Intelligence
          </span>
          <span className={`term-status ${isReady ? 'st-ok' : apiErr ? 'st-err' : 'st-wait'}`}>
            [{isReady ? 'online' : apiErr ? 'no key' : 'init'}]
          </span>
        </div>

        {/* ── Body ────────────────────────────────────────── */}
        <div
          className="term-body"
          ref={bodyRef}
          onClick={() => !loading && !shuttingDown && inputRef.current?.focus()}
        >
          {/* Boot phase */}
          {!bootDone && !shuttingDown && (
            <>
              {BOOT_LINES.slice(0, visibleLines).map((l, i) => (
                <BootLineEl key={i} line={l} />
              ))}
              {visibleLines < BOOT_LINES.length && (
                <span className="boot-caret">_</span>
              )}
            </>
          )}

          {/* Shutdown phase */}
          {shuttingDown && (
            <div className="shutdown-screen">
              {shutdownProgress.map((line, i) => (
                <div key={i} className="sd-line">{line}</div>
              ))}
              {shutdownProgress.length < SHUTDOWN_LINES.length + 2 && (
                <span className="boot-caret">_</span>
              )}
            </div>
          )}

          {/* Chat phase */}
          {bootDone && !shuttingDown && (
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
                      <span className="user-prompt">pd@workstation:~$&nbsp;</span>
                      {m.content}
                    </div>
                  ) : (
                    <pre className={`msg-bot ${m.role === 'cmd' ? 'msg-cmd' : ''}`}>
                      {m.content}
                    </pre>
                  )}
                </div>
              ))}

              {streaming && (
                <div className="msg-block">
                  <pre className="msg-bot">
                    {streaming}<span className="inline-caret">_</span>
                  </pre>
                </div>
              )}

              {loading && !streaming && (
                <div className="msg-block">
                  <pre className="msg-bot msg-cmd">processing...</pre>
                </div>
              )}

              {/* Inline prompt */}
              {!loading && (
                <div className="input-line">
                  <span className="user-prompt">pd@workstation:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="term-input"
                    value={input}
                    onChange={e => { setInput(e.target.value); histIdx.current = -1; }}
                    onKeyDown={onKey}
                    disabled={!isReady}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              )}

              {loading && (
                <div className="ctrl-hint">^C to cancel  |  Ctrl+C twice to exit</div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
