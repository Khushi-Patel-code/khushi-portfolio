export type Project = {
  id: string;
  title: string;
  line: string;
  stack: string;
  github: string;
  demo?: string;
  image?: string;
  clips?: { label: string; src: string; poster: string }[];
  alt?: string;
};

export const projects: Record<string, Project> = {
  soh: {
    id: "soh",
    title: "Battery SOH Prediction",
    line: "A team project that predicts a battery's state of health from 21 voltage readings, with a chatbot that explains the result in plain language. I built the Linear Regression model, the data preprocessing and the evaluation.",
    stack: "Python, scikit-learn, pandas, Flask, React",
    github: "https://github.com/Khushi-Patel-code/BatterySOH-AI",
    image: "/projects/soh-dashboard.jpg",
    alt: "Battery health dashboard with a voltage input grid, predicted SOH, model metrics and a chatbot panel",
    clips: [{ label: "Explainer", src: "/videos/ex-soh.mp4", poster: "/videos/ex-soh.jpg" }],
  },
  ecom: {
    id: "ecom",
    title: "E-Commerce Inventory & Order System",
    line: "An inventory and order system with two roles. Customers browse, filter and order. Admins manage stock, update orders, export CSV and PDF, and see sales charts.",
    stack: "Node.js, Express, MySQL, JWT, Chart.js",
    github: "https://github.com/Khushi-Patel-code/E-Commerce-Inventory-Order-Management-System-Website",
    image: "/projects/ecom-dashboard.jpg",
    alt: "E-commerce admin dashboard showing revenue, products, customers and sales charts",
    clips: [{ label: "Explainer", src: "/videos/ex-ecom.mp4", poster: "/videos/ex-ecom.jpg" }],
  },
  coach: {
    id: "coach",
    title: "StudyPilot",
    line: "A study planner I built for a Kaggle capstone. You give it a goal and an orchestrator passes the work to planner, research, summarizer, coach and timetable agents, keeping memory and session history as it goes.",
    stack: "Python, multi-agent orchestration, memory and session services",
    github: "https://github.com/Khushi-Patel-code/AI-learning-coach-kaggle-capstone",
    clips: [{ label: "Explainer", src: "/videos/ex-coach.mp4", poster: "/videos/ex-coach.jpg" }],
  },
  farsight: {
    id: "farsight",
    title: "Farsight",
    line: "A railway crowd-management platform my team built for FAR AWAY 2026. Passenger, security, train and medical agents run inside a Mumbai CST simulation, and what the AI recommends changes what happens next.",
    stack: "React, TypeScript, Tailwind CSS, multi-agent systems",
    github: "https://github.com/Khushi-Patel-code/Farsight",
    demo: "https://farsight-fawn.vercel.app",
    image: "/projects/farsight-dashboard.jpg",
    alt: "Farsight operator dashboard with a live simulation map, risk alerts and recommendations",
    clips: [
      { label: "Explainer", src: "/videos/ex-farsight.mp4", poster: "/videos/ex-farsight.jpg" },
      { label: "Live demo", src: "/videos/farsight.mp4", poster: "/videos/farsight.jpg" },
    ],
  },
};

export const uxOrder = ["farsight", "ecom", "coach", "soh"];
export const softwareOrder = ["farsight", "ecom", "coach", "soh"];

// more work that lives on GitHub, shown as a short list
export const moreWork = [
  {
    title: "TSWF Automation Framework",
    line: "A Bash task scheduler with process control, error handling and cron integration. I built the notifications and error handling.",
    stack: "Bash, Linux",
    github: "https://github.com/Khushi-Patel-code/TASK-SCHEDULER",
  },
  {
    title: "Neuro-Pilot",
    line: "An AI task coach for neurodivergent students that breaks big tasks into one gentle step at a time. Built at the Technation AI hackathon.",
    stack: "Python, Streamlit, Gemma 3 27B",
    github: "https://github.com/Khushi-Patel-code/Neuro-Pilot",
  },
  {
    title: "Maze Solver",
    line: "A Java program that finds the shortest path through a maze with breadth-first search. You enter the size and layout, 0 for open and 1 for wall, and it prints the route.",
    stack: "Java, BFS, queues and graphs",
    github: "https://github.com/Khushi-Patel-code/Maze_Solver",
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
    role: "Peer Educator",
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

// paste the live resume link (or a /resume.pdf in public/) here. While it is empty the resume sections stay hidden.
export const resumeUrl = "/Khushi-Patel-Resume.pdf";
