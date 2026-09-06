import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Menu, X } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const COLORS = {
  ink: "#0B1F33",
  inkSoft: "#132A45",
  inkLine: "#2C4F70",
  paper: "#EFF3F6",
  paperSoft: "#E3EAF0",
  line: "#6D93B5",
  lineSoft: "#B9CCDD",
  accent: "#FF6B4A",
  accentDark: "#E4552F",
  textDark: "#0F2036",
  muted: "#526375",
  mutedLight: "#9FB4C6",
  white: "#FFFFFF",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'IBM Plex Sans', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    name: "Ukyro",
    date: "AI-powered carpooling platform",
    desc: "An AI-powered carpooling and ride-sharing platform serving routes across Uttarakhand, matching riders with verified drivers through a responsive, instant-booking flow.",
    tags: ["React", "AI Matching", "Ride Sharing"],
    live: "https://ukyro.com/auth?tab=signin",
    code: null,
  },
  {
    name: "AmritDhara Dairy",
    date: "May 2026 — June 2026",
    desc: "A full-stack dairy management application to digitize dairy operations, with JWT authentication and role-based access for Admin and Staff, plus CRUD APIs for customers, milk collection, inventory, and billing.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    live: "https://dairy-project-ten.vercel.app",
    code: "https://github.com/khushboo8252/AmritDhara",
  },
  {
    name: "Vastra",
    date: "E-commerce · Next.js",
    desc: "An e-commerce storefront built with Next.js for fast page loads and optimized performance, with a responsive design tuned for a seamless shopping experience on any device.",
    tags: ["Next.js", "React", "E-commerce"],
    live: "https://vastra-ten.vercel.app/",
    code: null,
  },
  {
    name: "ChatAI",
    date: "January 2024 — February 2024",
    desc: "An AI-powered chat application enabling real-time conversational interaction via the Groq API, with a modern, fully responsive interface built for seamless cross-device use.",
    tags: ["React", "Tailwind CSS", "Groq API"],
    live: "https://lambent-salmiakki-2a3430.netlify.app",
    code: null,
  },
  {
    name: "YBStore",
    date: "React · Tailwind CSS",
    desc: "A fully functional personal site with home, about, projects, tech skills, and contact sections — built to be fast, responsive, and easy to update as new work ships.",
    tags: ["React", "Tailwind CSS"],
    live: "https://storeyb-vhfm.vercel.app/",
    code: null,
  },
];

const EXPERIENCE = [
  {
    date: "April 2026 — Present",
    role: "Software Developer",
    co: "AIForBusiness",
    bullets: [
      "Develop AI-powered web applications and business automation solutions using React on the frontend and Python-based backend services.",
      "Build scalable frontend interfaces in React and integrate backend APIs with Python and LLM-based services to support intelligent, automated business workflows.",
    ],
  },
  {
    date: "March 2025 — April 2026",
    role: "Web Developer",
    co: "Bandhani — The Ethnic Store",
    bullets: [
      "Independently designed, built, and customized a responsive e-commerce website end to end, from UI design through deployment.",
      "Implemented WhatsApp chat integration, product collection pages, and custom reusable UI components to improve engagement and conversion.",
    ],
  },
  {
    date: "September 2024 — February 2025",
    role: "Full Stack Developer Intern",
    co: "One Aim IT Solutions",
    bullets: [
      "Collaborated with cross-functional engineering teams to design and develop web applications using the MERN stack.",
      "Adapted quickly to new technologies and evolving requirements with a proactive, self-driven approach.",
    ],
  },
];

