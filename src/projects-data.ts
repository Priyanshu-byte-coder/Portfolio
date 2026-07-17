/**
 * Full project registry — powers the dedicated /projects/:id pages.
 * `id` is the URL slug. `accent` recolors the whole page. `motif` picks the
 * signature animated visual rendered in the page hero.
 *
 * Media: drop images/videos into  src/assets/projects/<id>/  and they appear
 * automatically in the page's gallery (nothing breaks if the folder is empty).
 */

export type MotifKind =
  | 'terminal'
  | 'scanline'
  | 'gauge'
  | 'waveform'
  | 'shield'
  | 'heatmap'
  | 'chips'
  | 'spectral'
  | 'orbit'
  | 'ticker';

export interface ProjectNumber { value: string; label: string; }
export interface ProjectStorySection { heading: string; body: string; }
export interface ProjectLink { label: string; url: string; }

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  /** sortable start date (YYYY-MM-DD, from repo creation / competition start) */
  date: string;
  /** human-readable date label shown on the page */
  year: string;
  role: string;
  badge?: string;
  accent: string;
  motif: MotifKind;
  /** lines rendered inside the terminal motif (terminal kind only) */
  terminal?: string[];
  summary: string;
  numbers: ProjectNumber[];
  tech: string[];
  links: ProjectLink[];
  story: ProjectStorySection[];
  highlights: string[];
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: 'contextrot',
    title: 'contextrot',
    subtitle: 'Find out where your coding agent starts degrading',
    category: 'Open Source · Developer Tool',
    date: '2026-07-02',
    year: 'Jul 2026',
    role: 'Creator & Maintainer',
    badge: '10K+ Downloads on PyPI',
    accent: '#6fae5c',
    motif: 'terminal',
    terminal: [
      '$ uvx contextrot',
      'scanning ~/.claude/projects … 214 sessions found',
      'extracting signals: edits · retries · re-reads · corrections',
      '',
      'rot curve   ▁▁▂▂▃▄▆█   failure rate vs context fill',
      '',
      '✗ context rot detected — failures climb 2.4× past 70% fill',
      '→ compact before 60% · trim unused MCP tools',
    ],
    summary:
      'Research shows LLM output quality degrades as context fills — but benchmarks run synthetic tasks in lab conditions. contextrot measures degradation where it actually matters: your own sessions. It reads the JSONL transcripts your agent CLI already keeps on disk, extracts five independent failure signals per step, correlates them with context fill at that moment, and leads with a plain verdict — including "you\'re fine", which is what makes the tool trustworthy when it says you\'re not.',
    numbers: [
      { value: '10K+', label: 'PyPI Downloads' },
      { value: '5', label: 'Failure Signals' },
      { value: '100%', label: 'Local — Zero Upload' },
      { value: '0', label: 'Config Required' },
    ],
    tech: ['Python', 'Statistics', 'CLI', 'JSONL Parsing', 'Claude Code', 'PyPI', 'GitHub Actions CI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/contextrot' },
      { label: 'PyPI', url: 'https://pypi.org/project/contextrot/' },
    ],
    story: [
      {
        heading: 'The problem',
        body: 'Every coding-agent user feels it: sessions start sharp and get sloppy. Chroma\'s context-rot research and several 2026 papers proved degradation happens far below the window limit — but your degradation point depends on your projects, your MCP setup, your model, your prompting style. No benchmark can tell you that.',
      },
      {
        heading: 'The approach',
        body: 'Agent CLIs log every session to local JSONL transcripts carrying token accounting and behavioral evidence. contextrot extracts five independent failure signals per step — edit failures, retry loops, re-reads, self-corrections, and drift — and correlates each with context fill at that exact moment. Statistical confidence intervals separate real rot from noise, and the report ends with concrete prescriptions: where to compact, what to trim, what it\'s costing you.',
      },
      {
        heading: 'Honest verdicts',
        body: 'Every report leads with one of four answers: context rot detected, edge rot (flat until near the limit), no measurable rot, or not enough data. A tool that can say "your setup is working" earns trust for the times it says the opposite.',
      },
    ],
    highlights: [
      'Zero-config: uvx contextrot — no API keys, no uploads, no setup',
      '10,000+ downloads on PyPI',
      'Five behavioral failure signals correlated with context fill',
      'Confidence intervals on the rot curve — statistics, not vibes',
      'Prescriptions, not just diagnosis: compact points, MCP trimming, cost estimates',
    ],
  },
  {
    id: 'spectra-scan',
    title: 'Spectra Scan',
    subtitle: 'Automated paint defect detection on a CNC gantry',
    category: 'Industrial AI · Computer Vision',
    date: '2026-01-09',
    year: 'Jan — Mar 2026',
    role: 'AI Engineer — Team CON-SOL-E',
    badge: 'National Rank #4 — Mitsubishi Electric Cup',
    accent: '#c45d3e',
    motif: 'scanline',
    summary:
      'A real industrial QC platform — not a demo. Spectra Scan inspects painted automotive door panels mounted on a 2m×2m×2m CNC gantry, driving a Mitsubishi PLC over raw MC Protocol TCP, imaging with a HIKROBOT GigE industrial camera, and running a DINOv2 vision pipeline fully offline on an Intel iGPU. Placed National Rank #4 at the Mitsubishi Electric Cup, 6th Edition.',
    numbers: [
      { value: '<500ms', label: 'Inference / Image' },
      { value: '#4', label: 'National Rank' },
      { value: '3', label: 'Defect Classes' },
      { value: '345', label: 'Mapped Error Codes' },
    ],
    tech: ['DINOv2 ViT-B/14', 'OpenVINO', 'FastAPI', 'Electron 39', 'React Three Fiber', 'LangChain', 'LangGraph', 'ChromaDB', 'MC Protocol', 'HIKROBOT MVS SDK'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Mitanshp5/MECup' },
      { label: 'Video', url: 'https://youtu.be/Gq1PI3dG4mY' },
    ],
    story: [
      {
        heading: 'Vision pipeline',
        body: 'A frozen DINOv2 ViT-B/14 encoder feeds a custom multi-scale CNN decoder that segments dust, scratch, and rundown defects. OpenVINO 2024 compiles the whole pipeline for the Intel iGPU — sub-500ms per image with no discrete GPU and no cloud. SciPy connected-components turns masks into per-defect instance counts.',
      },
      {
        heading: 'Hardware control',
        body: 'The gantry speaks Mitsubishi MC Protocol — binary frames over TCP to the PLC for 3-axis servo motion, plus programmable LED illumination and GigE camera triggering through the HIKROBOT MVS SDK. The Electron frontend polls real hardware state through React Query and renders the gantry as a live React Three Fiber GLB model.',
      },
      {
        heading: 'RAG troubleshooting agent',
        body: 'When the machine faults, an on-device agent built with LangChain + LangGraph and Ollama Phi-3 retrieves from 345 hardcoded error codes embedded in ChromaDB with BGE-base-en-v1.5 — an offline manual that answers in plain language on the factory floor.',
      },
    ],
    highlights: [
      '100% local & offline — factory floors don\'t get cloud access',
      'DINOv2 ViT-B/14 + multi-scale CNN decoder, OpenVINO-compiled for Intel iGPU',
      'Raw MC Protocol TCP to a Mitsubishi PLC — 3-axis servo control',
      'Electron desktop app: 49 shadcn/ui components, live 3D gantry viewer',
      'Companion remote-monitoring app for supervisors',
    ],
  },
  {
    id: 'lumin-ai',
    title: 'LUMIN.AI',
    subtitle: 'AI-powered solar plant risk monitoring',
    category: 'ML Platform · GenAI',
    date: '2026-03-05',
    year: 'Mar 2026',
    role: 'ML & GenAI Lead — Winner, Aubergine Track',
    badge: 'Winner — HackAMined (400+ teams)',
    accent: '#d9a441',
    motif: 'gauge',
    summary:
      'Solar inverter risk monitoring built as four independently deployable microservices: a 7-stage ML pipeline predicting 3-class inverter risk, a GenAI layer with RAG and hardened guardrails, a FastAPI inference service, and a real-time Next.js dashboard. Won the Aubergine track at HackAMined 2026 — 1st of 400+ teams, Top 5 overall among 2300+ participants.',
    numbers: [
      { value: '183', label: 'Engineered Features' },
      { value: '91.7%', label: 'LLM Eval Score' },
      { value: '4', label: 'Guardrail Layers' },
      { value: '1.0s', label: 'Avg LLM Latency' },
    ],
    tech: ['XGBoost', 'Optuna', 'SHAP', 'FAISS', 'Groq Llama 3.3 70B', 'LangSmith', 'FastAPI', 'Next.js 15', 'Express', 'MySQL · AWS RDS'],
    links: [{ label: 'GitHub', url: 'https://github.com/Neal006/LuMinAI' }],
    story: [
      {
        heading: 'ML pipeline',
        body: '183 rolling-window features across 1h/6h/24h horizons feed an Optuna-tuned XGBoost (40 trials) with walk-forward cross-validation — the honest way to validate time series. Output is 3-class risk (no risk / degradation / shutdown) with SHAP TreeExplainer charts shipped to the dashboard as base64 PNGs, so every prediction is explainable.',
      },
      {
        heading: 'GenAI layer',
        body: 'Groq Llama 3.3 70B won a 3-model ablation of 135 evaluations — 91.7% at 1.0s average versus 21.2s for the runner-up. RAG runs PyMuPDF → 800-word chunks → all-MiniLM-L6-v2 → FAISS. Four hallucination guardrail layers plus LangSmith tracing keep the assistant grounded, and an agentic 8-step workflow drafts maintenance tickets as JSON + ReportLab PDFs.',
      },
      {
        heading: 'Real-time platform',
        body: 'A simulator streams CSV-derived sensor readings every 15 seconds through batch ML inference into MySQL on AWS RDS, surfaced by role-based Next.js dashboards. JWT auth, bcrypt, Zod validation, parameterized queries, and rate limiting throughout.',
      },
    ],
    highlights: [
      '1st place Aubergine track · Top 5 of 400+ teams (2300+ participants)',
      'Model selection by ablation: 135 evaluations across 3 LLMs',
      'Walk-forward CV — no time-series leakage',
      '4-layer hallucination guardrails + LangSmith tracing',
      'Batch inference endpoint scoring 100 inverters per call',
    ],
  },
  {
    id: 'solv-ai',
    title: 'SOLV.ai',
    subtitle: 'Multi-channel voice complaint management',
    category: 'Voice AI · NLP',
    date: '2026-04-18',
    year: 'Apr 2026',
    role: 'Team Leader — Tark Shaastra, LDCE',
    badge: '5 Microservices · Voice Agent FSM',
    accent: '#5c9fae',
    motif: 'waveform',
    summary:
      'An AI complaint-management system for Indian FMCG built as five microservices: an ONNX-accelerated NLP classifier, a Groq-powered GenAI service, streaming speech-to-text, a Twilio voice agent driven by a six-state FSM, and role-based Next.js 16 dashboards. Callers speak; the system classifies, prioritizes, and routes — online or fully offline.',
    numbers: [
      { value: '12ms', label: 'NLP Inference' },
      { value: '96.9%', label: 'LLM Eval Score' },
      { value: '~300ms', label: 'STT Latency' },
      { value: '5', label: 'Specialized Agents' },
    ],
    tech: ['DistilBERT-MNLI', 'MiniLM-L6', 'ONNX + CUDA', 'Faster-Whisper', 'Silero VAD', 'Twilio', 'Groq Llama 3.3 70B', 'Next.js 16', 'Prisma', 'Supabase'],
    links: [{ label: 'GitHub', url: 'https://github.com/Neal006/lakshya-ldce' }],
    story: [
      {
        heading: 'NLP ensemble',
        body: 'A 50/50 weighted ensemble of DistilBERT-MNLI zero-shot and MiniLM-L6 semantic similarity classifies complaints at 12ms per prediction on ONNX + CUDA. VADER handles sentiment; a decision tree assigns priority. Model choice came from a 10-model ablation of 120 API calls — Groq Llama 3.3 70B at 96.9% with 100% JSON compliance.',
      },
      {
        heading: 'Streaming voice',
        body: 'Faster-Whisper Tiny (CTranslate2 INT8/FP16, ~75MB, 4× speedup) transcribes over WebSockets with a 4000ms window and 450ms overlap, gated by Silero VAD in ONNX. Twilio Media Streams feed a six-state FSM orchestrating five specialized agents — with a dual mode: Groq + Edge TTS online (2–3s per turn) or Ollama phi3.5 + Piper ONNX fully offline (4–6s).',
      },
      {
        heading: 'Platform',
        body: 'Next.js 16 with Prisma on Supabase PostgreSQL, NextAuth v5, four role-based dashboards, and GSAP + Lenis motion. Every channel — phone, web, dashboard — lands in the same complaint pipeline.',
      },
    ],
    highlights: [
      'ONNX-accelerated ensemble NLP: 12ms per prediction',
      'Dual-mode voice agent: cloud Groq or fully offline Ollama + Piper',
      '10-model LLM ablation before committing to Groq',
      '6-state FSM with 5 specialized conversation agents',
      'Led the team end-to-end at Tark Shaastra, LDCE',
    ],
  },
  {
    id: 'sentinel',
    title: 'SENTINEL',
    subtitle: 'Privacy-preserving edge AI wellbeing companion',
    category: 'Edge AI · Mental Wellbeing',
    date: '2026-02-28',
    year: 'Feb 2026',
    role: 'Creator',
    badge: 'Fully Offline — Raspberry Pi 5',
    accent: '#7d8fc9',
    motif: 'shield',
    summary:
      'A mental-wellbeing AI companion that runs 100% on a Raspberry Pi 5 — no cloud, no telemetry, nothing leaves the device. phi3:mini via Ollama, VADER sentiment fused with FER facial emotion recognition, ChromaDB conversation memory with RAG retrieval, and evidence-based exercises triggered by distress signals. 17 stars on GitHub.',
    numbers: [
      { value: '8.56/10', label: 'Response Quality' },
      { value: '3.68s', label: 'Avg Latency on Pi' },
      { value: '10', label: 'LLMs Benchmarked' },
      { value: '0', label: 'Bytes to the Cloud' },
    ],
    tech: ['Ollama · phi3:mini', 'VADER', 'FER (Keras CNN)', 'OpenCV', 'ChromaDB', 'Flask + SSE', 'Raspberry Pi 5'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/SENTINEL' }],
    story: [
      {
        heading: 'Model selection under constraints',
        body: 'Ten Ollama models were benchmarked across 50 inferences on the Pi itself. qwen2.5 scored higher on quality but needed 4.4GB — phi3:mini won at 2.0GB, 3.68s average latency, and 8.56/10 quality, because a wellbeing companion that swaps to disk isn\'t a companion.',
      },
      {
        heading: 'Emotion fusion',
        body: 'OpenCV frames run through a Keras FER CNN (7 emotions, 0.30 confidence threshold, polled every 2.5s) and fuse with VADER text sentiment in a 10-turn sliding-window emotion engine. The fused signal shapes both the LLM prompt and the exercise triggers — when the rolling average drops below −0.3, one of seven evidence-based exercises offers itself, with a 5-turn cooldown.',
      },
      {
        heading: 'Why offline matters',
        body: 'Mental-health conversations are the most sensitive data a person can produce. SENTINEL\'s answer is architectural, not policy: there is no server, so there is nothing to leak. ChromaDB stores memory locally; Flask serves a single-page UI over the local network with SSE streaming.',
      },
    ],
    highlights: [
      '100% offline on a 4GB Raspberry Pi 5',
      'Empirical model selection: 10 models × 50 inferences on-device',
      'Facial + text emotion fusion with sliding-window smoothing',
      '7 evidence-based exercises with distress-triggered delivery',
      '17★ on GitHub',
    ],
  },
  {
    id: 'devtrack',
    title: 'devtrack',
    subtitle: 'Open-source developer productivity dashboard',
    category: 'Open Source · Founder & Maintainer',
    date: '2026-05-10',
    year: 'May 2026 — Now',
    role: 'Founder & Maintainer',
    badge: 'Community Open Source',
    accent: '#b8976a',
    motif: 'heatmap',
    summary:
      'A self-hostable GitHub productivity dashboard — contribution heatmaps, PR analytics, streaks, and weekly goals — built from scratch and grown into a real open-source community. Now at 190+ stars, 430+ forks, and over 1,000 merged pull requests from contributors, maintained with CI, Sentry, e2e tests, and a public roadmap.',
    numbers: [
      { value: '190+', label: 'GitHub Stars' },
      { value: '1000+', label: 'Merged PRs' },
      { value: '430+', label: 'Forks' },
      { value: '100+', label: 'Contributors' },
    ],
    tech: ['Next.js 14', 'TypeScript', 'NextAuth.js', 'Supabase', 'Recharts', 'Playwright', 'Sentry', 'Docker'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/devtrack' }],
    story: [
      {
        heading: 'From side project to community',
        body: 'devtrack started as a personal dashboard and grew into a community open-source project. Running it meant reviewing and merging 1,000+ pull requests, writing contributor docs (CONTRIBUTING, ARCHITECTURE, SECURITY, CODE_OF_CONDUCT), triaging hundreds of issues, and keeping CI green while dozens of first-time contributors shipped in parallel.',
      },
      {
        heading: 'Architecture',
        body: 'No separate backend: Next.js Route Handlers talk to Supabase directly, with GitHub OAuth through NextAuth.js. Contribution data flows from the GitHub REST API into heatmaps and PR analytics rendered with Recharts. Playwright e2e suites, visual regression configs, Sentry on client/edge/server, and Docker + Render/Vercel deploy targets keep it production-grade.',
      },
    ],
    highlights: [
      'Founded and maintain a 190+ star open-source project',
      '1,000+ PRs reviewed and merged from community contributors',
      'Full OSS hygiene: CI, codecov, e2e + visual tests, security policy',
      'Self-hostable: Docker, Render, and Vercel deployment paths',
    ],
  },
  {
    id: 'keeptrack',
    title: 'KeepTrack',
    subtitle: 'Smart download classifier for Chrome',
    category: 'Open Source · Browser Extension',
    date: '2026-06-27',
    year: 'Jun 2026',
    role: 'Creator',
    badge: 'Zero Telemetry · MV3',
    accent: '#5aa05e',
    motif: 'chips',
    summary:
      'Every file you download makes sense in the moment — two weeks later your Downloads folder is 200 files deep. KeepTrack captures the "keep or toss" decision at download time, when you actually know the answer. It classifies every download as Keep, Temporary, or Ambiguous using file type, filename keywords, and source domain — silently for confident calls, with a gentle prompt only when ambiguous.',
    numbers: [
      { value: '3', label: 'Intent Classes' },
      { value: '30s', label: 'Weekly Review' },
      { value: '0', label: 'Telemetry Events' },
      { value: 'MV3', label: 'Manifest Version' },
    ],
    tech: ['JavaScript', 'Chrome Extensions API', 'Manifest V3', 'chrome.downloads', 'GitHub Pages'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/keeptrack' },
      { label: 'Website', url: 'https://priyanshu-byte-coder.github.io/keeptrack/' },
    ],
    story: [
      {
        heading: 'Capture intent at the source',
        body: 'The insight: classification is easy at download time and impossible two weeks later. KeepTrack hooks chrome.downloads, scores each file on type, filename keywords, and source domain, and only interrupts for genuinely ambiguous cases — high-confidence decisions happen silently.',
      },
      {
        heading: 'Respectful by design',
        body: 'A weekly 30-second review popup surfaces expiring temporary files so nothing important disappears. Everything is local: no accounts, no servers, no analytics. The entire behavior is auditable in the open-source repo.',
      },
    ],
    highlights: [
      'Classifies at download time — keep / temporary / ambiguous',
      'Silent for confident calls; notifies only when unsure',
      'Weekly 30-second expiring-files review',
      '100% local, zero telemetry, fully open source',
    ],
  },
  {
    id: 'lunar-ice',
    title: 'Lunar Ice Detection',
    subtitle: 'Mapping water-ice on the Moon from orbital data',
    category: 'Space Tech · Remote Sensing',
    date: '2026-06-15',
    year: 'Jun 2026',
    role: 'ML Engineer — ISRO BAH (PS-8)',
    badge: 'ISRO Bharatiya Antariksh Hackathon',
    accent: '#9aa7c7',
    motif: 'spectral',
    summary:
      'Built for Problem Statement 8 of the ISRO Bharatiya Antariksh Hackathon 2026: detecting probable water-ice deposits on the lunar surface from orbital remote-sensing data. The pipeline processes Chandrayaan mission data products, engineers spectral and terrain features from permanently shadowed regions, and trains ML models to map ice probability across the lunar poles.',
    numbers: [
      { value: 'PS-8', label: 'ISRO Problem Stmt' },
      { value: '3★', label: 'GitHub Stars' },
      { value: 'PSR', label: 'Target Regions' },
    ],
    tech: ['Python', 'Remote Sensing', 'Geospatial ML', 'Chandrayaan Data', 'NumPy · Pandas', 'Scikit-learn'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/bah-2026-lunar-ice' }],
    story: [
      {
        heading: 'The mission',
        body: 'Water-ice in the Moon\'s permanently shadowed regions (PSRs) is the key resource for sustained lunar presence — drinking water, oxygen, rocket fuel. ISRO\'s BAH 2026 PS-8 asks teams to turn orbital instrument data into actionable ice-probability maps.',
      },
      {
        heading: 'The pipeline',
        body: 'Chandrayaan data products are preprocessed into aligned raster stacks; spectral signatures, illumination models, and terrain derivatives become features; ML classifiers score ice probability per region with the class imbalance and label sparsity that make planetary science ML genuinely hard.',
      },
    ],
    highlights: [
      'National-level ISRO hackathon problem statement',
      'Real Chandrayaan mission data — not synthetic',
      'Geospatial feature engineering over permanently shadowed regions',
    ],
  },
  {
    id: 'mzhub',
    title: 'MZHub',
    subtitle: 'Enterprise marketing site for an AI spiritual-tech platform',
    category: 'Freelance · Production Web',
    date: '2025-12-03',
    year: 'Dec 2025',
    role: 'Full-Stack Developer (Freelance)',
    badge: 'Shipped to Production — Azure',
    accent: '#a67ab8',
    motif: 'orbit',
    summary:
      'A production marketing website for MZHUB Faithtech\'s AI spiritual-tech platform — Next.js 14 App Router with static generation, Three.js 3D backgrounds, GSAP scroll choreography, an MDX blog, automated contact forms with email notifications, and deployment on Azure App Service. Freelance work delivered end-to-end: design implementation to production ops.',
    numbers: [
      { value: 'SSG', label: 'Rendering' },
      { value: '3D', label: 'Three.js Scenes' },
      { value: 'MDX', label: 'Blog Engine' },
    ],
    tech: ['Next.js 14', 'Three.js', 'GSAP', 'Framer Motion', 'MDX', 'shadcn/ui', 'Azure App Service'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/mzhub' }],
    story: [
      {
        heading: 'Client work, production standards',
        body: 'Static generation with a dynamic sitemap for SEO, Three.js scenes tuned to stay smooth on mid-range phones, GSAP scroll animations that respect prefers-reduced-motion, and an MDX pipeline the client can publish to without a developer. Contact forms trigger automated email notifications.',
      },
    ],
    highlights: [
      'Delivered solo, end-to-end, on a freelance contract',
      'Deployed and operated on Azure App Service',
      'MDX blog the client updates independently',
    ],
  },
  {
    id: 'tokenscope',
    title: 'TokenScope',
    subtitle: 'Unified AI token-usage monitoring on the desktop',
    category: 'Desktop App · Developer Tool',
    date: '2026-05-06',
    year: 'May 2026',
    role: 'Creator',
    badge: 'Cross-Platform Electron',
    accent: '#b8976a',
    motif: 'terminal',
    terminal: [
      '$ tokenscope --scan',
      'discovering keys … 4 config files found',
      '  anthropic  ✓ keychain    openai  ✓ keychain',
      '  groq       ✓ keychain    mistral ✓ keychain',
      'usage this month: 4.2M tokens across 6 providers',
    ],
    summary:
      'A cross-platform Electron app that auto-discovers AI API keys from local config files and unifies token usage monitoring across Anthropic, OpenAI, Groq, Mistral, Cohere, and Together AI — plus Google OAuth for a Gemini card. Keys never touch plaintext storage: everything goes through the OS keychain (Windows Credential Manager / macOS Keychain) via keytar.',
    numbers: [
      { value: '6', label: 'Providers Unified' },
      { value: 'OS', label: 'Keychain Storage' },
      { value: 'Auto', label: 'Key Discovery' },
    ],
    tech: ['Electron', 'React', 'Zustand', 'keytar', 'OAuth 2.0'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/token_counter' }],
    story: [
      {
        heading: 'Security-first design',
        body: 'API keys are the crown jewels of a developer\'s machine. TokenScope discovers them from config files but immediately moves them into the OS credential vault — the renderer process never sees a raw key. Usage polling happens in the main process with per-provider adapters.',
      },
    ],
    highlights: [
      'Auto-discovery of API keys from local config files',
      'OS-native keychain storage — no plaintext keys anywhere',
      '6 providers in one dashboard + Gemini via Google OAuth',
    ],
  },
  {
    id: 'imc-prosperity',
    title: 'IMC Prosperity',
    subtitle: 'Algorithmic trading strategies & custom backtester',
    category: 'Quant · Competition',
    date: '2026-04-15',
    year: '2026',
    role: 'Quant Developer — Team Prosperity-Fantastics',
    badge: 'IMC Prosperity 5',
    accent: '#ae5c6c',
    motif: 'ticker',
    summary:
      'Competition strategies for IMC Prosperity 5: EMERALDS ran a dynamic undercutting market maker exploiting 7+ point spreads from L1 orderbook data; TOMATOES traded mean reversion on a measured −0.44 tick autocorrelation with orderbook-imbalance-adjusted fair value and an inventory-skew spring. All validated on a custom local backtester replaying historic log data.',
    numbers: [
      { value: '−0.44', label: 'Tick Autocorrelation' },
      { value: '7+', label: 'Point Spreads (MM)' },
      { value: '2', label: 'Live Strategies' },
    ],
    tech: ['Python', 'Market Making', 'Mean Reversion', 'Orderbook Imbalance', 'Backtesting'],
    links: [],
    story: [
      {
        heading: 'Strategy design',
        body: 'EMERALDS undercut the best bid/ask dynamically, capturing wide spreads while managing inventory. TOMATOES measured a −0.44 one-tick autocorrelation — statistically meaningful mean reversion — and traded it with fair value adjusted by orderbook imbalance, plus an inventory spring that skews quotes to unwind positions.',
      },
      {
        heading: 'Backtest before belief',
        body: 'A custom backtester replayed the competition\'s historic log data tick by tick, so every parameter change was validated against real market microstructure rather than intuition.',
      },
    ],
    highlights: [
      'Two production strategies traded live in competition',
      'Statistical edge measured, not assumed: −0.44 autocorrelation',
      'Custom tick-replay backtester built from scratch',
    ],
  },
  {
    id: 'bloom',
    title: 'bloom',
    subtitle: 'AI mental-health companion with crisis detection',
    category: 'GenAI · Full-Stack',
    date: '2026-05-07',
    year: 'May 2026',
    role: 'Creator',
    badge: '4-Layer Crisis Detection',
    accent: '#c47ba0',
    motif: 'shield',
    summary:
      'A full-stack mental-health web app: Groq LLaMA 3.3 70B streaming chat (8B fallback on rate limits), RAG memory over pgvector, guided exercises with distress scoring, and an admin analytics dashboard. The core engineering: a four-layer crisis detection system that catches at-risk conversations without false-positive fatigue.',
    numbers: [
      { value: '4', label: 'Crisis Layers' },
      { value: '≥0.72', label: 'RAG Threshold' },
      { value: '7', label: 'DB Tables · Full RLS' },
      { value: '20/min', label: 'Rate Limit (Chat)' },
    ],
    tech: ['Next.js 16', 'Groq API', 'Supabase + pgvector', 'Transformers.js', 'Upstash Redis', 'Framer Motion 12'],
    links: [{ label: 'GitHub', url: 'https://github.com/Priyanshu-byte-coder/bloom' }],
    story: [
      {
        heading: 'Crisis detection, layered',
        body: 'Layer 1: keyword scan across 40+ terms in three severity buckets. Layer 2: parallel LLM classification of every message. Layer 3: dynamic system-prompt injection that shifts the model into crisis-response mode. Layer 4: a crisis_events audit table. Resources like the 988 Lifeline surface immediately when triggered.',
      },
      {
        heading: 'Memory & safety rails',
        body: 'Transformers.js embeds client-side with all-MiniLM-L6-v2; pgvector cosine search retrieves top-6 memories above a 0.72 threshold with an HNSW index. Row-level security on all seven tables, server-side key management, and Upstash Redis rate limiting (20 chat req/min, global 100/hr).',
      },
    ],
    highlights: [
      '4-layer crisis detection: keywords + LLM + prompt injection + audit log',
      'RAG memory: client-side embeddings, pgvector HNSW search',
      'RLS on every table; zero keys in the client',
    ],
  },
];

export const PROJECT_BY_ID: Record<string, ProjectDetail> = Object.fromEntries(
  PROJECT_DETAILS.map((p) => [p.id, p]),
);

/** Newest first — drives the All Projects index and the next-project chain. */
export const PROJECTS_CHRONO: ProjectDetail[] = [...PROJECT_DETAILS].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export function nextProject(id: string): ProjectDetail {
  const i = PROJECTS_CHRONO.findIndex((p) => p.id === id);
  return PROJECTS_CHRONO[(i + 1) % PROJECTS_CHRONO.length];
}
