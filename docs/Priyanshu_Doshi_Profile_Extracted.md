# Priyanshu Doshi - Profile

Current-state summary of who I am, what I'm doing, and what I've shipped. Last updated: 17 July 2026.

## Basic Identity

- Name: Priyanshu Doshi
- Title: AI & Machine Learning Engineer
- Tagline: Building intelligent systems end-to-end — from industrial computer vision and edge AI to full-stack platforms with GenAI.
- Personal line: "I teach machines how to think while I'm still figuring out how to get 8 hours of sleep."

## Contact

- Email: doshipriyanshu3@gmail.com
- Phone: +91 9549926195
- Location: Ahmedabad, Gujarat, India
- LinkedIn: https://www.linkedin.com/in/priyanshu-doshi-21a54230a/
- GitHub: https://github.com/Priyanshu-byte-coder
- Portfolio: https://portfolio-eta-gilt-84.vercel.app/
- X: https://x.com/Priyanshu_26_11
- Instagram: https://www.instagram.com/priyyannshoo/
- LeetCode: https://leetcode.com/u/Priyanshu_doshi/ (200+ problems solved)

## Current State (July 2026)

- AI/ML Engineering Intern at **Velino AI** (remote, since May 2026) — building voice AI agents (Pipecat + Gemini Live) and web products.
- Creator & maintainer of **contextrot** — open-source CLI measuring coding-agent degradation; **10,000+ downloads on PyPI**.
- Founder & maintainer of **devtrack** — open-source developer productivity dashboard; 190+ stars, 430+ forks, 1,000+ merged community PRs.
- **PyTorch contributor** — pull requests merged into pytorch/pytorch core; more in review.
- **IEEE-published** — Robotic Arm Fault Detection paper in IEEE Sensors Letters, 100+ full-text views on IEEE Xplore.
- Vice Chair, ACM Student Chapter at Nirma University.
- B.Tech AI/ML student, 3rd year from July 2026.

## Summary

I work at the intersection of AI, software engineering, and product: industrial computer vision on real factory hardware, privacy-first edge AI on Raspberry Pi, voice agents over live phone calls, GenAI platforms with hardened guardrails, and open-source developer tools with real adoption. I own products end-to-end — design, build, deploy, maintain — and I validate choices empirically (model ablations, walk-forward CV, on-device benchmarks) rather than by default.

## Education

- Institute of Technology, Nirma University
- B.Tech in Artificial Intelligence and Machine Learning
- Duration: Jul 2024 - Jul 2028
- CGPA: 8.65 / 10.0
- Class XII (Science): 96.7% | 99.1 percentile | Gujarat Rank 160

## Experience

### AI/ML Engineering Intern - Velino AI

- Duration: May 2026 - Present
- Type: Remote
- Built five projects across voice AI and web:
  - **OmniVoice Voice Bot** — self-hosted voice pipeline (browser mic → WebSocket → Silero VAD → faster-whisper STT → Groq LLM → OmniVoice TTS), FastAPI TTS server with streaming endpoints, GPU concurrency benchmarking, voice cloning from reference audio. No per-minute API cost for STT/TTS.
  - **Salesnix** — marketing site + dashboard frontend (Next.js/TypeScript): v2 landing page, mobile-responsive layout, dashboard + call-logs pages wired to backend API, Cloudflare Pages/Netlify deploys.
  - **Reputation Shield (Sociafy feature)** — brand monitoring added to existing product: source fetchers (Google News RSS, Hacker News, Wikipedia, Reddit OAuth2, X search), keyword sentiment scorer (crisis/negative/neutral/positive + severity), OpenAI/Groq reply drafting, approve→publish flow, cron scanning. Drizzle/Postgres, Clerk auth.
  - **Gauri** — real-estate voice agent (Gemini Flash Live + Pipecat + Silero VAD, 10 n8n webhook tool calls, qualification/booking system prompt).
  - **Flash/"Priya"** — FMCG/retail order-taking voice agent (Gemini Live + Pipecat, catalog/order/lead tools, Supabase order storage).

### Artificial Intelligence Engineer - Team CON-SOL-E

- Duration: Jan 2026 - Mar 2026
- Type: Full-time, on-site (Ahmedabad)
- RAG-based intelligent agents for real-world problem statements; web, WebAR, and app experiences; ideation to prototype deployment.
- National Rank 4 at Mitsubishi Electric Cup (Spectra Scan).

### Full Stack Developer Intern - MZHUB Faithtech

- Duration: Dec 2025
- Type: Remote | Site: https://www.mzhub.in/
- Production-ready business website in Next.js; responsive scalable frontend; automated contact form with email notifications; deployed on Microsoft Azure App Service.

### AI/ML Intern - Elevate Labs

- Duration: May 2025 - Jun 2025
- Type: Remote | Top-performing intern
- End-to-end NLP and Computer Vision pipelines: preprocessing, feature engineering, training, evaluation. PyTorch, TensorFlow, Scikit-learn.

### Vice Chair - ACM Student Chapter, Nirma University

- Duration: Sep 2025 - Present
- Led technical workshops, hackathons, and industry events impacting 500+ students; organized seminars on emerging AI and ethical AI practices.

## Open Source