const SKILL_GROUPS = [
  { title: "languages", items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"] },
  { title: "frameworks & libraries", items: ["React", "Redux", "Node.js", "Express.js", "REST APIs"] },
  { title: "database", items: ["MongoDB"] },
  { title: "auth & security", items: ["JWT", "Role-Based Access Control"] },
  { title: "tools & platforms", items: ["Git", "GitHub", "VS Code", "Netlify", "Render", "Vercel"] },
  { title: "ai tools & apis", items: ["Windsurf", "Cursor", "Together AI", "Groq", "Gemini", "Apify"] },
];

const EDUCATION = [
  { title: "Full Stack Web Developer", sub: "Prepleaf by Masai", tag: "certification" },
  { title: "Bachelor of Commerce", sub: "Magadh University", tag: "degree" },
  { title: "CMA Intermediate", sub: "The Institute of Cost Accountants of India", tag: "certification" },
];

const GITHUB_URL = "https://github.com/khushboo8252";
const LINKEDIN_URL = "https://www.linkedin.com/in/khushboo-kumari-23814225b";
const EMAIL = "khushbooranjan8252@gmail.com";
const PHONE = "+91 6206424162";

function IconLink({ href, children, dark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-sm border transition-colors"
      style={{
        borderColor: dark ? COLORS.inkLine : COLORS.lineSoft,
        color: dark ? COLORS.mutedLight : COLORS.muted,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLORS.accent;
        e.currentTarget.style.color = COLORS.accentDark;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = dark ? COLORS.inkLine : COLORS.lineSoft;
        e.currentTarget.style.color = dark ? COLORS.mutedLight : COLORS.muted;
      }}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const sectionRefs = useRef({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    console.log("EmailJS config:", { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, hasKey: !!EMAILJS_PUBLIC_KEY });

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS env vars missing. Check .env file and restart dev server.");
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 8000);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_email: EMAIL,
      reply_to: form.email,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log("EmailJS success:", response);
        setFormStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 8000);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const ids = ["home", ...NAV_LINKS.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: FONT_BODY, backgroundColor: COLORS.paper, color: COLORS.textDark }} className="w-full">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* FLOATING BACKGROUND PARTICLES */}
      <div className="bg-particles">
        {[
          { left: "5%", size: 6, dur: 18, delay: 0, drift: "40px", opacity: 0.2, color: COLORS.accent },
          { left: "15%", size: 4, dur: 22, delay: 3, drift: "-30px", opacity: 0.15, color: COLORS.line },
          { left: "25%", size: 8, dur: 15, delay: 6, drift: "50px", opacity: 0.12, color: COLORS.accent },
          { left: "35%", size: 3, dur: 25, delay: 1, drift: "-20px", opacity: 0.25, color: COLORS.lineSoft },
          { left: "45%", size: 5, dur: 19, delay: 4, drift: "35px", opacity: 0.18, color: COLORS.accent },
          { left: "55%", size: 7, dur: 21, delay: 7, drift: "-40px", opacity: 0.14, color: COLORS.line },
          { left: "65%", size: 4, dur: 17, delay: 2, drift: "25px", opacity: 0.2, color: COLORS.lineSoft },
          { left: "75%", size: 6, dur: 23, delay: 5, drift: "-35px", opacity: 0.16, color: COLORS.accent },
          { left: "85%", size: 3, dur: 20, delay: 8, drift: "45px", opacity: 0.22, color: COLORS.line },
          { left: "92%", size: 5, dur: 16, delay: 3, drift: "-25px", opacity: 0.18, color: COLORS.lineSoft },
          { left: "10%", size: 2, dur: 28, delay: 9, drift: "30px", opacity: 0.3, color: COLORS.accent },
          { left: "50%", size: 2, dur: 26, delay: 11, drift: "-20px", opacity: 0.25, color: COLORS.line },
          { left: "80%", size: 2, dur: 24, delay: 13, drift: "35px", opacity: 0.28, color: COLORS.lineSoft },
        ].map((p, i) => (
          <div
            key={`p-${i}`}
            className="particle rounded-full"
            style={{
              left: p.left,
              bottom: "-20px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              "--p-drift": p.drift,
              "--p-opacity": p.opacity,
              "--p-rotate": "360deg",
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        {[
          { left: "8%", top: "15%", size: 40, dur: 12, delay: 0, shape: "border", color: COLORS.lineSoft },
          { left: "88%", top: "25%", size: 30, dur: 15, delay: 2, shape: "circle", color: COLORS.accent },
          { left: "20%", top: "60%", size: 50, dur: 18, delay: 4, shape: "border", color: COLORS.line },
          { left: "70%", top: "55%", size: 35, dur: 14, delay: 1, shape: "circle", color: COLORS.lineSoft },
          { left: "45%", top: "80%", size: 25, dur: 16, delay: 3, shape: "border", color: COLORS.accent },
          { left: "92%", top: "75%", size: 45, dur: 20, delay: 5, shape: "circle", color: COLORS.line },
        ].map((s, i) => (
          <div
            key={`s-${i}`}
            className="shape-float absolute"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: 0.08,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              ...(s.shape === "circle"
                ? { borderRadius: "50%", border: `1px solid ${s.color}` }
                : { border: `1px solid ${s.color}`, transform: "rotate(45deg)" }),
            }}
          />
        ))}

        {/* Floating code symbols */}
        {[
          { left: "12%", dur: 25, delay: 0, size: 18, text: "</>" },
          { left: "30%", dur: 30, delay: 5, size: 22, text: "{ }" },
          { left: "48%", dur: 22, delay: 8, size: 16, text: "() =>" },
          { left: "65%", dur: 28, delay: 3, size: 20, text: "const" },
          { left: "82%", dur: 26, delay: 10, size: 18, text: "npm" },
          { left: "5%", dur: 32, delay: 12, size: 14, text: "&&" },
          { left: "90%", dur: 24, delay: 6, size: 16, text: "===" },
          { left: "38%", dur: 35, delay: 15, size: 20, text: "git" },
        ].map((c, i) => (
          <div
            key={`c-${i}`}
            className="code-float"
            style={{
              left: c.left,
              bottom: "-30px",
              fontSize: `${c.size}px`,
              color: i % 2 === 0 ? COLORS.accent : COLORS.line,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {c.text}
          </div>
        ))}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes drawRoute { to { stroke-dashoffset: 0; } }
        .route-path { stroke-dasharray: 900; stroke-dashoffset: 900; animation: drawRoute 2.2s ease forwards 0.3s; }
        .grid-bg {
          background-image: linear-gradient(${COLORS.inkSoft} 1px, transparent 1px),
                             linear-gradient(90deg, ${COLORS.inkSoft} 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Scroll reveal */
        [data-reveal] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Floating orbs */
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.08); }
          66% { transform: translate(-25px, 25px) scale(0.95); }
        }
        .orb { animation: orbFloat 16s ease-in-out infinite; }
        .orb-2 { animation: orbFloat 20s ease-in-out infinite reverse; }
        .orb-3 { animation: orbFloat 13s ease-in-out infinite 3s; }

        /* Gradient text */
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-text {
          background: linear-gradient(90deg, #FF6B4A, #FFAB8C, #FF6B4A);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientText 4s ease infinite;
        }

        /* SVG node glow */
        @keyframes nodeGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(255,107,74,0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(255,107,74,0.9)); }
        }
        .node-glow { animation: nodeGlow 3s ease-in-out infinite; }

        /* Card hover lift */
        .card-lift {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(11,31,51,0.14);
        }

        /* Skill tag hover */
        .tag-hover {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tag-hover:hover {
          transform: translateY(-3px) scale(1.06);
          border-color: ${COLORS.accent} !important;
          color: ${COLORS.accent} !important;
        }

        /* Timeline dot pulse */
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,74,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,107,74,0); }
        }
        .dot-pulse { animation: dotPulse 2.5s ease-in-out infinite; }

        /* Input focus glow */
        .input-glow {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .input-glow:focus {
          border-color: ${COLORS.accent} !important;
          box-shadow: 0 0 0 3px rgba(255,107,74,0.15);
        }

        /* Scroll progress bar */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          z-index: 100;
          transition: width 0.1s ease;
          background: linear-gradient(90deg, ${COLORS.accent}, #FFAB8C, ${COLORS.accent});
          background-size: 200% 100%;
          animation: gradientText 3s ease infinite;
        }

        /* Hero headline word animation */
        @keyframes wordRise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .word-rise {
          opacity: 0;
          animation: wordRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Floating background particles */
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: var(--p-opacity, 0.3); }
          90% { opacity: var(--p-opacity, 0.3); }
          100% { transform: translateY(-120vh) translateX(var(--p-drift, 30px)) rotate(var(--p-rotate, 180deg)); opacity: 0; }
        }
        .particle {
          position: absolute;
          animation: particleFloat linear infinite;
          pointer-events: none;
        }

        /* Floating shapes */
        @keyframes shapeFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(90deg); }
          50% { transform: translate(-15px, -15px) rotate(180deg); }
          75% { transform: translate(-25px, 20px) rotate(270deg); }
        }
        .shape-float { animation: shapeFloat ease-in-out infinite; }

        /* Floating code symbols */
        @keyframes codeFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.12; }
          85% { opacity: 0.12; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .code-float {
          position: absolute;
          animation: codeFloat linear infinite;
          pointer-events: none;
          font-family: 'IBM Plex Mono', monospace;
          white-space: nowrap;
        }

        /* Background particle field */
        .bg-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .route-path { animation-duration: 0.01ms !important; }
          [data-reveal] { opacity: 1 !important; transform: none !important; }
          .orb, .orb-2, .orb-3, .node-glow, .dot-pulse, .gradient-text, .word-rise, .scroll-progress,
          .particle, .shape-float, .code-float { animation: none !important; }
          .word-rise { opacity: 1 !important; }
          .particle, .code-float { opacity: 0 !important; }
        }
      `}</style>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur" style={{ backgroundColor: "rgba(11,31,51,0.92)", borderColor: COLORS.inkLine }}>
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5" style={{ color: COLORS.paper }}>
            <span
              className="w-7 h-7 flex items-center justify-center text-xs flex-shrink-0"
              style={{ border: `1px dashed ${COLORS.line}`, color: COLORS.accent, fontFamily: FONT_MONO }}
            >
              KK
            </span>
            <span className="font-semibold text-base" style={{ fontFamily: FONT_DISPLAY }}>Khushboo Kumari</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm px-3.5 py-2 rounded-sm transition-colors"
                style={{ color: active === link.id ? COLORS.accent : COLORS.mutedLight }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-sm border"
            style={{ borderColor: COLORS.inkLine, color: COLORS.paper }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 pb-4" style={{ backgroundColor: COLORS.ink, borderTop: `1px solid ${COLORS.inkLine}` }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-3 text-sm border-b"
                style={{ color: COLORS.paper, borderColor: COLORS.inkSoft }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="grid-bg pt-44 pb-24 relative overflow-hidden" style={{ backgroundColor: COLORS.ink, color: COLORS.paper }}>
        <div className="orb absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.accent}, transparent 70%)` }} />
        <div className="orb-2 absolute bottom-10 right-20 w-96 h-96 rounded-full opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.line}, transparent 70%)` }} />
        <div className="orb-3 absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.accent}, transparent 70%)` }} />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2.5 text-sm mb-4" style={{ color: COLORS.accent, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accent }} />
              Full stack web developer · MERN
            </div>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, lineHeight: 1.05 }} className="text-4xl md:text-5xl lg:text-6xl">
              <span className="block word-rise" style={{ animationDelay: "0.1s" }}>Building routes</span>
              <span className="block word-rise gradient-text" style={{ animationDelay: "0.3s" }}>between ideas</span>
              <span className="block word-rise" style={{ animationDelay: "0.5s" }}>and users.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg max-w-md" style={{ color: COLORS.mutedLight }}>
              I design and ship secure, responsive web applications end to end — from REST APIs and role-based auth to React interfaces, with hands-on experience wiring LLM services into production products.
            </p>
            <div className="flex flex-wrap gap-3.5 mt-8">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 rounded-sm text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: COLORS.accent, color: COLORS.ink }}
              >
                View projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-sm text-sm font-medium border transition-transform hover:-translate-y-0.5"
                style={{ borderColor: COLORS.inkLine, color: COLORS.paper }}
              >
                Get in touch
              </button>
            </div>
            <div className="flex flex-wrap gap-9 mt-14 pt-7 border-t border-dashed" data-reveal style={{ borderColor: COLORS.inkLine }}>
              <div>
                <b style={{ fontFamily: FONT_DISPLAY, fontSize: "26px", color: COLORS.white, display: "block" }}>4+</b>
                <span className="text-sm" style={{ color: COLORS.mutedLight }}>end-to-end projects shipped</span>
              </div>
              <div>
                <b style={{ fontFamily: FONT_DISPLAY, fontSize: "26px", color: COLORS.white, display: "block" }}>3</b>
                <span className="text-sm" style={{ color: COLORS.mutedLight }}>full-stack / dev roles</span>
              </div>
              <div>
                <b style={{ fontFamily: FONT_DISPLAY, fontSize: "26px", color: COLORS.white, display: "block" }}>MERN</b>
                <span className="text-sm" style={{ color: COLORS.mutedLight }}>+ LLM-integrated products</span>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last max-w-md mx-auto w-full animate-float-slow">
            <svg viewBox="0 0 380 340" fill="none" className="w-full h-auto">
              <path
                className="route-path"
                d="M40 40 C 140 20, 160 100, 260 90 C 320 84, 300 160, 220 180 C 150 198, 120 250, 210 270 C 260 282, 300 300, 330 300"
                stroke={COLORS.line}
                strokeWidth="1.5"
                fill="none"
              />
              {[
                { cx: 40, cy: 40, label: "Dairy ops", sub: "AmritDhara", lx: 54, ly: 36, sy: 50 },
                { cx: 260, cy: 90, label: "AI chat", sub: "ChatAI", lx: 274, ly: 86, sy: 100 },
                { cx: 220, cy: 180, label: "Ride sharing", sub: "Ukyro", lx: 234, ly: 176, sy: 190 },
                { cx: 210, cy: 270, label: "Storefront", sub: "YBStore", lx: 224, ly: 266, sy: 280 },
              ].map((n, idx) => (
                <g key={n.label} className="node-glow" style={{ animationDelay: `${idx * 0.4}s` }}>
                  <circle cx={n.cx} cy={n.cy} r="6" fill={COLORS.ink} stroke={COLORS.accent} strokeWidth="2" />
                  <text x={n.lx} y={n.ly} fontSize="11" fill={COLORS.paper} style={{ fontFamily: FONT_MONO }}>{n.label}</text>
                  <text x={n.lx} y={n.sy} fontSize="9" fill={COLORS.mutedLight} style={{ fontFamily: FONT_MONO }}>{n.sub}</text>
                </g>
              ))}
              <g className="node-glow" style={{ animationDelay: "1.6s" }}>
                <circle cx="330" cy="300" r="6" fill={COLORS.ink} stroke={COLORS.accent} strokeWidth="2" />
                <text x="288" y="322" fontSize="11" fill={COLORS.paper} style={{ fontFamily: FONT_MONO }}>Portfolio</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-24" style={{ backgroundColor: COLORS.paper }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12" data-reveal>
            <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accentDark }} />
              About
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-2xl md:text-4xl">Full stack, from schema to screen.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-14">
            <div className="max-w-md space-y-4 text-base" data-reveal>
              <p>I'm a full stack web developer working across the MERN stack — MongoDB, Express.js, React, and Node.js — building applications that are scalable, secure, and pleasant to use. I'm comfortable owning a feature from the database schema up through the UI a customer actually touches.</p>
              <p>Recent work spans e-commerce, business and dairy-operations management, and AI-powered products, including wiring LLM-based services into full-stack applications for automated workflows. I onboard quickly to new stacks and enjoy the problem-solving that comes with a genuinely new project.</p>
            </div>
            <div className="grid gap-4">
              {[
                { tag: "stack", title: "MERN + Tailwind CSS", desc: "React front ends, Node/Express APIs, MongoDB data layer, styled with Tailwind for fast, consistent UI work." },
                { tag: "auth & access", title: "JWT with role-based access control", desc: "Secure authentication and RBAC for multi-role products, like Admin/Staff permissions in AmritDhara." },
                { tag: "ai integration", title: "LLM-powered features", desc: "Integrated Groq, Gemini, Together AI and Apify into product workflows, from chat interfaces to business automation." },
              ].map((c) => (
                <div key={c.tag} data-reveal className="p-5 rounded-sm card-lift" style={{ border: `1px dashed ${COLORS.line}`, backgroundColor: COLORS.white }}>
                  <span className="block text-xs mb-1.5" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>{c.tag}</span>
                  <h3 className="text-base font-medium mb-1.5" style={{ fontFamily: FONT_DISPLAY }}>{c.title}</h3>
                  <p className="text-sm" style={{ color: COLORS.muted }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 md:py-24" style={{ backgroundColor: COLORS.paperSoft }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12" data-reveal>
            <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accentDark }} />
              Experience
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-2xl md:text-4xl">Where I've built.</h2>
          </div>
          <div className="relative pl-9">
            <div
              className="absolute top-1.5 bottom-1.5"
              style={{
                left: "6px",
                width: "1px",
                backgroundImage: `linear-gradient(${COLORS.line} 60%, transparent 0%)`,
                backgroundSize: "1px 8px",
                backgroundRepeat: "repeat-y",
              }}
            />
            {EXPERIENCE.map((item, i) => (
              <div key={item.role} data-reveal className="relative" style={{ paddingBottom: i === EXPERIENCE.length - 1 ? 0 : "44px" }}>
                <div
                  className="absolute w-3.5 h-3.5 rounded-full dot-pulse"
                  style={{ left: "-36px", top: "4px", backgroundColor: COLORS.paperSoft, border: `2px solid ${COLORS.accent}` }}
                />
                <span className="block text-xs mb-1.5" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>{item.date}</span>
                <h3 style={{ fontFamily: FONT_DISPLAY }} className="text-lg">{item.role}</h3>
                <div className="text-sm mb-3 mt-0.5" style={{ color: COLORS.muted }}>{item.co}</div>
                <ul className="list-disc pl-5 space-y-1.5">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="text-[15px]">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 md:py-24" style={{ backgroundColor: COLORS.paper }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12" data-reveal>
            <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accentDark }} />
              Projects
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-2xl md:text-4xl">A few things I've shipped.</h2>
            <p className="mt-3" style={{ color: COLORS.muted }}>Live products and demos spanning management tools, marketplaces, and AI-driven interfaces.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                data-reveal
                className="relative flex flex-col p-6 rounded-sm group card-lift"
                style={{ border: `1px solid ${COLORS.lineSoft}`, backgroundColor: COLORS.white, transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: COLORS.accent }}
                />
                <div className="flex items-start justify-between gap-3">
                  <h3 style={{ fontFamily: FONT_DISPLAY }} className="text-lg">{p.name}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <IconLink href={p.live}><ExternalLink size={14} /></IconLink>
                    {p.code && <IconLink href={p.code}><Github size={14} /></IconLink>}
                  </div>
                </div>
                <div className="text-xs mt-1.5 mb-3" style={{ color: COLORS.muted, fontFamily: FONT_MONO }}>{p.date}</div>
                <p className="text-[14.5px] flex-grow">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-sm tag-hover"
                      style={{ border: `1px solid ${COLORS.lineSoft}`, color: COLORS.muted, fontFamily: FONT_MONO }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: COLORS.ink, color: COLORS.paper }}>
        <div className="orb absolute top-10 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.accent}, transparent 70%)` }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-xl mb-12" data-reveal>
            <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accent, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accent }} />
              Skills
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-2xl md:text-4xl">Tools of the trade.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} data-reveal>
                <h3
                  className="text-xs pb-2.5 mb-3.5 border-b border-dashed"
                  style={{ color: COLORS.mutedLight, fontFamily: FONT_MONO, borderColor: COLORS.inkLine, fontWeight: 400 }}
                >
                  {g.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-sm tag-hover"
                      style={{ border: `1px solid ${COLORS.inkLine}`, backgroundColor: COLORS.inkSoft, color: COLORS.paper }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-20 md:py-24" style={{ backgroundColor: COLORS.paper }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-10" data-reveal>
            <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>
              <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accentDark }} />
              Education
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-2xl md:text-4xl">Background.</h2>
          </div>
          <div className="grid gap-3.5 max-w-xl">
            {EDUCATION.map((e) => (
              <div key={e.title} data-reveal className="flex justify-between gap-4 py-4 border-b" style={{ borderColor: COLORS.paperSoft }}>
                <div>
                  <h3 className="text-base" style={{ fontFamily: FONT_DISPLAY }}>{e.title}</h3>
                  <div className="text-sm mt-0.5" style={{ color: COLORS.muted }}>{e.sub}</div>
                </div>
                <span className="text-xs whitespace-nowrap" style={{ color: COLORS.accentDark, fontFamily: FONT_MONO }}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grid-bg py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: COLORS.ink, color: COLORS.paper }}>
        <div className="orb-2 absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-12 pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.accent}, transparent 70%)` }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2.5 text-xs mb-3" style={{ color: COLORS.accent, fontFamily: FONT_MONO }}>
            <span className="w-8 h-px inline-block" style={{ backgroundColor: COLORS.accent }} />
            Contact
          </div>
          <h2 style={{ fontFamily: FONT_DISPLAY }} className="text-3xl md:text-5xl max-w-xs" data-reveal>Let's build the next route together.</h2>

          <div className="grid md:grid-cols-2 gap-12 mt-11 items-start">
            <div className="grid" data-reveal>
              {[
                { icon: <Mail size={15} />, label: "email", value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: <Phone size={15} />, label: "phone", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
                { icon: <Linkedin size={15} />, label: "linkedin", value: "linkedin.com/in/khushboo-kumari-23814225b", href: LINKEDIN_URL },
                { icon: <Github size={15} />, label: "github", value: "github.com/khushboo8252", href: GITHUB_URL },
              ].map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 py-4 px-1 border-b transition-all hover:pl-2.5"
                  style={{ borderColor: COLORS.inkLine, color: COLORS.paper }}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-sm flex-shrink-0" style={{ border: `1px solid ${COLORS.inkLine}` }}>
                    {row.icon}
                  </span>
                  <span>
                    <span className="block text-xs" style={{ color: COLORS.mutedLight, fontFamily: FONT_MONO }}>{row.label}</span>
                    <span className="text-[15px]">{row.value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div data-reveal>
              <p className="max-w-sm text-[15px] mb-5" style={{ color: COLORS.mutedLight }}>
                Open to full stack and MERN developer roles, freelance builds, and projects that pair solid engineering with AI-powered features.
              </p>
              <form onSubmit={handleFormSubmit} className="grid gap-3 max-w-sm">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={handleFormChange}
                  className="px-4 py-2.5 rounded-sm text-sm outline-none input-glow"
                  style={{
                    backgroundColor: COLORS.inkSoft,
                    border: `1px solid ${COLORS.inkLine}`,
                    color: COLORS.paper,
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={handleFormChange}
                  className="px-4 py-2.5 rounded-sm text-sm outline-none input-glow"
                  style={{
                    backgroundColor: COLORS.inkSoft,
                    border: `1px solid ${COLORS.inkLine}`,
                    color: COLORS.paper,
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Your message"
                  required
                  rows="4"
                  value={form.message}
                  onChange={handleFormChange}
                  className="px-4 py-2.5 rounded-sm text-sm outline-none input-glow resize-none"
                  style={{
                    backgroundColor: COLORS.inkSoft,
                    border: `1px solid ${COLORS.inkLine}`,
                    color: COLORS.paper,
                  }}
                />
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="px-6 py-3 rounded-sm text-sm font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.ink }}
                >
                  {formStatus === "sending" ? "Sending…" : "Send message"}
                </button>
                {formStatus === "success" && (
                  <p className="text-sm" style={{ color: COLORS.accent }}>
                    Message sent! I'll get back to you soon.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm" style={{ color: "#FF8A65" }}>
                    Something went wrong. Please try emailing me directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 border-t" style={{ backgroundColor: COLORS.ink, borderColor: COLORS.inkLine }}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between flex-wrap gap-2.5 text-xs" style={{ color: COLORS.mutedLight, fontFamily: FONT_MONO }}>
          <p className="animate-bounce-subtle">Khushboo Kumari — Full Stack Web Developer</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
