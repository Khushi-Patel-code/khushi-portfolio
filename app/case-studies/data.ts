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
    title: "Redesigning the candidate communication tab at HireZapp",
    short: "Three tabs and a maze of dropdowns became two tabs and a sidebar. The CEO approved it and it shipped.",
    intro:
      "HireZapp is an AI recruiting platform. Its candidate communication area had everything a recruiter needed, but it was hard to find. I redesigned the Overview and the navigation in Figma, then helped get it into production.",
    facts: [
      { label: "Role", value: role },
      { label: "Company", value: "HireZapp, an AI-native recruiting platform" },
      { label: "When", value: "May to August 2026" },
      { label: "Worked with", value: "My mentor, the CEO, the CTO and a senior developer" },
    ],
    video: { src: "/videos/hub.mp4", poster: "/videos/hub.jpg", label: "Short animated walkthrough of the redesign" },
    tags: ["Figma", "Navigation", "Dashboard design", "Shipped"],
    sections: [
      {
        h: "The problem",
        body: [
          "The area had three tabs: Overview, Inbox and Email Configurations. Email Configurations had more dropdowns inside it, so editing one email template took up to four clicks.",
          "The Overview was five stat cards of the same size with the same hover. Nothing told you what needed attention first.",
        ],
      },
      {
        h: "What I changed",
        cards: [
          {
            title: "An Overview with an order to it",
            body: "An email health banner first, then two big cards for Pending Outbox and Needs Reply, then the candidate pipeline as a donut chart. Each stage has its own colour and icon: Referred, Shortlisted, Pending, Hired, Rejected.",
          },
          {
            title: "One Communications Hub",
            body: "Inbox and Email Configurations became a single tab with a left sidebar, the same pattern as Gmail or Notion. Any template is two clicks away.",
          },
          {
            title: "Shortcuts back into the Hub",
            body: "I kept Overview and the Hub as separate pages, because one is for reading and the other is for doing. Quick access cards on the Overview jump straight into the Hub.",
          },
        ],
      },
      {
        h: "How I worked",
        body: [
          "I designed in Figma and reviewed every round with my mentor. Whenever a version only restyled the old layout, I pushed for a different structure. I kept the backgrounds white so colour could do the work in the pipeline and the action cards.",
          "After the CEO approved it, I worked with the CTO and a senior developer to build it into the production codebase.",
        ],
      },
      {
        h: "Outcome",
        list: [
          "Approved by the CEO and shipped to production.",
          "Praised by my mentor and the CEO.",
          "Reaching a template went from up to four clicks to two.",
        ],
      },
    ],
  },
  {
    slug: "hirezapp-audit",
    title: "Auditing the HireZapp website",
    short: "I went through the pages, the blogs, the speed and what AI tools say about the company, then fixed what I could.",
    intro:
      "A website is read by people, by search engines and now by AI tools. I checked HireZapp's site for all three, wrote up what I found, and shipped fixes with the team.",
    facts: [
      { label: "Role", value: role },
      { label: "Scope", value: "15+ pages, 20+ competitors, 30+ blog posts" },
      { label: "When", value: "May to August 2026" },
      { label: "Worked with", value: "My mentor, the CTO and a senior developer" },
    ],
    video: { src: "/videos/audit.mp4", poster: "/videos/audit.jpg", label: "Short animated walkthrough of the audit" },
    tags: ["UX audit", "Technical SEO", "AEO and GEO", "Structured data"],
    sections: [
      {
        h: "The problem",
        body: [
          "HireZapp was publishing a lot of content, but I did not know if search engines could read it, if people could use the pages, or if AI tools knew the company existed.",
        ],
      },
      {
        h: "What I did",
        cards: [
          { title: "Page audit", body: "Started with the homepage, careers, blogs and glossary, then widened to 15+ pages and compared them against 20+ competitors. Each issue got a note on why it hurt the user and how to fix it." },
          { title: "What turned up", body: "Structured data pointing at localhost, FAQ schema with empty answers, one blog's metadata on every post, a broken footer, clipped buttons, and job listings that did not load." },
          { title: "Speed", body: "On mobile the homepage took 4.1 seconds to show its main content. Server response was about 1.3 seconds on every page, which pointed at the server, not the pages." },
          { title: "AI tools", body: "I asked ChatGPT, Perplexity, Google AI Overview, Gemini, Claude and DeepSeek about HireZapp. They described it well when asked by name and did not mention it in general searches. The biggest gap I found was no verified reviews on G2, Capterra or Trustpilot." },
        ],
      },
      {
        h: "How I worked",
        body: [
          "For the 30+ blog posts I asked the same three questions each time. Is every statistic sourced? Are there real headings, lists and schema? Does each FAQ answer make sense on its own?",
          "That caught unsourced numbers, raw tags in body text, dead download links and a template bug that turned headings into plain paragraphs. The last one needed a developer, so I flagged it as a code fix and not a content fix.",
        ],
      },
      {
        h: "Outcome",
        list: [
          "FAQ sections with FAQPage JSON-LD on eight pages, written so AI tools can quote them.",
          "Fixes on the live website, made with the CTO and a senior developer.",
          "An audit report and docs so the team could keep going without me.",
        ],
      },
    ],
  },
  {
    slug: "design-research",
    title: "My first-year paper on colour, type and layout",
    short: "Why small design choices change whether people stay on a page, and how that changes with age.",
    intro:
      "In first year I could pick any topic for a Technical Communication paper. I picked this one because I could not stop wondering about it.",
    facts: [
      { label: "What", value: "An academic paper for a Technical Communication course" },
      { label: "Question", value: "How font, colour and layout affect bounce rate and engagement" },
      { label: "Angle", value: "How the effect differs across age groups" },
      { label: "Method", value: "Reading and writing. I did not run a survey or a user test." },
    ],
    tags: ["UX research", "Typography", "Colour", "Accessibility"],
    sections: [
      {
        h: "The problem",
        body: [
          "Two pages can say the same thing and feel completely different. I wanted to know why a small change in font or colour can make someone trust a page or close it, and whether a teenager and a grandparent react the same way.",
        ],
      },
      {
        h: "What I did",
        body: [
          "I read about how type, colour and layout shape attention and trust, and wrote it up with age groups as the main lens. It was a paper, not a study with participants, and I am clear about that.",
        ],
      },
      {
        h: "How I worked",
        cards: [
          { title: "At TMSA", body: "As CMO I own the visual identity. I watch Instagram analytics to see how people react to a post, then change the layout or colour and look again." },
          { title: "At HireZapp", body: "The audit and the redesign asked the same question in a real product: where do people get confused, and what would a different layout do?" },
          { title: "On this site", body: "The Software view and the UX view use different type, colour and motion on purpose, for two different kinds of visitor." },
        ],
      },
      {
        h: "Outcome",
        body: [
          "The paper is where my interest in UX started, and it still shapes how I look at every page.",
        ],
        list: [
          "Next I want to test two versions of a page with different type and colour on different age groups, and compare bounce rate properly.",
          "I would add accessibility checks to that test: contrast, text size and motion.",
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
