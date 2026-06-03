import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Fake navigate for preview ── */


export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollToSection = (hash) => {
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const portals = [
    {
      label: "Students",
      icon: "📖",
      title: "Student Portal",
      desc: "Track attendance, check results, view subjects, and manage your academic profile — all in one clean dashboard.",
      perks: ["Live Attendance View", "Exam Results", "Subject Listings", "Profile Management"],
      route: "/login/studentlogin",
      tag: "Most used",
      tagColor: "#1a1a2e",
    },
    {
      label: "Faculty",
      icon: "🖊",
      title: "Faculty Portal",
      desc: "Mark attendance, upload marks, run test workflows, and manage your classes with zero friction.",
      perks: ["Mark Attendance", "Upload Marks", "Create Tests", "Class Overview"],
      route: "/login/facultylogin",
      tag: null,
    },
    {
      label: "Admin",
      icon: "⚙",
      title: "Admin Portal",
      desc: "Full institutional control — departments, faculty, student data, subjects, and broadcast notices.",
      perks: ["Manage Departments", "Add People", "Subject Control", "Publish Notices"],
      route: "/login/adminlogin",
      tag: null,
    },
  ];

  const features = [
    { icon: "🎓", title: "Student Management", desc: "Full lifecycle from enrollment through graduation, organized and accessible." },
    { icon: "📋", title: "Attendance Tracking", desc: "Automated records with per-subject visual breakdowns for every student." },
    { icon: "📊", title: "Results & Analytics", desc: "Grade uploads, performance trends, and exportable academic reports." },
    { icon: "🏫", title: "Department Control", desc: "Centralized department, subject, and allocation management for admins." },
    { icon: "📢", title: "Notice Board", desc: "Broadcast institution-wide or role-specific announcements instantly." },
    { icon: "🔒", title: "Role-Based Access", desc: "JWT authentication and strict access guards keep data exactly where it belongs." },
  ];

  const faqs = [
    { q: "Who is EduERP built for?", a: "Three distinct roles: Admins with full institutional control, Faculty with classroom tools, and Students with academic access. Each role has a dedicated login and tailored dashboard." },
    { q: "How do users get their login credentials?", a: "Your institution admin creates accounts through the Admin Portal. The system generates secure credentials automatically — no manual setup needed." },
    { q: "Can faculty upload marks and attendance?", a: "Yes. Faculty can mark attendance, create tests, and upload marks. Students see updates reflected in their dashboards in real time." },
    { q: "How is student data protected?", a: "JWT authentication, bcrypt-hashed credentials, and strict role-based API guards ensure each user only ever accesses their own data." },
    { q: "Can students view their attendance history?", a: "Absolutely. A clean per-subject attendance dashboard shows percentage, history, and test scores alongside a full academic profile." },
    { q: "Does EduERP support multiple departments?", a: "Yes. Admins can create unlimited departments, assign subjects, and allocate faculty — all from the Admin Panel with no code required." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --cream: #faf8f4;
          --cream2: #f2ede4;
          --ink: #1a1714;
          --ink2: #3d3832;
          --muted: #7a7268;
          --accent: #2b4fff;
          --accent2: #0f2acc;
          --border: #e3ddd5;
          --border2: #cec8be;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'DM Sans', system-ui, sans-serif;
          --r: 12px;
          --r2: 20px;
        }

        body { font-family: var(--sans); background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }

        /* Noise texture overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .nav-link {
          font-size: 0.875rem; font-weight: 500; color: var(--ink2);
          text-decoration: none; letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--accent); }

        .btn-primary {
          background: var(--ink); color: #fff; border: none;
          padding: 0.7rem 1.6rem; border-radius: 50px;
          font-family: var(--sans); font-size: 0.875rem; font-weight: 600;
          letter-spacing: 0.01em; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(26,23,20,0.18);
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(43,79,255,0.3); }

        .btn-ghost {
          background: transparent; color: var(--ink2);
          border: 1.5px solid var(--border2);
          padding: 0.7rem 1.6rem; border-radius: 50px;
          font-family: var(--sans); font-size: 0.875rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: var(--ink); color: var(--ink); background: rgba(26,23,20,0.04); }

        .portal-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: var(--r2); padding: 2rem;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease, border-color 0.3s;
          cursor: default;
        }
        .portal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(26,23,20,0.1);
          border-color: var(--border2);
        }

        .feature-card {
          padding: 1.75rem; border-radius: var(--r);
          border: 1px solid var(--border);
          background: #fff;
          transition: all 0.25s ease;
        }
        .feature-card:hover {
          border-color: var(--accent);
          box-shadow: 0 8px 30px rgba(43,79,255,0.1);
          transform: translateY(-4px);
        }

        .faq-item {
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .faq-btn {
          width: 100%; background: none; border: none;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 0; cursor: pointer;
          color: var(--ink); font-family: var(--sans);
          font-size: 0.975rem; font-weight: 500; text-align: left;
        }
        .faq-chevron {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 1rem; color: var(--muted);
          transition: transform 0.3s ease, border-color 0.3s, background 0.3s;
        }

        .marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        .stat-box { text-align: center; }
        .stat-num { font-family: var(--serif); font-size: 3rem; color: var(--ink); line-height: 1; }
        .stat-label { font-size: 0.78rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.4rem; font-weight: 500; }

        /* Hamburger */
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--ink2); border-radius: 2px; transition: all 0.3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-menu { display: flex !important; }
          .hero-title { font-size: clamp(2.4rem, 8vw, 3.2rem) !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .portal-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; display: grid !important; gap: 2rem !important; }
          .cta-inner { flex-direction: column !important; align-items: flex-start !important; }
          .footer-row { flex-direction: column !important; gap: 2.5rem !important; }
          .section-pad { padding: 4rem 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ NAVBAR ══ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          padding: scrolled ? "0.85rem 0" : "1.25rem 0",
          background: scrolled ? "rgba(250,248,244,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.35s ease",
        }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎓</div>
              <span style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--ink)", letterSpacing: "-0.3px" }}>EduERP</span>
            </Link>
            {/* Desktop */}
            <div className="nav-links" style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
              {[["#login", "Portals"], ["#features", "Features"], ["#why", "Why Us"], ["#faq", "FAQ"]].map(([h, l]) => (
                <a
                  key={h}
                  href={h}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(h);
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
            <button className="nav-cta btn-primary" onClick={() => navigate("/login/adminlogin")}>Get started</button>
            {/* Mobile hamburger */}
            <button className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>
          {/* Mobile menu */}
          <div className="mobile-menu" style={{
            display: "none", flexDirection: "column",
            background: "rgba(250,248,244,0.98)", backdropFilter: "blur(16px)",
            borderTop: "1px solid var(--border)",
            maxHeight: mobileOpen ? 280 : 0, overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}>
            {[["#login", "Portals"], ["#features", "Features"], ["#why", "Why Us"], ["#faq", "FAQ"]].map(([h, l]) => (
              <a
                key={h}
                href={h}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(h);
                  setMobileOpen(false);
                }}
                style={{ padding: "0.9rem 2rem", color: "var(--ink2)", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid var(--border)", fontSize: "0.95rem" }}>
                {l}
              </a>
            ))}
            <div style={{ padding: "1rem 2rem 1.5rem" }}>
              <button className="btn-primary" style={{ width: "100%" }} onClick={() => { navigate("/login/adminlogin"); setMobileOpen(false); }}>Get started</button>
            </div>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section style={{ paddingTop: "9rem", paddingBottom: "6rem", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: 1160, margin: "0 auto", position: "relative" }}>

          {/* Decorative blob */}
          <div style={{ position: "absolute", top: "6rem", right: "-4rem", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,79,255,0.07) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{ animation: "fadeUp 0.6s ease both", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--cream2)", border: "1px solid var(--border)", borderRadius: 50, padding: "0.3rem 1rem 0.3rem 0.5rem", marginBottom: "2.5rem" }}>
              <span style={{ background: "var(--ink)", color: "#fff", borderRadius: 50, padding: "0.2rem 0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>New</span>
              <span style={{ fontSize: "0.82rem", color: "var(--ink2)", fontWeight: 500 }}>Next-gen college ERP — built for real institutions</span>
            </div>

            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "4rem", alignItems: "center" }}>
              <div>
                <h1 className="hero-title" style={{ fontFamily: "var(--serif)", fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.07, letterSpacing: "-1.5px", color: "var(--ink)", animation: "fadeUp 0.7s ease 0.1s both" }}>
                  Campus management,
                  <br />
                  <em style={{ fontStyle: "italic", color: "var(--accent)" }}>finally unified.</em>
                </h1>
                <p style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, marginTop: "1.5rem", maxWidth: 480, animation: "fadeUp 0.7s ease 0.2s both", fontWeight: 300 }}>
                  One platform connecting admins, faculty, and students. Attendance, results, notices, and full academic management — without the chaos.
                </p>
                <div style={{ display: "flex", gap: "0.85rem", marginTop: "2.25rem", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.3s both" }}>
                  <button className="btn-primary" onClick={() => navigate("/login/studentlogin")} style={{ padding: "0.8rem 1.8rem" }}>Student portal →</button>
                  <button className="btn-ghost" onClick={() => navigate("/login/facultylogin")}>Faculty login</button>
                </div>

                {/* Trust bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "2.5rem", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.4s both" }}>
                  {["500+ students", "50+ faculty", "99.9% uptime"].map((t, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--muted)", fontWeight: 500 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero visual card */}
              <div style={{ animation: "fadeUp 0.8s ease 0.3s both" }}>
                <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem", boxShadow: "0 20px 60px rgba(26,23,20,0.08)" }}>
                  <div style={{ background: "var(--cream)", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Attendance Overview</div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", height: 60 }}>
                      {[70, 85, 60, 92, 78, 88, 95].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: i === 6 ? "var(--accent)" : "var(--border2)", borderRadius: 4, height: `${h}%`, transition: "height 0.3s" }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.65rem", color: "var(--muted)" }}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    {[["Mathematics", "94%", "#e8f0ff"], ["Physics", "88%", "#fff7e6"], ["Chemistry", "76%", "#e8fff2"], ["English", "91%", "#fff0f0"]].map(([sub, pct, bg]) => (
                      <div key={sub} style={{ background: bg, borderRadius: 10, padding: "0.75rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>{sub}</div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--ink)", marginTop: "0.15rem" }}>{pct}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.75rem", background: "#f0f4ff", borderRadius: 10 }}>
                    <span style={{ fontSize: "1.2rem" }}>📢</span>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink)" }}>Mid-term exams: Nov 18–22</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--muted)" }}>Posted by Admin · 2h ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE STRIP ══ */}
        <div style={{ background: "var(--ink)", overflow: "hidden", padding: "0.9rem 0", borderTop: "none" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) => (
              ["Attendance Tracking", "Results Management", "Notice Board", "Student Portal", "Faculty Tools", "Admin Dashboard", "Role-Based Access", "Multi-Department Support", "Real-Time Sync", "Secure JWT Auth"].map((item, i) => (
                <span key={`${rep}-${i}`} style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0 2.5rem", whiteSpace: "nowrap" }}>
                  {item}
                  <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: "2.5rem" }}>·</span>
                </span>
              ))
            ))}
          </div>
        </div>

        {/* ══ STATS ══ */}
        <section style={{ background: "var(--cream2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "4rem 2rem" }}>
          <div className="stats-row" style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
            {[["500+", "Students enrolled"], ["50+", "Faculty members"], ["20+", "Departments"], ["99.9%", "Platform uptime"]].map(([val, label], i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="stat-box">
                  <div className="stat-num">{val}</div>
                  <div className="stat-label">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ PORTALS ══ */}
        <section id="login" className="section-pad" style={{ padding: "6rem 2rem", maxWidth: 1160, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "3.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Access Portals</div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.5px", lineHeight: 1.1 }}>Choose your portal</h2>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 320, lineHeight: 1.65, fontWeight: 300 }}>
                Dedicated dashboards crafted for every role in your institution.
              </p>
            </div>
          </Reveal>

          <div className="portal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {portals.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="portal-card" style={{ position: "relative" }}>
                  {p.tag && (
                    <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "var(--ink)", color: "#fff", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.25rem 0.7rem", borderRadius: 50 }}>{p.tag}</span>
                  )}
                  <div style={{ fontSize: "1.8rem", marginBottom: "1.25rem", width: 52, height: 52, background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.icon}
                  </div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{p.label}</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", letterSpacing: "-0.3px", marginBottom: "0.75rem" }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem", fontWeight: 300 }}>{p.desc}</p>

                  <ul style={{ listStyle: "none", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {p.perks.map((perk, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "var(--ink2)" }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--cream2)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", flexShrink: 0, color: "var(--accent)" }}>✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate(p.route)}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: 10, border: "1.5px solid var(--ink)",
                      background: "transparent", color: "var(--ink)", fontFamily: "var(--sans)",
                      fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
                  >
                    Login to {p.label} Portal →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section id="features" style={{ background: "var(--cream2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Platform Features</div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.5px" }}>Built for every workflow</h2>
                <p style={{ color: "var(--muted)", marginTop: "0.75rem", fontSize: "0.95rem", fontWeight: 300 }}>Everything you need to run your institution, without compromise.</p>
              </div>
            </Reveal>

            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {features.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="feature-card">
                    <div style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{f.icon}</div>
                    <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.45rem", color: "var(--ink)" }}>{f.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ══ */}
        <section id="why" style={{ padding: "6rem 2rem", maxWidth: 1160, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Why EduERP</div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                  Designed for institutions that move fast
                </h2>
                <p style={{ color: "var(--muted)", lineHeight: 1.75, fontWeight: 300, fontSize: "0.975rem", marginBottom: "2rem" }}>
                  Built on React, Node.js, and MongoDB — EduERP delivers real-time sync across every portal, enterprise-grade security, and zero software to install. Works on any device, from any browser.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    ["⚡", "Real-time sync across all portals — no page refresh needed"],
                    ["🛡️", "JWT auth + bcrypt hashing on every credential"],
                    ["📱", "Pixel-perfect on desktop, tablet, and mobile"],
                    ["🚀", "Sub-second load times on React + Node.js + MongoDB"],
                  ].map(([icon, text], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                      <span style={{ fontSize: "1.1rem", marginTop: "0.1rem" }}>{icon}</span>
                      <span style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { v: "24/7", l: "Always online", bg: "#f0f4ff" },
                  { v: "3", l: "User roles", bg: "#fff7e6" },
                  { v: "∞", l: "Departments", bg: "#e8fff2" },
                  { v: "0", l: "Setup required", bg: "#fff0f0" },
                ].map(({ v, l, bg }, i) => (
                  <div key={i} style={{ background: bg, border: "1px solid var(--border)", borderRadius: 16, padding: "1.75rem 1.5rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", color: "var(--ink)", marginBottom: "0.3rem" }}>{v}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══ */}
        <section id="faq" style={{ background: "var(--cream2)", borderTop: "1px solid var(--border)", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>FAQ</div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 2.6rem)", letterSpacing: "-0.5px" }}>Common questions</h2>
              </div>
            </Reveal>

            <div>
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="faq-item">
                    <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      <span className="faq-chevron" style={{
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                        borderColor: openFaq === i ? "var(--ink)" : "var(--border2)",
                        background: openFaq === i ? "var(--ink)" : "transparent",
                        color: openFaq === i ? "#fff" : "var(--muted)",
                      }}>+</span>
                    </button>
                    <div style={{
                      maxHeight: openFaq === i ? 200 : 0, overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}>
                      <p style={{ paddingBottom: "1.25rem", color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section style={{ padding: "5rem 2rem 7rem" }}>
          <Reveal>
            <div style={{ maxWidth: 1000, margin: "0 auto", background: "var(--ink)", borderRadius: 28, padding: "4rem 3.5rem", position: "relative", overflow: "hidden" }}>
              {/* Decorative circle */}
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", pointerEvents: "none" }} />

              <div className="cta-inner" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Get started today</div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                    Ready to transform your institution?
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", fontWeight: 300 }}>
                    Join institutions already using EduERP to simplify campus management.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0 }}>
                  <button
                    onClick={() => navigate("/login/studentlogin")}
                    style={{ padding: "0.8rem 1.8rem", borderRadius: 50, border: "none", background: "#fff", color: "var(--ink)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#e8f0ff"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--ink)"; }}
                  >Student Login →</button>
                  <button
                    onClick={() => navigate("/login/facultylogin")}
                    style={{ padding: "0.8rem 1.8rem", borderRadius: 50, border: "1.5px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", fontWeight: 500, fontSize: "0.875rem", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
                  >Faculty Login</button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--cream2)", padding: "3rem 2rem 2rem" }}>
          <div className="footer-row" style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 260 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>🎓</div>
                <span style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--ink)" }}>EduERP</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300 }}>Empowering educational institutions with modern, intelligent ERP solutions.</p>
            </div>

            <div style={{ display: "flex", gap: "3.5rem", flexWrap: "wrap" }}>
              {[
                { heading: "Portals", links: [["Student Login", "/login/studentlogin"], ["Faculty Login", "/login/facultylogin"], ["Admin Login", "/login/adminlogin"]] },
                { heading: "Features", links: [["Attendance", "#features"], ["Results", "#features"], ["Notices", "#features"]] },
                { heading: "Company", links: [["Why Us", "#why"], ["FAQ", "#faq"], ["Get Started", "/login/adminlogin"]] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.9rem" }}>{heading}</div>
                  {links.map(([label, href]) => (
                    <div key={label} style={{ marginBottom: "0.55rem" }}>
                      {href.startsWith("#") ? (
                        <a
                          href={href}
                          style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 300, transition: "color 0.2s" }}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(href);
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                        >{label}</a>
                      ) : (
                        <Link to={href} style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 300, transition: "color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                        >{label}</Link>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 1160, margin: "2rem auto 0", paddingTop: "1.25rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 300 }}>© 2026 EduERP · All rights reserved</p>
            <p style={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 300 }}>Built with ❤️ for education</p>
          </div>
        </footer>

      </div>
    </>
  );
}
