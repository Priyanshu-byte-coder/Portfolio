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

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY = 20; // keep last 20 messages for context

const SUGGESTIONS = [
  'What has Priyanshu built?',
  'Tell me about his IEEE publication.',
  'What are his top hackathon wins?',
  'What stack does he use most?',
  'How did LUMIN.AI work?',
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [status, setStatus] = useState<'connecting' | 'ready' | 'error'>('connecting');
  const [streamingContent, setStreamingContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Build system prompt with GitHub context on mount
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setStatus('error');
      return;
    }

    fetchGithubContext().then(githubCtx => {
      const prompt = SYSTEM_PROMPT.replace('{GITHUB_CONTEXT}', githubCtx);
      setSystemPrompt(prompt);
      setStatus('ready');
      setMessages([
        {
          id: uid(),
          role: 'assistant',
          content: "Connected. Ask me anything about Priyanshu — his projects, research, skills, or that questionable decision to build a PLC-controlled gantry robot for a hackathon.",
          ts: Date.now(),
        },
      ]);
    });
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading || !systemPrompt) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return;

    const userMsg: Message = { id: uid(), role: 'user', content: text.trim(), ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    // Build history (last MAX_HISTORY messages, excluding the greeting)
    const history = [...messages, userMsg]
      .slice(-MAX_HISTORY)
      .map(m => ({ role: m.role, content: m.content }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!res.ok) {
        throw new Error(`Groq API error: ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setStreamingContent(accumulated);
            }
          } catch {
            // malformed chunk, skip
          }
        }
      }

      setMessages(prev => [
        ...prev,
        { id: uid(), role: 'assistant', content: accumulated, ts: Date.now() },
      ]);
      setStreamingContent('');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}. Check your GROQ API key.`,
          ts: Date.now(),
        },
      ]);
      setStreamingContent('');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [loading, systemPrompt, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleSuggestion = (s: string) => {
    if (!loading) send(s);
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setLoading(false);
    if (streamingContent) {
      setMessages(prev => [
        ...prev,
        { id: uid(), role: 'assistant', content: streamingContent, ts: Date.now() },
      ]);
      setStreamingContent('');
    }
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="chat-page">
      {/* Terminal window */}
      <div className="chat-terminal">
        {/* Title bar */}
        <div className="chat-titlebar">
          <div className="chat-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="chat-title">pd.bot — portfolio assistant</span>
          <div className="chat-status">
            <span className={`status-dot ${status}`} />
            <span className="status-label">
              {status === 'connecting' ? 'CONNECTING' : status === 'ready' ? 'READY' : 'NO API KEY'}
            </span>
          </div>
        </div>

        {/* Nav */}
        <div className="chat-nav">
          <Link to="/" className="chat-back">← back to portfolio</Link>
          <span className="chat-model">{MODEL}</span>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {status === 'error' && (
            <div className="chat-error-banner">
              VITE_GROQ_API_KEY not set. Add it to .env.local and restart the dev server.
            </div>
          )}

          {messages.map(m => (
            <div key={m.id} className={`chat-msg chat-msg--${m.role}`}>
              <div className="chat-msg-prefix">
                {m.role === 'user' ? '>' : '$'}
              </div>
              <div className="chat-msg-body">
                <span className="chat-msg-text">{m.content}</span>
                <span className="chat-msg-time">{formatTime(m.ts)}</span>
              </div>
            </div>
          ))}

          {/* Streaming */}
          {streamingContent && (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-msg-prefix">$</div>
              <div className="chat-msg-body">
                <span className="chat-msg-text">
                  {streamingContent}
                  <span className="chat-cursor" />
                </span>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {loading && !streamingContent && (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-msg-prefix">$</div>
              <div className="chat-msg-body">
                <span className="chat-typing">
                  <span /><span /><span />
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && !loading && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="chat-suggestion" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <span className="chat-input-prefix">{'>'}</span>
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={status === 'ready' ? 'Ask about Priyanshu...' : 'Loading...'}
            disabled={status !== 'ready' || loading}
            rows={1}
            autoFocus
          />
          {loading ? (
            <button className="chat-send chat-stop" onClick={handleStop} title="Stop">
              stop
            </button>
          ) : (
            <button
              className="chat-send"
              onClick={() => send(input)}
              disabled={!input.trim() || status !== 'ready'}
            >
              send
            </button>
          )}
        </div>

        <div className="chat-footer">
          shift+enter for newline &middot; enter to send &middot; powered by groq + llama-3.3-70b
        </div>
      </div>
    </div>
  );
};
