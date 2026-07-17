export const PERSONAL = {
  name: 'Priyanshu Doshi',
  title: 'AI & Machine Learning Engineer',
  tagline:
    "Building intelligent systems end-to-end — from industrial computer vision and edge AI to full-stack platforms with GenAI. I care about turning ambitious ideas into real, deployed products.",
  email: 'doshipriyanshu3@gmail.com',
  phone: '+91 9549926195',
  location: 'Ahmedabad, Gujarat, India',
  github: 'https://github.com/Priyanshu-byte-coder',
  linkedin: 'https://www.linkedin.com/in/priyanshu-doshi-21a54230a/',
  twitter: 'https://x.com/Priyanshu_26_11',
  instagram: 'https://www.instagram.com/priyyannshoo/',
  leetcode: 'https://leetcode.com/u/Priyanshu_doshi/',
};

export const MARQUEE_ITEMS = [
  'Computer Vision', 'Edge AI', 'LLMs & RAG', 'Full-Stack',
  'XGBoost', 'PyTorch', 'OpenVINO', 'Next.js',
  'FastAPI', 'Hackathon Winner', 'IEEE Published',
  'Computer Vision', 'Edge AI', 'LLMs & RAG', 'Full-Stack',
  'XGBoost', 'PyTorch', 'OpenVINO', 'Next.js',
  'FastAPI', 'Hackathon Winner', 'IEEE Published',
];

export interface Metric { label: string; value: string; }
export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  tech: string[];
  metrics: Metric[];
  links: { github?: string; docs?: string };
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'spectra-scan',
    title: 'Spectra Scan',
    subtitle: 'Automated Paint Defect Detection System',
    badge: 'National Rank #4 — Mitsubishi Electric Cup',
    description:
      'Real-world industrial QC platform for automated visual inspection of painted automotive door panels on a 2m×2m×2m CNC gantry system. Full-stack Electron app with DINOv2 ViT-B/14 vision pipeline, PLC motor control, RAG troubleshooting agent, and remote monitoring companion.',
    tech: ['DINOv2', 'OpenVINO', 'FastAPI', 'React', 'Electron', 'LangChain', 'ChromaDB', 'PLC'],
    metrics: [
      { label: 'Inference', value: '<500ms' },
      { label: 'Model', value: 'ViT-B/14' },
      { label: 'National Rank', value: '#4' },
    ],
    links: {
      github: 'https://github.com/Mitanshp5/MECup',
    },
  },
  {
    id: 'lumin-ai',
    title: 'LUMIN.AI',
    subtitle: 'AI-Powered Solar Plant Risk Monitoring',
    badge: 'Winner — HackAMined Aubergine Track',
    description:
      'Full-stack solar inverter monitoring platform with 4 microservices. Optuna-tuned XGBoost ML pipeline with SHAP explainability, Groq Llama 3.3 70B GenAI layer with RAG and 4-layer hallucination guardrails, agentic maintenance ticket workflows, and real-time Next.js dashboard.',
    tech: ['XGBoost', 'SHAP', 'Groq LLM', 'FAISS', 'LangSmith', 'Next.js', 'Express', 'AWS RDS'],
    metrics: [
      { label: 'Features', value: '183' },
      { label: 'LLM Score', value: '91.7%' },
      { label: 'Guardrails', value: '4-Layer' },
    ],
    links: { github: '#' },
  },
  {
    id: 'solv-ai',
    title: 'SOLV.ai',
    subtitle: 'Multi-Channel Voice Complaint Management',
    badge: 'Tark Shaastra — LDCE Hackathon',
    description:
      'AI-powered complaint system for Indian FMCG with 5 microservices. ONNX-accelerated DistilBERT+MiniLM ensemble NLP classifier, Faster-Whisper STT with Silero VAD, Twilio voice agent FSM with 5 specialized agents, and role-based Next.js 16 dashboards.',
    tech: ['DistilBERT', 'ONNX', 'Faster-Whisper', 'Twilio', 'Groq LLM', 'Next.js 16', 'Prisma', 'Supabase'],
    metrics: [
      { label: 'NLP Accuracy', value: '100%' },
      { label: 'LLM Score', value: '96.9%' },
      { label: 'STT Latency', value: '300ms' },
    ],
    links: { github: '#' },
  },
  {
    id: 'sentinel',
    title: 'SENTINEL',
    subtitle: 'Privacy-Preserving Edge AI Wellbeing',
    badge: 'Fully Offline — Raspberry Pi 5',
    description:
      'Privacy-first mental wellbeing AI companion running 100% locally on Raspberry Pi 5. Phi3:mini LLM via Ollama, VADER sentiment + FER facial emotion recognition, ChromaDB conversation memory with RAG retrieval, and evidence-based exercise system.',
    tech: ['Phi3:mini', 'Ollama', 'VADER', 'FER', 'ChromaDB', 'OpenCV', 'Flask'],
    metrics: [
      { label: 'Quality Score', value: '8.56/10' },
      { label: 'Avg Latency', value: '3.68s' },
      { label: 'Memory', value: '2GB' },
    ],
    links: { github: '#' },
  },
  {
    id: 'contextrot',
    title: 'contextrot',
    subtitle: 'Context-Rot Analytics for Coding Agents',
    badge: '10K+ Downloads on PyPI',
    description:
      'Open-source CLI that proves where your coding agent starts degrading — on your own sessions. Parses local JSONL transcripts, extracts 5 independent failure signals (edit failures, retry loops, re-reads, self-corrections, drift), correlates them with context fill, and prescribes exactly what to change. 100% local, zero-config: uvx contextrot.',
    tech: ['Python', 'CLI', 'Statistics', 'Claude Code', 'Context Engineering', 'PyPI'],
    metrics: [
      { label: 'Downloads', value: '10K+' },
      { label: 'Failure Signals', value: '5' },
      { label: 'Local / Offline', value: '100%' },
    ],
    links: { github: 'https://github.com/Priyanshu-byte-coder/contextrot' },
  },
];

