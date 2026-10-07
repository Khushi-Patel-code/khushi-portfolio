export type Project = {
  id: string;
  title: string;
  line: string;
  stack: string;
  github: string;
  demo?: string;
  image?: string;
  alt?: string;
};

export const projects: Record<string, Project> = {
  farsight: {
    id: "farsight",
    title: "Farsight",
    line: "A multi-agent system that predicts where crowds will build up in railway stations and tells operators what to do about it. Top 100 of 11,000+ applicants at FAR AWAY 2026, and invited to the in-person round in Delhi.",
    stack: "React, TypeScript, Tailwind CSS, multi-agent systems",
    github: "https://github.com/Khushi-Patel-code/Farsight",
    demo: "https://farsight-fawn.vercel.app",
    image: "/projects/farsight-dashboard.jpg",
    alt: "Farsight operator dashboard with a live simulation map, risk alerts and recommendations",
  },
  neuro: {
    id: "neuro",
    title: "Neuro-Pilot",
    line: "AI support for neurodivergent students. It swaps rigid timers for gentle momentum and breaks tasks into small, sensory-friendly steps. Built for the TechNation AI hackathon.",
    stack: "Python, OpenAI, accessibility-first UX",
    github: "https://github.com/Khushi-Patel-code/Neuro-Pilot",
  },
  ecom: {
    id: "ecom",
    title: "E-Commerce Inventory & Order System",
    line: "A full-stack system for inventory and orders, with role-based logins, order tracking, and sales analytics for admins.",
    stack: "Node.js, Express, MySQL, JWT, Chart.js",
    github: "https://github.com/Khushi-Patel-code/E-Commerce-Inventory-Order-Management-System-Website",
    image: "/projects/ecom-dashboard.jpg",
    alt: "E-commerce admin dashboard showing revenue, products, customers and sales charts",
  },
  coach: {
    id: "coach",
    title: "Multi-Agent AI Learning Coach",
    line: "A group of AI agents that put together personalized study plans and research summaries. My Kaggle capstone, focused on session memory and how agents use tools.",
    stack: "Python, OpenAI, LangChain",
    github: "https://github.com/Khushi-Patel-code/AI-learning-coach-kaggle-capstone",
  },
};

export const uxOrder = ["farsight", "neuro", "ecom", "coach"];
export const softwareOrder = ["farsight", "ecom", "coach", "neuro"];

// more work that lives on GitHub, shown as a short list
export const moreWork = [
  {
    title: "Battery SOH Predictor",
    line: "Predicts battery state of health with linear regression, plus a chatbot that explains the sensor data.",
    stack: "React, Flask, scikit-learn",
    github: "https://github.com/Khushi-Patel-code/BatterySOH-AI",
  },
  {
    title: "TSWF Automation Framework",
    line: "A Bash task scheduler with process control, error handling and cron integration.",
    stack: "Bash, Linux",
    github: "https://github.com/Khushi-Patel-code/TASK-SCHEDULER",
  },
  {
    title: "ChronoSlate Web Calendar",
    line: "An interactive calendar with saved events and a high-contrast interface.",
    stack: "JavaScript, HTML, CSS",
    github: "https://github.com/Khushi-Patel-code/Chronoslate_Web_calendar",
  },
];

export const githubUrl = "https://github.com/Khushi-Patel-code";

export const roles = [
  {
    dates: "May to Aug 2026",
    role: "Full Stack Developer Intern, Product, UI/UX & Growth",
    org: "HireZapp",
    caseStudy: true,
    bullets: [
      "Audited 15+ webpages against 20+ competitors, documenting each issue, why it hurt the user, and the fix.",
      "Redesigned the candidate communications hub in Figma, restructuring tabs and navigation. It shipped to production after CEO approval.",
      "Made layout and frontend changes in the codebase alongside the senior developer and CTO, and audited 30+ blog posts for search and AI visibility.",
    ],
  },
  {
    dates: "Jan 2026 to now",
    role: "Chief Marketing Officer",
    org: "Tech Management Student Association, Ontario Tech",
    bullets: [
      "Helped build the event platform in React and Firebase, with real-time registration, team formation, and an admin dashboard.",
      "Ran social media and event promotion, designing visuals and reels and using analytics to adjust content. Instagram engagement grew 70% in 2 months and the flagship mixer drew 100+ attendees.",
    ],
  },
  {
    dates: "Jul to Aug 2025",
    role: "Web Development Intern",
    org: "CodePhoenix Web Solutions, India",
    bullets: [
      "Built 5+ responsive pages with HTML, CSS, JavaScript and Express.js, improving mobile load performance by 25%.",
      "Connected REST APIs across 5+ user workflows, cutting form submission errors by 40%.",
      "Led UI/UX design in Figma: wireframes, component structure, and visual consistency across feature updates.",
    ],
  },
  {
    dates: "2023 to now",
    role: "Peer Educator, Peer Mentor, Level One Ambassador",
    org: "Ontario Tech University",
    bullets: [
      "Mentored 5+ incoming engineering students through academic onboarding, and spoke with 50+ prospective students and families at recruitment events.",
    ],
  },
];

export const skills = [
  { label: "Languages", items: "JavaScript, TypeScript, Python, Java, C++" },
  { label: "Web", items: "React, Next.js, HTML, CSS, Tailwind, Node.js, Express, Firebase, REST APIs, JWT" },
  { label: "Design", items: "Figma, wireframing, prototyping, UX audits, responsive design, Canva" },
  { label: "Data", items: "MySQL, Pandas, NumPy" },
  { label: "Working", items: "Git, GitHub, Linux, Bash, Jira, Agile/Scrum, requirements gathering" },
];

export const links = [
  { label: "Email", href: "mailto:khuship2708@gmail.com", value: "khuship2708@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khushipatel-dev", value: "linkedin.com/in/khushipatel-dev" },
  { label: "GitHub", href: githubUrl, value: "github.com/Khushi-Patel-code" },
];
