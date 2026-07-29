export const profile = {
  name: "Forhad Siddique Rajon",
  initials: "FSR",
  roles: [
    "Machine Learning Researcher",
    "Full-Stack Developer",
    "CSE Undergraduate",
  ],
  location: "Dhaka, Bangladesh",
  university: "University of Asia Pacific",
  tagline:
    "Building innovative software solutions with a passion for web development, machine learning, and emerging technologies.",
  bio: `I am a Computer Science and Engineering student at the University of Asia Pacific with a passion for software development, web technologies, and AI. I enjoy building practical applications, solving real-world problems, and continuously learning new technologies. Currently, I am expanding my skills in software engineering while preparing for a career in the technology industry.
`,
  email: "forhadsiddique.official@gmail.com", 
  resumeUrl: "/resume.pdf",
  avatar: "/avatar.jpg", 
};

export const socials = [
  { label: "GitHub", href: "https://github.com/FireBallzZz" }, 
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rajon-75f/" }, 
  { label: "Email", href: "mailto:forhadsiddique.official@gmail.com" }, 
];

export const stats = [
  { value: 4, suffix: "", label: "Fused CV modalities" },
  { value: 1, suffix: "", label: "Novel metric — AGG" },
  { value: 3, suffix: "+", label: "Full-stack products shipped" },
  { value: 2026, suffix: "", label: "Expected graduation" },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "attention-framework",
    index: "01",
    title: "Smart Classroom Attention Framework",
    tagline: "Four-modality CV pipeline + LLM reasoning, in real time",
    description:
      "A hybrid ML/LLM system for smart classrooms. Facial expression (ResNet50 + CBAM), head pose (6DRepNet), gaze (L2CS-Net) and posture (YOLOv8-Pose) are fused through a late-fusion attention scorer with state-aware drop detection. An LLM reasoning layer turns the fused signal into pedagogical recommendations. Introduces the Attention Generalization Gap (AGG), a novel metric for cross-context attention drift.",
    tags: ["PyTorch", "YOLOv8", "OpenCV", "React", "LLM API"],
    category: "Research · Computer Vision",
    year: "2025 — 2026",
    links: [
      { label: "Case study", href: "#" }, 
      { label: "Repository", href: "#" }, // Will be updated
    ],
    featured: true,
  },
  {
    id: "voice-bridge",
    index: "02",
    title: "Voice Bridge",
    tagline: "Real-time voice-driven communication bridge",
    description:
      "A full-stack communication tool built end to end: a React front end, a Node.js API layer and a PostgreSQL data store working together to route live voice sessions with minimal latency.", // EDIT ME — tighten this to exactly what Voice Bridge does
    tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    category: "Full-Stack · Real-Time",
    year: "2026",
    links: [
      { label: "Live demo", href: "#" }, 
      { label: "Repository", href: "https://github.com/FireBallzZz/Voice-bridge" }, 
    ],
  },
  {
    id: "cognitivedge",
    index: "03",
    title: "CognitivEdge",
    tagline: "Explainable ML for predicting exam performance",
    description:
      "A Streamlit app predicting student exam scores from study habits and lifestyle data. Ships with SHAP-based explainability — global importance, local waterfalls, dependence plots — plus a study-hour planner built on a fixed-budget optimizer.",
    tags: ["Python", "scikit-learn", "SHAP", "Streamlit"],
    category: "Machine Learning",
    year: "2026",
    links: [
      { label: "Live app", href: "#" }, // EDIT 
      { label: "Repository", href: "https://github.com/FireBallzZz/student-score-predictor-with-ML-and-DL-" }, 
    ],
  },
  {
  id: "taskflow",
  index: "05",
  title: "TaskFlow",
  tagline: "Smart task & productivity management platform",
  description:
    "A responsive productivity web app featuring task management, calendar planning, reminders, Pomodoro timer, notes, and daily routine tracking to boost personal productivity.",
  tags: ["React", "Node.js", "MongoDB", "Express"],
  category: "Full-Stack · Productivity",
  year: "2026",
  links: [
    { label: "Live demo", href: "focusdesk-dusky.vercel.app" }, // EDIT
    { label: "Repository", href: "https://github.com/FireBallzZz/focusdesk.git" }, // EDIT
  ],
},
{
  id: "expensetap",
  index: "06",
  title: "ExpenseTap",
  tagline: "Personal finance & expense tracking dashboard",
  description:
    "A modern personal finance management platform for tracking income, expenses, savings, and spending analytics with an intuitive dashboard and responsive interface.",
  tags: ["React", "Firebase", "Chart.js", "Tailwind CSS"],
  category: "Finance · Dashboard",
  year: "2026",
  links: [
    { label: "Live demo", href: " https://drive.google.com/file/d/1gckdWOZxM6vnVWkBfOj4iW2ar1wcupkO/view?usp=drive_link" },
    { label: "Repository", href: "https://github.com/FireBallzZz/expense-tap.git" }, 
  ],
},
{
  id: "medicareminder",
  index: "07",
  title: "MediCare Reminder",
  tagline: "Smart medicine reminder & prescription manager",
  description:
    "A medicine management platform with prescription scanning, medication scheduling, dosage reminders, treatment history, and progress tracking for better healthcare management.",
  tags: ["React", "Firebase", "OCR", "PWA"],
  category: "Health · Web App",
  year: "2026",
  links: [
    { label: "Live demo", href: "#" }, 
    { label: "Repository", href: "" }, // EDIT
  ],
},
{
  id: "financemanager",
  index: "08",
  title: "Finance Manager",
  tagline: "Complete personal finance & budget management platform",
  description:
    "A full-featured personal finance web application that helps users manage income, expenses, budgets, savings goals, recurring transactions, and financial insights through interactive analytics and a clean dashboard.",
  tags: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
  category: "Full-Stack · Finance",
  year: "2026",
  links: [
    { label: "Live demo", href: "financeflow-sepia-five.vercel.app" }, 
    { label: "Repository", href: "https://github.com/FireBallzZz/financeflow.git" }, 
  ],
},

];

