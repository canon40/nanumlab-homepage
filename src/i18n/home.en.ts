/** Homepage 10-section content — EN */
export const homeEn = {
  nav: {
    home: "Home",
    about: "About",
    solutions: "Solutions",
    technology: "Technology",
    cases: "Use Cases",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Small but mighty — sharing for a better world",
    headline: "We design the simplest and most powerful AI services for public institutions and local communities.",
    subcopy:
      "Nanumlab is a startup specializing in generative AI, machine learning, datalake, and application development. We apply the same capabilities to Public DX — MyData integration, intelligent OCR and call centers, and local AI platforms anyone can use.",
    ctaSolutions: "View Core Solutions",
    ctaContact: "Government Inquiry",
    chips: ["LLM", "OCR", "STT", "MyData", "Vector DB", "AI Agent"],
    stats: [
      { value: "0.5s", label: "MyData eligibility check" },
      { value: "30+", label: "Public API integrations" },
      { value: "6", label: "Integrated AI engines" },
      { value: "On-Prem", label: "Air-gapped deployment" },
    ],
    terminal: {
      filename: "nanumlab-ai-core.ts",
      comment: "// Nanumlab public AI engine — live",
      status: "● AI Pipeline Active",
    },
    goBoard: {
      eyebrow: "AI Decision · Variation Analysis",
      caption: "AI reads every branch like Go — evaluating all paths to find the best public service outcome.",
      ariaLabel: "Go board variation analysis animation",
    },
    globe: {
      eyebrow: "Global AI Network",
      caption: "Public-sector AI connects, learns, and responds in real time — like data flowing across the globe.",
      ariaLabel: "Rotating AI globe wireframe animation",
    },
    dashboard: {
      title: "nanumlab-ai-dashboard",
      status: "● All systems operational",
      pipeline: "Real-time AI pipeline",
      caption: "OCR, STT, LLM, and MyData run together on one live dashboard.",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    title: "Bringing all our thoughts, we create the best solution",
    headline:
      "We solve diverse business problems with advanced technology and optimize existing workflows with tailored solutions.",
    pillars: [
      {
        id: "ai-ml",
        title: "AI & Machine Learning Analytics",
        description: "From data collection to analysis and prediction — enabling more accurate, efficient decisions.",
      },
      {
        id: "datalake",
        title: "Big Data & Datalake",
        description: "Unified platform covering structured, unstructured, and semi-structured data across the full lifecycle.",
      },
      {
        id: "mobile",
        title: "Mobile Applications",
        description: "Custom mobile and web solutions with professional rollout and maintenance support.",
      },
    ],
  },
  corporateServices: {
    eyebrow: "Services",
    title: "Technology services we provide",
    description: "End-to-end support from AI and IoT to datalake and application development.",
    items: [
      { id: "ai-ml", title: "AI & Machine Learning", description: "Full-cycle data collection, analysis, and prediction" },
      { id: "iot", title: "IoT Systems", description: "Sensor, cloud, and analytics-based IoT build and operations" },
      { id: "datalake", title: "Datalake Platform", description: "Large-scale data storage, processing, and management" },
      { id: "app-dev", title: "App Development", description: "iOS, Android, and web application development and maintenance" },
    ],
  },
  ourServices: {
    eyebrow: "Our Services",
    title: "Create the best solution in the best way",
    description:
      "We provide technical consulting, problem-solving advisory, and training. We pursue innovation and customer satisfaction through partnerships.",
    cta: "View All Solutions",
  },
  process: {
    eyebrow: "How It Works",
    title: "Our Process",
    description: "A standard project flow from requirements through verification — with you at every step.",
    steps: [
      {
        id: "analyze",
        step: "01",
        title: "Requirements & Planning",
        body: "We analyze requirements in depth, identify issues, and plan the optimal technology and service approach.",
      },
      {
        id: "develop",
        step: "02",
        title: "Design & Development",
        body: "We collaborate on UI/UX design and system development with your team.",
      },
      {
        id: "verify",
        step: "03",
        title: "Test & Verification",
        body: "We test and verify that the delivered system meets all requirements.",
      },
    ],
  },
  companyStats: [
    { value: "10+", label: "Projects" },
    { value: "10+", label: "Satisfied Clients" },
    { value: "3", label: "Win Awards" },
    { value: "5+", label: "Team Members" },
  ],
  quickContact: {
    eyebrow: "Need Help",
    title: "How can we help?",
    description: "We are here to resolve your questions and concerns.",
    onlineTitle: "Online Inquiry",
    onlineDescription: "Send us your questions through the online contact form.",
    subjects: ["Solution Inquiry", "Quote Inquiry"],
  },
  aiCapabilities: {
    eyebrow: "AI Technology",
    title: "AX Framework · LLM · Vector Search · AI Agent",
    description: "LLM, OCR, STT, and Vector Search as one integrated AI technology stack.",
    items: [
      { tag: "RAG", title: "LLM Chatbot", description: "Public service guidance, tourism, internal Q&A" },
      { tag: "Vision", title: "OCR Engine", description: "Receipts, proofs, and admin document AI verification" },
      { tag: "Speech", title: "STT Pipeline", description: "Call center speech-to-text with AI summary" },
      { tag: "ML", title: "AI Recommendation", description: "Local commerce and tourism matching" },
      { tag: "Embedding", title: "Vector Search", description: "Document-based natural language RAG search" },
      { tag: "Agent", title: "AI Agent", description: "Tool Calling workflow automation for administration" },
    ],
  },
  whatWeDo: {
    eyebrow: "What we do",
    subtitle: "We build AI services that work in the field and in daily life.",
    cards: [
      { title: "Public DX Platform", description: "Citizen portals and integrated admin systems aligned with public security and standards." },
      { title: "Everyday AI Service", description: "Natural language search, STT, and LLM services anyone can use without complex commands." },
      { title: "Smart Automation", description: "Radical automation of repetitive verification and settlement work." },
    ],
  },
  edge: {
    title: "Why public institutions choose Nanumlab's AI platform",
    quote: "Nanumlab's view — public service is not about showing off technology; it's what works in the field.",
    items: [
      {
        id: "security",
        badge: "Security",
        title: "On-premise / air-gapped AI for government",
        body: "Reflects strict government security: lightweight FastAPI + Docker AI runs inside the institution without external cloud leakage, meeting security review requirements.",
      },
      {
        id: "mydata",
        badge: "Practical",
        title: "Paperless administration via MyData optimization",
        body: "No resident registration copies for legal discounts. Real-time mapping of Ministry API fields to DB schema completes eligibility and payment in 0.5 seconds.",
      },
      {
        id: "inclusion",
        badge: "Inclusion",
        title: "UI/UX philosophy for digitally vulnerable users",
        body: "Seniors and vulnerable users first: high-contrast intuitive UI plus voice AI so anyone can book facilities or find local commerce without exclusion.",
      },
    ],
  },
  solutions: {
    subtitle: "Core solutions validated by public purpose and practical impact.",
    items: [
      { id: "smart-ticket", title: "MyData Smart Ticket Platform", flow: "Mobile booking → real-time eligibility → auto discount → QR ticketing → settlement dashboard" },
      { id: "ocr", title: "OCR Document Automation", flow: "AI OCR extracts merchant, amount, date from bulk receipts — zeroing repetitive verification" },
      { id: "callcenter", title: "AI Call Center Support", flow: "Real-time STT → classification, summary, sentiment visualization → staff efficiency" },
      { id: "local", title: "Local Commerce AI", flow: "Natural language queries → local DB matching → resident–merchant win-win model" },
    ],
  },
  futureTech: {
    subtitle: "Future technology for proactive policy and cultural tourism.",
    items: [
      { id: "geo", title: "Public Data & Satellite AI", body: "Sentinel, Landsat and spatial data for land change detection and policy decision support." },
      { id: "xr", title: "XR·3D Spatial Assets", body: "Matterport scans turn facilities and museums into digital twin content for anytime guidance." },
    ],
  },
  technology: {
    subtitle: "Enterprise-grade architecture behind easy citizen-facing screens.",
    tabs: [
      { id: "frontend", label: "Frontend", body: "React, Vite, Tailwind, shadcn/ui for ultra-fast responsive UI and admin dashboards.", tags: ["React", "Vite", "Tailwind", "shadcn/ui"] },
      { id: "backend", label: "Backend & Security", body: "FastAPI, Node.js, API Gateway with RBAC and audit logs per public security guidelines.", tags: ["FastAPI", "RBAC", "Audit logs"] },
      { id: "database", label: "Database", body: "PostgreSQL, MySQL, Supabase, Neon for reliable MyData traffic handling.", tags: ["PostgreSQL", "MySQL", "Supabase"] },
      { id: "ai", label: "AI & Data", body: "LLM, Vector DB, STT/OCR pipelines, Tool Calling workflow engines.", tags: ["LLM", "Vector DB", "STT", "OCR"] },
    ],
  },
  architecture: {
    title: "Integrated Public Platform Architecture",
    flow: ["Citizen mobile/web", "Lightweight frontend", "Security API Gateway", "FastAPI backend", "Internal DB & AI (air-gapped)", "Government APIs / MyData"],
    footer: "Public services need operations, access control, audit logs, settlement, and air-gapped security — not just screens. Nanumlab architects for procurement standards from day one.",
  },
  useCases: {
    subtitle: "Real applications that cut waste and raise resident satisfaction.",
    items: [
      { title: "Culture & tourism facilities", body: "Smart booking, MyData discounts, QR gate — lower operating costs." },
      { title: "Grant settlement teams", body: "OCR verification cuts manual settlement time by ~80%." },
      { title: "Civil complaint offices", body: "AI summaries and speaker ID raise speed and trust." },
    ],
  },
  roadmap: {
    title: "Future Roadmap for Public DX",
    phases: [
      { phase: "Phase 1", label: "Rapid adoption", body: "Smart ticketing, OCR verification, standard admin systems." },
      { phase: "Phase 2", label: "Intelligence", body: "Citizen chatbots, local natural-language recommendations." },
      { phase: "Phase 3", label: "Advanced administration", body: "Call center STT pipelines and satellite-based analysis." },
    ],
  },
  contact: {
    title: "Contact Us",
    subtitle: "Nanumlab understands your administrative environment and residents' needs — your reliable Public DX partner.",
    fields: { name: "Name", org: "Organization", dept: "Department", email: "Email", phone: "Phone", topic: "Topic", message: "Message" },
    topics: ["Solution Inquiry", "Quote Inquiry", "Public DX", "Smart ticketing", "OCR automation", "AI call center", "Local AI", "Public data analysis", "Other"],
    cta: "Submit inquiry",
  },
  scenarios: {
    tabOfficial: "Official workflow",
    tabResident: "Resident scenario",
    before: "Before",
    after: "After",
    residentStory: "Resident story",
  },
  infographic: {
    mobileLabel: "Resident Mobile",
    adminLabel: "Admin Dashboard",
    flowVerify: "Auto eligibility",
    citizenApp: "Citizen App",
    benefitCheck: "Eligibility check",
    qrTicket: "QR ticket",
    adminDash: "Admin dashboard",
    oneClick: "One-click approval",
    auditLog: "Audit log",
  },
  footer: {
    desc: "Nanumlab presents a new direction for digital transformation (DX) through convergence, connection, and sharing.",
    copyright: "© NANUMLAB Inc. · Chuncheon, Gangwon-do",
    quickLinks: "Quick Links",
    support: "Support",
    quickContact: "Quick Contact",
    links: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },
    address: "401-19, Chuncheon 1-Person Startup Support Center, 305 Gongji-ro, Chuncheon, Gangwon-do 24372",
    email: "june@nanumlab.com",
    phone: "+82 32-912-1004",
  },
} as const;