export interface SecondaryProject {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  tag: string;
  stat?: string;
}

export const SECONDARY_PROJECTS: SecondaryProject[] = [
  { id: 'devtrack', title: 'devtrack', desc: 'Self-hostable GitHub productivity dashboard — contribution heatmap, PR analytics, weekly goals.', tech: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'], tag: 'Open Source · Maintainer', stat: '190+ ★ · 1000+ merged PRs' },
  { id: 'keeptrack', title: 'KeepTrack', desc: 'Chrome extension that captures "keep vs temporary" download intent at download time. Zero telemetry, fully local, MV3.', tech: ['JavaScript', 'Chrome MV3', 'IndexedDB'], tag: 'Chrome Extension', stat: 'Live on GitHub Pages' },
  { id: 'lunar-ice', title: 'Lunar Ice Detection', desc: 'Water-ice detection on the lunar surface for ISRO Bharatiya Antariksh Hackathon 2026 (PS-8) — remote sensing + ML pipeline over Chandrayaan data.', tech: ['Python', 'Remote Sensing', 'ML', 'Geospatial'], tag: 'ISRO BAH 2026', stat: 'Chandrayaan data' },
  { id: 'mzhub', title: 'MZHub', desc: 'Enterprise marketing website for an AI spiritual tech platform. Three.js 3D backgrounds, MDX blog, GSAP scroll animations.', tech: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'], tag: 'Freelance', stat: 'Shipped to production' },
  { id: 'tokenscope', title: 'TokenScope', desc: 'Cross-platform Electron app for API key auto-discovery and unified token usage monitoring across AI platforms.', tech: ['Electron', 'React', 'Zustand', 'keytar'], tag: 'Desktop App', stat: '6 providers' },
  { id: 'imc-prosperity', title: 'IMC Prosperity', desc: 'Algorithmic trading strategies — dynamic market making and mean reversion with orderbook imbalance scoring.', tech: ['Python', 'Algorithmic Trading', 'Backtesting'], tag: 'Competition', stat: 'Custom backtester' },
];

export interface Experience {
  role: string;
  company: string;
  duration: string;
  type: string;
  desc: string;
}

export const EXPERIENCES: Experience[] = [
  { role: 'AI/ML Engineer Intern', company: 'Velino AI', duration: 'Jun 2026 — Present', type: 'Remote', desc: 'Built two production AI SaaS products from scratch — Salesnix AI: B2B voice ordering agent (Gemini Live, Pipecat-AI WebRTC, Silero VAD, WhatsApp Cloud API, live tool calls, Razorpay); Sociafy: multi-model content pipeline (GPT-5, Claude agentic loops, Modal GPU TTS/video, OAuth 2.0, Stripe/Razorpay billing).' },
  { role: 'AI Engineer', company: 'Team CON-SOL-E', duration: 'Jan — Mar 2026', type: 'Full-time', desc: 'Built RAG-based intelligent agents for industrial automation. Contributed to web, WebAR, and app platforms. National Rank 4 at Mitsubishi Electric Cup.' },
  { role: 'Full Stack Developer', company: 'MZHUB Faithtech', duration: 'Dec 2025', type: 'Remote', desc: 'Developed production-ready marketing site with Next.js. Automated contact forms with email notifications. Deployed on Azure App Service.' },
  { role: 'AI/ML Intern', company: 'Elevate Labs', duration: 'May — Jun 2025', type: 'Remote', desc: 'Top-performing intern. Built end-to-end NLP and Computer Vision pipelines with PyTorch, TensorFlow, and Scikit-learn.' },
  { role: 'Vice Chair', company: 'ACM Student Chapter, Nirma', duration: 'Sep 2025 — Present', type: 'Leadership', desc: 'Led workshops, hackathons, and industry events impacting 500+ students.' },
];

export interface Achievement {
  title: string;
  desc: string;
  color: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { title: 'HackAMined Winner', desc: '1st place Aubergine track, Top 5 overall among 400+ teams (2300+ participants)', color: '#c45d3e' },
  { title: 'IEEE Publication', desc: 'Robotic Arm Fault Detection — 97.20% accuracy, 0.9718 F1 score in IEEE Sensors Letters', color: '#b8976a' },
  { title: 'National Rank #4', desc: 'Mitsubishi Electric Cup 6th Edition — Industrial automation competition', color: '#c45d3e' },
  { title: 'Reliance Foundation Scholar', desc: 'Selected for the Reliance Foundation Undergraduate Scholarship 2025', color: '#b8976a' },
  { title: 'CodeAdda Premier', desc: '1st place among 200+ participants in Codeforces competition', color: '#c45d3e' },
];

export const SKILL_CATEGORIES: Record<string, string[]> = {
  'Languages': ['Python', 'C++', 'C', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  'ML & Vision': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'CatBoost', 'Optuna', 'SHAP', 'OpenCV', 'ONNX', 'Faster-Whisper', 'Computer Vision', 'NLP'],
  'GenAI & LLMs': ['LangChain', 'LangGraph', 'RAG', 'FAISS', 'ChromaDB', 'Ollama', 'Groq', 'Gemini Live', 'SentenceTransformers', 'LangSmith', 'Guardrails', 'Prompt Engineering', 'Agentic Workflows'],
  'Web & Realtime': ['React', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'Electron', 'WebSockets', 'WebRTC · Pipecat', 'Twilio', 'Chrome Extensions', 'Tailwind CSS'],
  'Infra & Data': ['Supabase', 'PostgreSQL', 'MySQL', 'Upstash Redis', 'AWS RDS', 'Azure', 'GCP', 'Docker', 'Vercel', 'Git', 'CI/CD'],
};

export interface Certification {
  title: string;
  org: string;
  score: string;
  link: string;
}

export const CERTIFICATIONS: Certification[] = [
  { title: 'Supervised Machine Learning', org: 'DeepLearning.AI (Stanford) / Coursera', score: '99.83%', link: 'https://www.coursera.org/account/accomplishments/verify/XAJRZO7BC5FV' },
  { title: 'PyTorch Deep Learning Bootcamp', org: 'Udemy', score: '95.4%', link: 'https://www.udemy.com/certificate/UC-b6ce5ecb-878e-47f8-b575-30da33db7cca/' },
];