- **contextrot** (creator/maintainer) — Python CLI that measures where your coding agent starts degrading from your own local session transcripts. 5 failure signals correlated with context fill; verdict-first reports with confidence intervals and prescriptions. 100% local, zero-config (`uvx contextrot`). **10,000+ PyPI downloads.** https://github.com/Priyanshu-byte-coder/contextrot
- **devtrack** (founder/maintainer) — self-hostable GitHub productivity dashboard grown into a community open-source project. **190+ stars, 430+ forks, 1,000+ merged PRs, 100+ contributors.** Full OSS hygiene: CI, codecov, Playwright e2e + visual tests, Sentry, security policy. https://github.com/Priyanshu-byte-coder/devtrack
- **KeepTrack** (creator) — Chrome MV3 extension capturing "keep vs temporary" download intent at download time. Zero telemetry, fully local. https://github.com/Priyanshu-byte-coder/keeptrack
- **PyTorch** — pull requests merged into pytorch/pytorch core (via pytorchmergebot); additional PRs in review across nn, autograd, distributions, optim, DTensor tests, and docs.
- **TensorFlow** — pull request merged into tensorflow/tensorflow (Jul 2026): tf.signal DCT/IDCT documentation and validation fixes.
- **Keras** — pull request merged into keras-team/keras: input validation (ValueError on out-of-bounds axis) in LayerNormalization.build().

## Research and Publication

### Robotic Arm Fault Detection using CatBoost Classifier

- Publication: IEEE Sensors Letters (2026)
- Paper: https://ieeexplore.ieee.org/document/11359621
- Metrics: 97.20% accuracy, 0.9718 F1 score
- **100+ full-text views on IEEE Xplore**
- Predictive industrial fault detection on the CASPER robotic arm dataset; outperformed SVM, Logistic Regression, Naive Bayes, and QDA baselines across all evaluation metrics.

## Flagship Projects

(Full detail in projects.md.)

- **contextrot** — context-rot analytics for coding agents. 10K+ PyPI downloads.
- **Spectra Scan** — automated paint defect detection on a 2m³ CNC gantry; DINOv2 + OpenVINO sub-500ms offline inference; Mitsubishi PLC control. National Rank #4, Mitsubishi Electric Cup.
- **LUMIN.AI** — solar plant risk monitoring: Optuna-tuned XGBoost + SHAP, Groq GenAI layer with 4-layer guardrails. Winner, Aubergine track, HackAMined 2026 (Top 5 of 400+ teams).
- **SOLV.ai** — multi-channel voice complaint management: ONNX ensemble NLP (12ms), Faster-Whisper STT, Twilio voice agent FSM. Team leader, Tark Shaastra LDCE.
- **SENTINEL** — fully offline mental-wellbeing companion on Raspberry Pi 5; phi3:mini chosen via 10-model on-device benchmark. 17★.
- **bloom** — mental-health web app with 4-layer crisis detection and pgvector RAG memory.
- **Lunar Ice Detection** — ISRO Bharatiya Antariksh Hackathon 2026 (PS-8), water-ice mapping from Chandrayaan data.
- **KeepTrack**, **devtrack**, **TokenScope**, **MZHub**, **IMC Prosperity** — see projects.md.

## Achievements

- Winner - Aubergine Track, HackAMined National Hackathon 2026 (1st in track, Top 5 overall among 400+ teams / 2300+ participants)
- National Rank 4 - Mitsubishi Electric Cup, 6th Edition (2026), Team CON-SOL-E
- IEEE Publication - IEEE Sensors Letters 2026 (100+ full-text views)
- Reliance Foundation Undergraduate Scholar (2025)
- Winner - CodeAdda Premier League (Codeforces), Apr 2025 (1st among 200+ participants)
- LeetCode: 200+ problems solved

## Skills

### Languages

Python · C++ · C · TypeScript · JavaScript · SQL · HTML · CSS

### ML & Vision

PyTorch · TensorFlow · Keras · Scikit-learn · CatBoost · XGBoost · Optuna · SHAP · OpenCV · DINOv2 · ONNX · OpenVINO · Faster-Whisper · NumPy · Pandas · Computer Vision · NLP

### GenAI & LLMs

LangChain · LangGraph · RAG · FAISS · ChromaDB · pgvector · Ollama · Groq · Gemini Live · SentenceTransformers · Transformers.js · LangSmith · Hallucination Guardrails · Prompt Engineering · Agentic Workflows

### Web & Realtime

React · Next.js · Node.js · Express.js · FastAPI · Flask · Electron · Prisma · Drizzle · WebSockets · WebRTC (Pipecat) · Twilio · n8n · Chrome Extensions (MV3) · Tailwind CSS · GSAP · Three.js · Streamlit

### Infra & Data

Supabase · PostgreSQL · MySQL · Upstash Redis · AWS RDS · Azure · GCP · Docker · Modal · Vercel · Netlify/Cloudflare Pages · Git · GitHub · CI/CD · Jupyter

### Soft Skills

Team Collaboration · Leadership · Problem Solving · Communication · Project Management

## Certifications

- Supervised Machine Learning - DeepLearning.AI (Stanford) / Coursera — 99.83% — https://www.coursera.org/account/accomplishments/verify/XAJRZO7BC5FV
- PyTorch for Deep Learning Bootcamp - Udemy — 95.4% — https://www.udemy.com/certificate/UC-b6ce5ecb-878e-47f8-b575-30da33db7cca/

## Portfolio-Specific Details

- Site: https://portfolio-eta-gilt-84.vercel.app/ — dedicated pages per project at /projects/:id, JARVIS chatbot at /chat.
- Stats strip: 2+ years experience, 1 IEEE paper, 8.65 CGPA, 200+ LC problems.
- Relevant coursework: Machine Learning, Deep Learning, Neural Networks, Computer Vision, NLP, DSA, DBMS, Operating Systems, Computer Networks, Linear Algebra, Probability & Statistics, Python.

## Notes

- This file is the single source of truth for profile facts; projects.md holds full per-project detail. Both feed the portfolio chatbot knowledge base (src/knowledge/context.ts).
