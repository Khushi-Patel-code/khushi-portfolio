export type Section = {
  h: string;
  body?: string[];
  cards?: { title: string; body: string }[];
  list?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  facts: { label: string; value: string }[];
  video?: { src: string; poster: string; label: string };
  sections: Section[];
  tags: string[];
};

const role = "Full Stack Developer Intern (Product, UI/UX & Growth)";

export const caseStudies: CaseStudy[] = [
  {
    slug: "hirezapp",
    title: "Rebuilding the communications hub so nothing is four clicks deep",
    short: "Redesigned candidate communication at an AI recruiting startup. Approved by the CEO, shipped to production.",
    intro:
      "HireZapp is an AI-native recruiting platform. Its candidate communication area worked, but finding things in it did not. I redesigned the Overview and the navigation in Figma, then worked with the senior developer and CTO to get it live.",
    facts: [
      { label: "Role", value: role },
      { label: "Company", value: "HireZapp, an AI-native recruiting platform" },
      { label: "When", value: "May to August 2026" },
      { label: "Worked with", value: "My mentor, the CEO, the CTO and a senior developer" },
    ],
    video: { src: "/videos/hub.mp4", poster: "/videos/hub.jpg", label: "Animated walkthrough of the communications hub redesign" },
    tags: ["Figma", "Information architecture", "Dashboard design", "Shipped"],
    sections: [
      {
        h: "The problem",
        body: [
          "The area had three sub-tabs: Overview, Inbox and Email Configurations. Email Configurations hid more dropdowns inside it, so editing a single email template could take four clicks.",
          "The Overview showed five stat cards of the same size with the same hover. Nothing said what needed attention first.",
        ],
      },
      {
        h: "What I changed",
        cards: [
          {
            title: "An Overview with a hierarchy",
            body: "An email health banner first, then two large action cards for Pending Outbox and Needs Reply, then the candidate pipeline as a donut with ranked stats. Each stage has its own colour and icon: Referred, Shortlisted, Pending, Hired, Rejected.",
          },
          {
            title: "One Communications Hub",
            body: "Inbox and Email Configurations became one tab with a left sidebar, the pattern people already know from tools like Gmail and Notion. Any template is two clicks away instead of four.",
          },
          {
            title: "Connected pages",
            body: "I kept the Overview and the Hub as separate pages, because one is for reading and the other is for doing. Quick access cards on the Overview jump straight into the Hub sections.",
          },
        ],
      },
      {
        h: "How I worked",
        body: [
          "I designed it in Figma and reviewed each round with my mentor. When a version just restyled the old layout, I pushed for a genuinely different structure. I also kept every background white so the colour could carry meaning in the pipeline and actions.",
          "After CEO approval I worked with the CTO and a senior developer to build it into the production codebase.",
        ],
      },
      {
        h: "Outcome",
        list: [
          "Approved by the CEO and shipped to production.",
          "Praised by my mentor and the CEO.",
          "Template access dropped from up to four clicks to two.",
        ],
      },
    ],
  },
  {
    slug: "hirezapp-audit",
    title: "Auditing a startup's website for people, search engines and AI",
    short: "15+ pages against 20+ competitors, 30+ blogs, six AI tools tested, fixes shipped to the live site.",
    intro:
      "A company website has three audiences: the people using it, the search engines indexing it, and the AI tools that now answer questions about it. I audited HireZapp for all three, wrote up every finding, and shipped fixes.",
    facts: [
      { label: "Role", value: role },
      { label: "Scope", value: "15+ pages, 20+ competitors, 30+ blog posts" },
      { label: "When", value: "May to August 2026" },
      { label: "Worked with", value: "My mentor, the CTO and a senior developer" },
    ],
    video: { src: "/videos/audit.mp4", poster: "/videos/audit.jpg", label: "Animated walkthrough of the HireZapp site and AI audit" },
    tags: ["UX audit", "Technical SEO", "AEO and GEO", "Structured data"],
    sections: [
      {
        h: "How I audited",
        body: [
          "I started with four pages: the homepage, careers, the blogs landing page and the glossary. For each one I wrote what works well first, then a table of issues, each with why it hurts the user and how to fix it. Then I widened the audit to 15+ pages and compared them against 20+ competitors.",
        ],
      },
      {
        h: "What turned up",
        cards: [
          { title: "Schema that search engines could not use", body: "Structured data pointing at localhost, FAQ schema with empty answers, and one blog post's metadata applied to every post." },
          { title: "Layout and usability bugs", body: "A broken footer background, clipped floating buttons, a navbar that struggled on smaller screens, inconsistent fonts and buttons, and job listings that did not load on the careers page." },
          { title: "Speed", body: "On mobile the homepage painted its main content in 4.1 seconds. Server response sat around 1.3 seconds on every page, which pointed at the server rather than the pages." },
          { title: "Invisible to AI", body: "I asked ChatGPT, Perplexity, Google AI Overview, Gemini, Claude and DeepSeek. Searching by name returned accurate answers. Generic searches did not mention HireZapp. The biggest gap I found was no verified reviews on G2, Capterra or Trustpilot." },
        ],
      },
      {
        h: "The blog audit",
        body: [
          "Every blog got the same three questions. Trust: is each statistic sourced? Structure: are there real headings, lists and schema? Clarity: do the FAQ answers make sense on their own?",
          "It caught unsourced numbers, raw tags leaking into body text, dead download links, and a template bug that rendered headings as plain paragraphs. That last one was a developer fix, not a content fix, so I flagged it as one.",
        ],
      },
      {
        h: "What shipped",
        list: [
          "FAQ sections with FAQPage JSON-LD on eight pages, written to be quoted by AI search tools.",
          "Fixes on the live website, made with the CTO and a senior developer.",
          "An audit report and docs so the team could keep going without me.",
        ],
      },
    ],
  },
  {
    slug: "design-research",
    title: "How colour, type and layout change what people do on a page",
    short: "A first-year research paper on design and perception across age groups, and how it shaped my work since.",
    intro:
      "In first year I picked an open-ended Technical Communication paper topic purely because it fascinated me: how small design choices change the way people react to a website.",
    facts: [
      { label: "What", value: "Academic paper, Technical Communication course" },
      { label: "Question", value: "How font, colour and layout affect bounce rate and engagement" },
      { label: "Lens", value: "How the effect changes across age groups" },
      { label: "Method", value: "Reading and writing. I did not run a survey or user test of my own." },
    ],
    tags: ["UX research", "Typography", "Colour", "Accessibility"],
    sections: [
      {
        h: "The question",
        body: [
          "Does changing a font family, or a single colour, change whether someone stays on a page? And does the same change land differently for a teenager than for someone older?",
          "I wanted to understand why a layout can feel trustworthy or confusing before anyone reads a word of it.",
        ],
      },
      {
        h: "Where it shows up now",
        cards: [
          { title: "TMSA", body: "As CMO I own the visual identity, so I watch how people react to posts through Instagram analytics and adjust layout and colour from what I see." },
          { title: "HireZapp", body: "The audit and the communications hub redesign were the same question in a real product: where do people get confused, and what would a different layout do?" },
          { title: "This portfolio", body: "The two views are a deliberate experiment. The Software view and the UX view use different type, colour and motion for different audiences." },
        ],
      },
      {
        h: "What I would test next",
        list: [
          "Two versions of one page with different type and colour, shown to different age groups.",
          "Bounce rate and time on page for each, compared properly.",
          "The same test with accessibility in mind: contrast, text size and motion.",
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