export type SkillGroup = {
  label: string;
  tag: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    tag: "client",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    tag: "server",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  },
  {
    label: "Machine Learning",
    tag: "research",
    skills: ["Python", "PyTorch", "scikit-learn", "OpenCV", "LLM Integration"],
  },
  {
    label: "Tooling",
    tag: "workflow",
    skills: ["Git & GitHub", "Docker", "Figma", "LaTeX"],
  },
];

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "foundations",
    period: "Year 1",
    title: "Foundations",
    description:
      "Started the B.Sc. in Computer Science & Engineering at the University of Asia Pacific. Core CS: data structures, algorithms, systems.",
  },
  {
    id: "fullstack",
    period: "Year 2 — 3",
    title: "Full-stack & applied ML",
    description:
      "Moved from coursework into shipped software — full-stack apps end to end, and a first wave of applied machine-learning projects.",
  },
  {
    id: "research-begins",
    period: "2025",
    title: "Thesis research begins",
    description:
      "Began CSE 400 research under Dr. Nazmun Nahid: multimodal attention analysis for smart classrooms. Early prototyping on classroom video.",
  },
  {
    id: "pre-defense",
    period: "H1 2026",
    title: "Pre-defense sprint",
    description:
      "Built the four-modality CV pipeline, the React teacher dashboard, and the full LaTeX thesis package. Passed pre-defense review.",
  },
  {
    id: "final-defense",
    period: "Late 2026",
    title: "Final defense & graduation",
    description:
      "LLM integration, the teacher-intervention experiment and full quantitative evaluation, ahead of final defense.",
  },
];

export const pipelineStages = {
  hero: "input",
  about: "embedding",
  skills: "features",
  projects: "inference",
  timeline: "training_log",
  contact: "output",
};
