/**
 * data.js — SINGLE SOURCE OF CONTENT for the whole portfolio.
 *
 * Edit these plain objects/arrays to update the site (no component changes
 * needed). Components import from here:
 *   PROFILE   → name, role, tagline, email, socials (Hero, Navbar, Contact, Footer)
 *   MANIFESTO → the numbered About chapters
 *   SKILLS    → the Skills marquee items (and its accessible list)
 *   PROJECTS  → the Projects cards
 *
 * Link fields ("#" means "no link yet"):
 *   PROFILE.socials[].href → set a real URL to make that social appear/work
 *   PROJECTS[].liveUrl     → live site URL
 *   PROJECTS[].githubUrl   → source repo URL
 * PROJECTS[].image points to files under /public (e.g. /images/projects/x.jpg);
 * if a file is missing the card shows a numbered gradient placeholder.
 */
// Placeholder content — edit these later.
export const PROFILE = {
  name: "OLUWASEYI OGUNFOWOKAN",
  role: "Software Developer & Creative Technologist",
  tagline: "I build modern, accessible, and immersive digital experiences at the intersection of software, motion, and design.",
  location: "Regina, SK",
  email: "pfowokan2000@gmail.com",
  availability: "Available for select projects — Q2 2026",
  socials: [
    { label: "GitHub", href: "https://github.com/seyiiishay" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};

export const MANIFESTO = [
  {
    id: "01",
    title: "The Philosophy",
    body: "I believe software should feel alive—responsive, purposeful, and shaped around the people using it. I combine code, motion, and design to turn complex ideas into clear and engaging digital experiences.",
  },
  {
    id: "02",
    title: "The Practice",
    body: "I develop modern web and mobile applications using React, TypeScript, Tailwind CSS, Supabase, Capacitor, and emerging 3D technologies. My work connects reliable software engineering with thoughtful visual design.",
  },
  {
    id: "03",
    title: "The Process",
    body: "I move from idea to prototype, test on real screens, and improve the experience through continuous refinement. I focus on reusable architecture, responsive layouts, accessibility, performance, and details that make software feel effortless.",
  },
];

export const SKILLS = [
 "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "shadcn/ui",
  "Three.js",
  "React Three Fiber",
  "GSAP",
  "PHP",
  "SQL",
  "AJAX",
  "Supabase",
  "REST APIs",
  "Capacitor",
  "Progressive Web Apps",
  "Git & GitHub",
  "Responsive Design",
  "Accessibility",
  "UI/UX Implementation",
];

export const PROJECTS = [
  {
     id: "001",
    title: "Wealth Builder",
    category: "FinTech · Software Development",
    year: "2026",
    description:
      "A financial-planning platform that helps users understand their income, expenses, debt, savings, investments and long-term financial goals through interactive dashboards and personalized planning tools.",
    image: "/images/projects/wealth-builder.png",
    liveUrl: "https://wealthbuilder.elorasuite.ca/",
    githubUrl: "#",
  },
  {
    id: "002",
    title: "Schedule Planner",
    category: "Web & Mobile · Productivity",
    year: "2026",
    description:
      "A responsive scheduling application built to help users organize tasks, activities and important deadlines. The web application was also converted into a mobile experience using Capacitor.",
    image: "/images/projects/schedule-planner.png",
    liveUrl: "https://elorasuite.ca/",
    githubUrl: "#",
  },
  {
    id: "003",
    title: "FaithFlow",
    category: "Web Application · Community",
    year: "2026",
    description:
      "A faith-focused digital platform designed to provide an organized and accessible experience for spiritual content, community engagement and personal faith-development resources.",
    image: "/images/projects/faithflow.png",
    liveUrl: "https://faithflow.elorasuite.ca/",
    githubUrl: "#",
  },
  {
    id: "004",
    title: "3D Developer Portfolio",
    category: "Creative Development · 3D Web",
    year: "2026",
    description:
      "An immersive software-development portfolio combining accessible interface design with motion, interactive 3D elements and responsive frontend engineering.",
    image: "/images/projects/developer-portfolio.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/seyiiishay/tech-portfolio",
  },
];
