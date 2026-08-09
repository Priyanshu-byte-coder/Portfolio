# All Projects — Priyanshu Doshi

> Unified index of all projects. Priyanshu Doshi — AI/ML Engineer · Open-Source Maintainer · Nirma University (2028).
> [LinkedIn](https://www.linkedin.com/in/priyanshu-doshi-21a54230a/) · [GitHub](https://github.com/Priyanshu-byte-coder) · [Portfolio](https://portfolio-eta-gilt-84.vercel.app/)
> Last updated: 17 July 2026.

---

## Table of Contents

- [Open Source & Developer Tools](#open-source--developer-tools)
- [Internship Work — Velino AI](#internship-work--velino-ai-2026)
- [Hackathon Projects](#hackathon-projects)
- [Full-Stack Applications](#full-stack-applications)
- [AI / ML Projects](#ai--ml-projects)
- [Embedded & Hardware AI](#embedded--hardware-ai)
- [Freelance & Client Work](#freelance--client-work)
- [Competitive Challenges](#competitive-challenges)
- [Business / Docs](#business--docs)

---

## Open Source & Developer Tools

### contextrot ⭐ Flagship
**[github.com/Priyanshu-byte-coder/contextrot](https://github.com/Priyanshu-byte-coder/contextrot)** | Creator & Maintainer | **10,000+ PyPI downloads**

Find out where your coding agent starts degrading — measured on your own sessions, not a synthetic benchmark. Agent CLIs (Claude Code etc.) log every session to local JSONL transcripts carrying token accounting and behavioral evidence; contextrot reads them and answers: *at what context fill does my agent start failing, what's causing it, and what is it costing me?*

**How it works:** extracts 5 independent failure signals per step — edit failures (agent tried to edit code and missed), retry loops (same tool call repeated after error), re-reads (content scrolled out of effective attention), self-corrections, and drift — and correlates each with context fill at that moment. Statistical confidence intervals on the rot curve separate real degradation from noise.

**Verdict-first reports:** ✗ context rot detected / ! edge rot (flat until near window limit) / ✓ no measurable rot / ? not enough data. Ends with concrete prescriptions: compact points, MCP tool trimming, cost estimates. A tool that can say "you're fine" is a tool you can trust when it says you're not.

**Distribution:** zero-config `uvx contextrot` (or pip). No API keys, no uploads, 100% local. CI via GitHub Actions.

**Stack:** Python · statistics · JSONL parsing · CLI · PyPI packaging · GitHub Actions

---

### devtrack ⭐ Flagship
**[github.com/Priyanshu-byte-coder/devtrack](https://github.com/Priyanshu-byte-coder/devtrack)** | Founder & Maintainer | **190+ ★ · 430+ forks · 1,000+ merged PRs · 100+ contributors**

Self-hostable developer productivity dashboard. Consolidates GitHub activity into one clean interface — no enterprise pricing, no vendor lock-in.

**Features:** GitHub OAuth (NextAuth.js), contribution heatmap, PR analytics (avg review time, merge rate, open/closed ratio), weekly coding goal tracker. No separate backend — Next.js Route Handlers + Supabase, Vercel-deployable for free.

**Maintainership:** grew it into a community open-source project — reviewed and merged 1,000+ pull requests, wrote contributor docs (CONTRIBUTING, ARCHITECTURE, SECURITY, CODE_OF_CONDUCT), triaged hundreds of issues while keeping CI green with dozens of first-time contributors shipping in parallel. Playwright e2e + visual regression suites, Sentry (client/edge/server), codecov, Docker + Render/Vercel deploy paths.

**Stack:** Next.js 14 (App Router) · TypeScript · NextAuth.js · Supabase (PostgreSQL) · Recharts · GitHub REST API · Playwright · Sentry · Docker

---

### KeepTrack
**[github.com/Priyanshu-byte-coder/keeptrack](https://github.com/Priyanshu-byte-coder/keeptrack)** | Creator | [Website](https://priyanshu-byte-coder.github.io/keeptrack/)

Chrome extension that captures "keep vs temporary" download intent at download time — when you actually know the answer — so your Downloads folder stays clean. Classifies every download as Keep / Temporary / Ambiguous using file type, filename keywords, and source domain. Only interrupts for ambiguous cases; high-confidence decisions happen silently. Weekly 30-second review of expiring temporary files. Zero telemetry, fully local, Manifest V3.

**Stack:** JavaScript · Chrome Extensions API (chrome.downloads) · Manifest V3 · GitHub Pages

---

### PyTorch Contributions
**pytorch/pytorch** | Contributor

Pull requests merged into PyTorch core (landed on main via pytorchmergebot) — torch.amp API surface, docs modernization (rST→MyST), and code-quality fixes. Additional PRs open in review across `nn` validation, autograd forward-mode, distributions (Kumaraswamy mode), optim (LRScheduler closed-form), and DTensor test infrastructure (MultiThreadedTestCase migrations).

### TensorFlow Contribution
**tensorflow/tensorflow** | Contributor

Pull request merged into TensorFlow (Jul 2026) — `tf.signal` DCT/IDCT fixes: corrected idct docstring (n parameter supported), fixed Raises documentation, added n-parameter truncation/padding tests, Type-I n<2 validation with error tests.

### Keras Contribution
**keras-team/keras** | Contributor

Pull request merged into Keras — added input validation to `LayerNormalization.build()`: raises `ValueError` for out-of-bounds axis instead of failing later with an opaque error (PR #23329).

---

## Internship Work — Velino AI (2026)

AI/ML Engineering Intern (remote, May 2026 – present). Five projects across voice AI agents and web products.

### OmniVoice Voice Bot *(self-hosted, WIP polish)*
Self-hosted voice conversation pipeline using open-source models — no per-minute API cost for STT and TTS.

**Pipeline:** Browser mic → WebSocket → Silero VAD → faster-whisper STT → Groq LLM → OmniVoice TTS → speaker. FastAPI server around the OmniVoice TTS model (one-shot + streaming WebSocket endpoints, `/health`, `/metrics`); Pipecat pipeline bot with custom TTS service wrapper and raw PCM serializer; browser mic client; GPU concurrency benchmarking script; voice-cloning flow from reference audio.

**Stack:** Python · FastAPI · Pipecat · faster-whisper · OmniVoice TTS · Groq LLM · Silero VAD · WebSockets

### Salesnix — Marketing Site & Dashboard
Frontend web layer for the Salesnix product: v2 landing page (logo marquee, integration diagram), mobile-responsive layout, dashboard + call-logs pages wired to the backend API (clients, metrics, call logs), static-export deploy configs for Cloudflare Pages and Netlify.

**Stack:** Next.js · TypeScript · React · Netlify/Cloudflare Pages

### Reputation Shield (feature in Sociafy)
Brand-monitoring feature added to the existing Sociafy app: fetches brand mentions (Google News RSS, Hacker News, Wikipedia, Reddit OAuth2, X/Twitter search), scores sentiment with severity + theme (crisis/negative/neutral/positive), drafts replies via OpenAI/Groq (template fallback), approve→publish flow with DB tables, cron endpoint scanning active users, public demo endpoint.

**Stack:** Next.js · TypeScript · Drizzle/Postgres · Clerk auth · OpenAI/Groq · Reddit/X OAuth · cron

### Gauri — Real-Estate Voice Agent
Speech-to-speech agent for real-estate lead qualification and booking: Gemini Flash Live + Pipecat + Silero VAD, 10 tool calls via n8n webhooks, full conversation system prompt.

**Stack:** Python · Pipecat · Gemini Live API · n8n · Silero VAD

### Flash / "Priya" — Sales Voice Agent
Speech-to-speech FMCG/retail order-taking agent: Gemini Flash Live + Pipecat pipeline, catalog/order/lead tool calls, Supabase order storage, companion FastAPI server + n8n tool definitions.

**Stack:** Python · Pipecat · Gemini Live · Supabase · FastAPI · n8n

---

## Hackathon Projects

### Hackamine — LUMIN.AI 🏆 Winner
**`/Hackamine`** | HACKaMINeD 2026 | **Winner, Aubergine Track · Top 5 of 400+ teams (2300+ participants)** | GenAI Developer

Full-stack, production-grade solar plant inverter risk monitoring platform across **four independently deployable microservices**.

**ML Pipeline (`ml/`):** 7-stage Python pipeline — ingestion → cleaning → feature engineering (183 rolling-window features: 1h/6h/24h means, stdevs, deltas) → heuristic auto-labeling → Isolation Forest anomaly enrichment → chronological split + SMOTE + StandardScaler → Optuna-tuned XGBoost (40 trials, L1/L2 regularization, min_child_weight). Walk-forward cross-validation (chronological expanding windows) to prevent future-data leakage. SHAP `TreeExplainer` for exact per-prediction feature attribution (global summary + beeswarm plots). 3-class output: `no_risk`, `degradation_risk`, `shutdown_risk`.

**ML Inference Server (`mlinference/`):** FastAPI server exposing `/predict` (single) and `/predict/batch` (up to 100 inverters). 183-feature alignment at inference time. SHAP bar charts rendered as base64 PNG via Matplotlib. Category mapping: 3 XGBoost classes → 5 operational categories (A–E) using confidence thresholds (e.g. P(no_risk) ≥ 90% → Category A, shutdown_risk → Category E). Fault description engine maps sensor readings + category to plain-text fault labels.

**GenAI Explanation Layer (`genai/`):** FastAPI server with 15+ endpoints. Groq Llama 3.3 70B selected via 3-model LLM ablation study (27 test cases × 5 metrics = 135 evaluations; Groq wins 91.7% at 1.0s avg vs Qwen 91.7% at 21.2s). RAG pipeline: PyMuPDF → 800-word chunks with 200-word overlap → SentenceTransformer `all-MiniLM-L6-v2` embeddings → FAISS vector store (cached to disk). Agentic maintenance ticket workflow (8-step autonomous: data retrieval → SHAP validation → RAG → LLM → JSON validation → PDF via ReportLab). 4-layer hallucination guardrails: input sanitization, prompt-level STRICT RULES, output cross-validation against SHAP input, auto-disclaimer. LangSmith observability (full prompt/response/token/latency tracing). Multi-turn conversational Q&A with 20-turn rolling session memory.

**Web Application (`nextjs/`):** Next.js 15 (App Router) + Express.js + MySQL (AWS RDS, ap-south-1). Role-based dashboards (Operator, Admin). Color-coded inverter grid with Framer Motion pulsing animations (D/E categories). Real-time simulator: every 15s generates CSV-derived sensor readings (DC voltage, current, AC power, module temp, ambient temp, irradiation, frequency, power factor) → batch ML inference → writes to `inverter_readings` table → frontend polls. JWT auth in httpOnly cookies, bcrypt (salt=12), Zod validation, parameterized queries, rate limiting (5 login/min/IP). Recharts for 24h sensor trend lines and SHAP bar charts.

**Stack:** Python · XGBoost · Optuna · SHAP · SMOTE · scikit-learn · FastAPI · Groq Llama 3.3 70B · SentenceTransformers · FAISS · LangSmith · ReportLab · Next.js 15 · Express.js · MySQL · AWS RDS · TailwindCSS v4 · shadcn/ui · Recharts

---

### lakshya-ldce — SOLV.ai
**`/lakshya-ldce`** | Tark Shaastra · LDCE Hackathon | **Team Leader** · Conversational ML Engineer

AI-powered multi-channel voice complaint management system for the Indian FMCG/wellness industry. Five independently deployable microservices.

**NLP Text Classifier (`text_classifier/`, port 8002):** ONNX-accelerated dual-model ensemble — DistilBERT-MNLI (zero-shot NLI via hypothesis entailment, ~260MB) + MiniLM-L6 (384-dim semantic embeddings, cosine similarity against reference embeddings, ~80MB). 50/50 weighted ensemble probability average. VADER lexicon for compound sentiment scoring (negation, intensifier, punctuation rules). DecisionTree priority classifier (5 features: sentiment, |sentiment|, category, text_length, word_count; max_depth=6). Full pipeline: ~12ms per prediction on ONNX Runtime + CUDA vs ~35ms PyTorch eager. 100% category accuracy in ablation tests. Prometheus metrics endpoint.

**GenAI Resolution Engine (`genai/`, port 8004):** Groq Llama 3.3 70B selected via 10-model ablation study (120 API calls: 10 models × 4 scenarios × 3 tasks, auto-evaluated on 5 weighted metrics: classification accuracy 30%, priority accuracy 25%, resolution quality 25%, format compliance 10%, response quality 10%). Groq wins: 96.9% overall, 1.4s avg, 100% category accuracy, 100% JSON compliance. 4-layer guardrails: strip control chars + escape HTML + truncate (2000 chars), 13 regex prompt-injection patterns, output cross-validation (required fields + escalation rules), safe JSON parser (direct → markdown fence → first `{...}` block). Branded HTML email generation. LangSmith tracing.

**Speech-to-Text (`stt/`, port 8001):** Faster-Whisper Tiny (CTranslate2 INT8/FP16 quantization, ~75MB, 4× speedup over PyTorch). Silero VAD ONNX (~400KB RNN, 512-sample sliding window at 16kHz, 32ms granularity, RNN state propagation). Pipeline: resample to 16kHz → peak normalize → VAD → Whisper (greedy beam_size=1) → filler-word removal + number→digit conversion + sentence casing. WebSocket `/ws/transcribe` with 4000ms window + 450ms overlap to prevent word-boundary truncation. GPU: 300-500ms; CPU: 1-2s.

**Voice Agent Orchestrator (`voice-agent/`, port 8003):** Twilio Media Stream (mu-law → PCM16 conversion) → FSM state machine (6 states: greeting → collecting → confirming → classifying → resolving → ticket_created). 5 specialized agents: Dialog (LLM multi-turn extraction, max 4 turns), Classify (HTTP to NLP), Resolve (LLM step generation), Ticket (backend CRUD + SLA), Analytics (WebSocket broadcast). Ollama phi3.5 (1.5B) local fallback. Piper ONNX TTS offline fallback. 40+ FMCG domain speech corrections (e.g. "parley g" → "Parle-G"). Dual-mode: online (Groq + Edge TTS, 2-3s/turn) and offline (Ollama + Piper, 4-6s/turn, ~2.8GB RAM total).

**Website (`website/`, port 3000):** Next.js 16 + React 19 + TypeScript + Prisma ORM + Supabase/PostgreSQL. 4 role-based dashboards (Admin, Operational, Call Center, QA). Complaint intake pipeline: Zod validation → optional STT → NLP classify → GenAI resolve → Supabase persist → ComplaintTimeline entry → SSE broadcast → high-priority alert. 8 Prisma models: User, Product, Customer, Complaint, ComplaintTimeline, DailyMetric, SLAConfig + audit trail. NextAuth v5 JWT with role-based middleware. GSAP + Lenis for landing page. Recharts for analytics.

**Stack:** Python · ONNX Runtime · DistilBERT-MNLI · MiniLM-L6 · VADER · scikit-learn · Groq Llama 3.3 70B · LangSmith · Faster-Whisper · CTranslate2 · Silero VAD · Twilio · Piper TTS · Ollama · Next.js 16 · React 19 · TypeScript · Prisma · Supabase · PostgreSQL · TailwindCSS v4 · NextAuth v5 · Recharts · GSAP

---

### bah-2026-lunar-ice — Lunar Ice Detection 🛰️
**[github.com/Priyanshu-byte-coder/bah-2026-lunar-ice](https://github.com/Priyanshu-byte-coder/bah-2026-lunar-ice)** | ISRO Bharatiya Antariksh Hackathon 2026 · Problem Statement 8

Water-ice detection on the lunar surface from orbital remote-sensing data. Water-ice in the Moon's permanently shadowed regions (PSRs) is the key resource for sustained lunar presence — drinking water, oxygen, rocket fuel. Pipeline: Chandrayaan mission data products preprocessed into aligned raster stacks → spectral signatures, illumination models, and terrain derivatives as features → ML classifiers scoring ice probability per region, handling the class imbalance and label sparsity that make planetary-science ML genuinely hard.

**Stack:** Python · Remote Sensing · Geospatial ML · Chandrayaan data · NumPy/Pandas · Scikit-learn

---

### SIH — Drug Inventory Tracking System
**`/SIH`** | Smart India Hackathon

Concept and system design proposal for an AI-driven pharmaceutical drug inventory tracking system targeting supply chain visibility across India. PowerPoint presentation, idea documentation, system architecture notes.

**Stage:** Concept / Documentation

---

## Full-Stack Applications

### bloom
**[github.com/Priyanshu-byte-coder/bloom](https://github.com/Priyanshu-byte-coder/bloom)**

Full-stack AI-powered mental health companion web app. 100% server-side key management — no secrets exposed to client.

**AI Chat:** Groq API (LLaMA 3.3 70B primary, LLaMA 3 8B fallback on rate limits). Streaming via `ReadableStream`. 10-message rolling context window. Session types: `general`, `crisis`, `exercise`. RAG enhancement: Transformers.js `all-MiniLM-L6-v2` (384-dim) embeds each message server-side → pgvector cosine similarity search (top 6 chunks, threshold ≥ 0.72, user-scoped) → injected into system prompt as past context.

**Crisis Detection — 4 layers:** (1) Synchronous keyword scan (40+ terms, 3 severity buckets: critical/high/medium) on every message. (2) Parallel LLM classification for semantic understanding of ambiguous phrases. (3) Dynamic system prompt injection — critical: 988 Lifeline + Crisis Text Line 741741 + 911; high/medium: validation + exercise suggestions. (4) `crisis_events` table insert with severity, detected keywords, anonymized excerpt, response action.

**Database (Supabase PostgreSQL + pgvector):** 7 tables — `profiles`, `journal_entries`, `chat_sessions`, `chat_messages`, `embeddings` (384-dim vector column, HNSW index, cosine distance), `mental_exercises`, `user_exercise_log`, `crisis_events`. Row-Level Security on all tables (every query scoped to `auth.uid()`). Automatic profile creation via DB trigger on signup.

**Exercises:** 6 categories (breathing, grounding, cognitive_reframe, body_scan, journaling_prompt, distraction), difficulty levels (easy/medium/hard), distress-level matching (1–10 scale), animated step-by-step player with before/after distress scoring.

**Rate limiting:** Upstash Redis sliding window — chat: 20 req/min, journal creation: 10 req/min, global: 100 req/hr.

**Admin:** Email-gated (no role column, server-checked). Platform analytics: daily 30-day bar chart, top-10 users, crisis event log with severity breakdown. Per-user drilldown with full activity history.

**Stack:** Next.js 16 · React 19 · TypeScript · TailwindCSS v4 · Supabase (PostgreSQL + pgvector + RLS) · Groq API · Transformers.js (`all-MiniLM-L6-v2`) · Upstash Redis · Framer Motion 12 · Babel React Compiler plugin · shadcn/ui · Radix UI · Sonner

---

### MZHUB_FULL — MZHub Marketing Website
**`/MZHUB_FULL/freelance/mzhub`** | Freelance client project | Live: https://www.mzhub.in/

Enterprise-grade marketing website for MZHub — an AI-powered spiritual technology platform for religious institutions, temples, ashrams, and faith communities.

**Architecture:** Next.js 14.2 App Router with route groups — `(site)` group, dynamic `[slug]` routes for blog + projects, nested layouts, `loading.tsx` suspense boundaries, `error.tsx` boundaries. SSG (pre-rendered at build time) with dynamic sitemap generation. Server Components for data fetching, explicit `"use client"` directives only where needed.

**Key components:** `AnimatedCanvas` (Three.js 0.167.1 3D background), `RotatingText` (Guru ↔ AI text rotation), `InfiniteCarousel` (continuous scroll), `StaggerTestimonials` (Framer Motion stagger), `TeamCarousel`, `ScrollReveal`/`ScrollSlideReveal`, `PageTransition`, `BlobButton` (animated blob effect). GSAP 3.13 for advanced scroll animations.

**Theming:** Spiritual color palette — indigo (50–950) + gold (50–900) as CSS variables. Inter (sans-serif body) + Playfair Display (serif headings). Dark/light mode via `next-themes 0.4.6` with system preference detection. Tailwind `fadeIn`, `slideUp`, `float` keyframe animations.

**Content management:** MDX blog with `gray-matter` frontmatter parsing. Project MDX files in `content/projects/` with YAML frontmatter (title, tags, gallery, featured). Static data in `lib/` (blogPosts.ts, projectsData.ts, teamMembers.ts, testimonials.ts).

**API routes:** `POST /api/contact` (form handler), `GET /api/blog` (blog data endpoint).

**Stack:** Next.js 14 · React 18 · TypeScript 5 · TailwindCSS 3.4 · Framer Motion 11 · GSAP 3.13 · Three.js 0.167 · shadcn/ui · Radix UI · next-themes · gray-matter · MDX · Lucide React · Tabler Icons

---

### au_ingenium
**`/au_ingenium/final/Main`**

Web application built for the AU Ingenium competition. Firebase authentication (email/password + OAuth), session-based access control, rapid interactive dashboard, and animated UI. Built with vanilla HTML/CSS/JS with Firebase SDK integration for Auth and Realtime Database.

**Stack:** HTML · CSS · JavaScript · Firebase Auth · Firebase Realtime Database

---

### europa_2
**`/europa_2`**

Interactive multi-page educational web experience about Jupiter's moon Europa. Animated entry page with fade-in transitions and sound effects. Individual creature pages (coral, kelp, info_creature, luminesce, shallow) with ambient audio, custom CSS animations, and photo galleries. JavaScript-driven page transitions and full-screen section reveals.

**Stack:** HTML5 · CSS3 · Vanilla JavaScript (audio API, DOM animation)

---

## AI / ML Projects

### IDEA_LAB_MODULINO — SENTINEL (Wellbeing AI / MAYA)
**`/IDEA_LAB_MODULINO/wellbeing_ai`** | [github.com/Priyanshu-byte-coder/SENTINEL](https://github.com/Priyanshu-byte-coder/SENTINEL) | 17★

Privacy-first, fully offline AI mental wellbeing companion for Raspberry Pi 5. Runs 100% locally — zero data leaves the device, no cloud APIs, no telemetry.

**LLM Benchmarking:** 10 Ollama models tested (phi3:mini, llama3.1, qwen2.5, mistral, gemma:2b, survival-gemma/2/3, tinyllama, my-survival). Each model: 5 wellbeing prompts × 10 models = 50 inferences. Production config: `temperature=0.3`, `max_tokens=60`, `num_ctx=1024`, `num_thread=4`. Quality scoring: empathy 30%, brevity 20%, naturalness 20%, length fit 15%, no hallucination 15%. **phi3:mini selected**: 2.0GB (fits 4GB RPi), 3.68s avg, 8.56/10 quality, perfect 10.00/10 on anxiety prompts. qwen2.5 scored 9.13/10 but 4.4GB — excluded from 4GB hardware.

**Core AI modules (`agent/`):**
- `brain.py` (AgentBrain): 5-step pipeline per message — VADER sentiment → ChromaDB RAG retrieval → Emotion Engine fusion → Ollama phi3:mini generation (streaming via `/api/chat`) → ChromaDB storage.
- `sentiment.py`: VADER compound score (−1.0 to +1.0), labels: positive ≥ 0.05, negative ≤ −0.05.
- `emotion.py` (EmotionEngine): Sliding window (10 turns) of sentiment + facial emotion. Dominant emotion: face > text mapping. Trend: first-half vs second-half avg diff >0.15 = improving, <−0.15 = declining. Memory pattern adjustment: >60% negative memories → shift historical avg −0.1.
- `memory.py` (ConversationMemory): ChromaDB persistent store, cosine HNSW index, `all-MiniLM-L6-v2` default embeddings, top-K=2 retrieval. Stores: user message, assistant response, sentiment label/score, emotion, timestamp.
- `exercises.py` (ExerciseManager): 7 evidence-based exercises (Box Breathing 4-4-4-4, Calming Breath 4s/6s, 5-4-3-2-1 Grounding, Quick Gratitude, Body Scan, Present Moment, Tension Release). Trigger conditions: hist_avg < −0.3 OR (declining trend AND hist_avg < −0.15) OR current sentiment < −0.5 OR stress emotion + sentiment < −0.2. 5-turn cooldown.

**Camera (`interface/camera.py`):** OpenCV `VideoCapture` → BGR→RGB → FER v22.5.1 (TensorFlow Keras CNN, Haar Cascade detector, 7 emotions, confidence threshold 0.30). Web: polls `/api/camera/snapshot` every 2.5s for JPEG + emotion overlay.

**Web interface (`web_app.py`):** Flask 3.0 + flask-cors. SSE streaming via `/api/chat_stream` (ReadableStream). Endpoints: `/api/status`, `/api/chat`, `/api/chat_stream`, `/api/camera/snapshot`, `/api/camera/emotion`, `/api/reset`, `/api/exercises`, `/api/exercise/start`, `/api/trigger_exercise`. Single-page glassmorphism UI (purple-blue gradient `#e0c3fc → #8ec5fc`, Google Quicksand font, ~1100 lines of HTML/CSS/JS).

**Stack:** Python 3.10+ · Ollama (phi3:mini, Q4_K_M) · VADER · FER 22.5.1 · TensorFlow 2.15–2.18 · OpenCV · ChromaDB · Flask 3 · numpy <2.0

---

### TEAM_CONSOLE5.0_MITSUBISHI — Spectra Scan (CON-SOL-E Vision Pro) 🏆 National Rank #4
**`/TEAM_CONSOLE5.0_MITSUBISHI/MECup`** | Mitsubishi Electric Cup, 6th Edition (2026)

**Automated Paint Defect Detection System** — Real-world industrial QC platform for automated visual inspection of painted automotive door panels on a 2m × 2m × 2m CNC gantry system. Full-stack Electron desktop application. 100% local — no internet, no cloud.

**Computer Vision Pipeline:**
- **Model architecture:** DINOv2 ViT-B/14 frozen encoder (patch size 14) extracts skip-connection features at intermediate layers [3, 7, 11]. Multi-Scale CNN Decoder (trainable, channels [256, 128, 64], progressive upsampling with skip fusion, Dropout 0.1) + segmentation head for per-pixel classification.
- **Inference:** Input 518×518px (ImageNet normalize, NHWC→NCHW layout conversion). OpenVINO 2024 compiled model on Intel iGPU — sub-500ms per image. Postprocess: argmax segmentation mask + softmax confidence maps. SciPy connected component analysis for individual defect instance counting + area ratio calculation.
- **Defect types:** Dust (particulate contamination), Scratch (linear surface damage), Rundown (paint drip/sag). Area-based severity thresholds for Pass/Fail verdict.
- **Model conversion:** `backend/inference/convert_model.py` — PyTorch → ONNX → OpenVINO IR.

**Hardware Control:**
- **PLC:** Mitsubishi PLC via MC Protocol (TCP binary) using `rk_mcprotocol`. `PLCManager` singleton with continuous polling thread. 30+ endpoints for scan/control. Emergency stop monitoring (M599), servo enable interlocks, homing sequences.
- **Camera:** HIKROBOT MVS SDK (GigE industrial camera). Configurable exposure, gain, trigger modes. `CameraManager` singleton wrapper.
- **Motion:** 3-axis (X/Y/Z) servo motor control with real-time position feedback in mm. Variable-speed jog in Manual Mode.
- **LED:** Programmable illumination (White/Green) with directional control (Up/Down/Left/Right).

**RAG Troubleshooting Agent (`backend/production_rag/`):** LangChain + LangGraph (stateful graph execution). Ollama Phi-3 (local, offline). ChromaDB vector store with BGE-base-en-v1.5 HuggingFace embeddings. 345 hardcoded error codes in `agent_improved.py`. PDF technical manuals → `rebuild_vectordb.py` → ChromaDB index. Session-based multi-turn conversation history.

**Reporting:** `utils/image_stitcher.py` — weighted blending of grid images into panoramic door-panel view. Gaussian-smoothed defect heatmaps for concentration zones. `html2pdf.js` client-side PDF report generation (defect breakdown, vision analytics, process recommendations). Background thread workers (Python `threading`) for non-blocking stitch+heatmap generation post-scan.

**Frontend (Electron 39 + React 18 + Vite 5):** 13 page components — Dashboard (React Three Fiber GLB model viewer `DoorChecker.glb`), Automatic Mode (start/stop/reset scan cycle, real-time defect grid, model selection White/Black), Manual Mode (jog controls, LED panel, servo enable/disable/homing), Past Scans (searchable, filterable, detail view + stitched image + heatmap + PDF), Heartbeat (live X/Y/Z servo position Recharts charts, daily min/max stats, component health), Settings (PLC IP/port, camera exposure/gain, stitch scale), User Management (Admin RBAC: Admin/Operator/Viewer roles). 49 shadcn/ui + Radix components. Framer Motion animations. React Query polling for real-time hardware state. Global emergency stop popup.

**Backend (FastAPI + Python):** `main.py` FastAPI entrypoint + `mobile_main.py` standalone mobile API. SQLAlchemy ORM + SQLite (`mecup.db`). `auth/` — JWT (python-jose) + bcrypt (passlib). `plc/scan_manager.py` — ScanSession state machine. `psutil + WMI` for CPU/GPU/memory/disk monitoring.

**Remote companion (mobile):** Tablet-optimized pages — dashboard, health monitoring, scan reports. Same JWT auth. Network-accessible from any device on LAN.

**Stack:** React 18 · TypeScript · Electron 39 · Vite 5 · TailwindCSS 3 · shadcn/ui · Radix UI · Framer Motion · React Query · Recharts · React Three Fiber (Three.js) · html2pdf.js · Python 3.10+ · FastAPI · Uvicorn · SQLAlchemy · SQLite · DINOv2 ViT-B/14 · OpenVINO 2024 · OpenCV · Pillow · NumPy · SciPy · LangChain · LangGraph · Ollama (Phi-3) · ChromaDB · BGE-base-en-v1.5 · MC Protocol · HIKROBOT MVS SDK · psutil · WMI

---

### gdg_solution_challenge
**`/gdg_solution_challenge`**

GDG Solution Challenge Flask + Gemini AI submission. Combines Gemini `gemini-exp-1206` conversational AI with OpenWeatherMap real-time weather data. Session-based conversation history. `SECRET_KEY` + `WEATHER_API_KEY` + `GEMINI_API_KEY` environment-variable driven. Context-aware responses that incorporate live weather into agricultural/general AI advice.

**Stack:** Python · Flask · Google Generative AI SDK · OpenWeatherMap API · python-dotenv

---

### token_counter — TokenScope
**`/token_counter`**

Cross-platform Electron desktop app for unified AI platform API key discovery and token usage monitoring.

**Auto-discovery:** Reads config files (`~/.claude/settings.json`, `~/.huggingface/token`, `~/.config/github-copilot/hosts.json`, etc.) and environment variables (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GROQ_API_KEY`, `MISTRAL_API_KEY`, `COHERE_API_KEY`, `TOGETHER_API_KEY`, `REPLICATE_API_TOKEN`, `PERPLEXITY_API_KEY`, `HF_TOKEN`, `GH_TOKEN`, `GOOGLE_API_KEY`). Cross-platform paths: `%APPDATA%` (Windows), `~/.config` (Linux), `~/Library` (macOS).

**Security:** All API keys stored exclusively in OS keychain (Windows Credential Manager / macOS Keychain / libsecret via `keytar` native module). Renderer process sandboxed — no Node.js access. All sensitive ops in main process. Keys travel only to each platform's own HTTPS endpoint. CSP blocks external resource loads.

**Usage APIs:** Anthropic (monthly token aggregate), OpenAI (daily usage), Groq (OpenAI-compatible format), Mistral AI (monthly aggregate), Cohere (monthly aggregate), Together AI (token usage endpoint). Graceful degradation for Cursor (install path detect → links to settings), HuggingFace (account verify only), GitHub Copilot (enterprise plan gate), Perplexity (no public API).

**Google OAuth:** Electron OAuth flow → browser window → Google Identity API → account email displayed on Gemini card. Detects platforms sharing same Google account.

**Frontend (Vite + React):** Zustand state management. Pages: Overview, Platforms, AddPlatform, Settings. Components: PlatformCard, UsageBar, auto/manual badges. Auto-refresh every 5 minutes (configurable). Typed IPC wrappers via `preload/` contextBridge. `shared/types.ts` shared between main and renderer.

**Build:** Electron Builder — `.exe` (Windows), `.dmg` (macOS), `.AppImage`+`.deb` (Linux). GitHub Actions builds on tag push.

**Stack:** Electron · React · TypeScript · Vite · Zustand · keytar · electron-store · Google OAuth 2.0

---

### Movie Recommender System
**[github.com/Priyanshu-byte-coder/movie-recommender](https://github.com/Priyanshu-byte-coder/movie-recommender)** | [Live demo](https://movierecommender-l27gqgyeweduhskslis84n.streamlit.app/)

Content-based recommendation engine using cosine similarity. TMDb API for real-time movie posters and metadata. Interactive Streamlit UI.

**Stack:** Python · Machine Learning · Streamlit · TMDb API

---

## Embedded & Hardware AI

> See: **SENTINEL** (`/IDEA_LAB_MODULINO/wellbeing_ai`) for Raspberry Pi AI.
> See: **Spectra Scan** (`/TEAM_CONSOLE5.0_MITSUBISHI/MECup`) for industrial hardware AI + PLC integration.

---

## Freelance & Client Work

### PropSpace
**`/freelance/10k_realestate/prop_space`**

Premium residential real estate advisory platform for the Ahmedabad market. Curated property discovery for buyers and full CMS for admins.

**State management:** Zustand v4 (global UI state) + TanStack React Query v5 (server state: caching, background refetch, optimistic updates) + Axios HTTP client. React Hook Form + Zod for schema-validated forms. Mock backend on port 4000 (`npm run mock`) for development.

**UI:** Swiper.js v11 for property carousels. React Leaflet v4 for interactive property maps. Yet Another React Lightbox for image galleries. React Helmet Async for per-page SEO. date-fns for listing date formatting. Vercel deployment config (`vercel.json`).

**Stack:** React 18 · Vite 5 · React Router DOM v6 · Zustand v4 · TanStack React Query v5 · Axios · TailwindCSS v3 · React Hook Form · Zod · Swiper.js v11 · React Leaflet v4

---

### Foodie Fountain
**`/freelance/paratha_singh/foodie-fountain`**

Food-themed web application for a client. TypeScript + React + Vite SPA. Component library with `components.json` (shadcn/ui config). Playwright E2E test suite (`playwright.config.ts` + `playwright-fixture.ts`). Vercel deployment. `bun.lock` — Bun package manager.

**Stack:** TypeScript · React · Vite · TailwindCSS · shadcn/ui · Playwright · Bun

> See also **MZHub Marketing Website** under Full-Stack Applications (freelance client project, shipped to production on Azure).

---

## Competitive Challenges

### imc — IMC Prosperity 5 Algorithmic Trading
**`/imc/Fantastics-of-Prosperity`** | Team Prosperity-Fantastics

Algorithmic trading infrastructure and strategy repository for the IMC Prosperity 5 competition.

**Strategies:**
- **EMERALDS (Market Making):** Dynamic undercutting — scans L1 orderbook and quotes exactly 1 tick better than the closest existing liquidity (`best_bid + 1`, `best_ask − 1`). Monopolizes best placement to capture 7+ point spreads when taker bots arrive. Avoids static 2-tick-from-fair-value approach.
- **TOMATOES (Mean Reversion):** Exploits −0.44 tick-to-tick autocorrelation. "Wall Mid" — finds deepest volume walls from designated market makers to anchor fair value (ignores easily-spoofed L1 mid). Order Book Imbalance (OBI) shifts FV ±1 point based on book lean. Aggressive position skew: as inventory rises, slash order size and shift required profit spread opposite to position ("spring" effect to prevent hitting ±80 limit).

**Local backtester:** `backtest.py` — replays historic log data from `prices_round_0_day_*.csv` as offline orderbook simulation. Validates position logic and crashes without internet. Each round has its own `algorithm.py` (single-file `Trader` class) and `strategy_log.md` (PnL graph analysis + incremental improvements).

**Repository structure:** `TUTORIAL_ROUND_1/`, `ROUND_1/` through `ROUND_5/` — each with algorithm, backtest, and strategy log. `neal_algo/` — team member's algorithm variant. `information.md` + algorithm documentation markdown files.

**Stack:** Python · Custom orderbook simulation

---

## Business / Docs

> **SIH** (Drug Inventory Tracking) — concept/documentation stage, see Hackathon Projects.

---

## Summary

| Category | Projects |
|---|---|
| Open Source | **contextrot (10K+ downloads)**, **devtrack (190+★, 1000+ merged PRs)**, KeepTrack, PyTorch + TensorFlow + Keras contributions |
| Internship (Velino AI) | OmniVoice Voice Bot, Salesnix site+dashboard, Reputation Shield (Sociafy), Gauri voice agent, Flash/Priya voice agent |
| Hackathon | LUMIN.AI (Winner, HackAMined), SOLV.ai (lakshya-ldce), Lunar Ice Detection (ISRO BAH), SIH |
| Full-Stack Apps | bloom, MZHUB_FULL, au_ingenium, europa_2 |
| AI / ML | SENTINEL (17★), Spectra Scan (Rank #4, MECup), GDG solution, TokenScope, Movie Recommender |
| Freelance | MZHub, PropSpace, Foodie Fountain |
| Competitive | IMC Prosperity 5 |

---

*Priyanshu Doshi · Nirma University · Graduation 2028 · [Portfolio](https://portfolio-eta-gilt-84.vercel.app/)*
