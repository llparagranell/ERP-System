import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────── */
function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ─────────────────────────────────────────
   Animated section wrapper
───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Data ── */
    const stats = [
        { value: "500+", label: "Students" },
        { value: "50+", label: "Faculty" },
        { value: "20+", label: "Departments" },
        { value: "99.9%", label: "Uptime" },
    ];

    const portals = [
        {
            icon: "🎒", title: "Student Portal",
            desc: "Access subjects, attendance records, test results, and your academic in one place.",
            perks: ["View Attendance", "Check Results", "Subject List", "Edit Profile"],
            route: "/login/studentlogin",
            accent: "#6366f1",
            ring: "from-indigo-500 to-violet-500",
        },
        {
            icon: "🧑‍🏫", title: "Faculty Portal",
            desc: "Mark attendance, upload marks, create tests, and manage classes with ease.",
            perks: ["Mark Attendance", "Upload Marks", "Create Tests", "Faculty Profile"],
            route: "/login/facultylogin",
            accent: "#a855f7",
            ring: "from-purple-500 to-fuchsia-500",
        },
        {
            icon: "🛡️", title: "Admin Portal",
            desc: "Full institutional control — departments, faculty, students, subjects, notices.",
            perks: ["Manage Departments", "Add Faculty / Students", "Subject Control", "Publish Notices"],
            route: "/login/adminlogin",
            accent: "#3b82f6",
            ring: "from-blue-500 to-cyan-500",
        },
    ];

    const features = [
        { icon: "🎓", title: "Student Management", desc: "Full lifecycle from enrollment to graduation." },
        { icon: "📋", title: "Attendance Tracking", desc: "Automated system with instant visual reports." },
        { icon: "📊", title: "Results & Marks", desc: "Exam grading and performance analytics." },
        { icon: "🏫", title: "Department Control", desc: "Centralised & department management." },
        { icon: "📢", title: "Notice Board", desc: "Instant institution-wide announcements." },
        { icon: "🔒", title: "Secure Access", desc: "Role-based JWT auth for every user." },
    ];

    const whyUs = [
        { icon: "⚡", title: "Real-Time Sync", desc: "Live data across every portal — no refresh needed.", grad: "from-indigo-500/20 to-transparent", border: "border-indigo-500/25" },
        { icon: "🛡️", title: "Enterprise Security", desc: "JWT auth + bcrypt hashing on every credential.", grad: "from-purple-500/20 to-transparent", border: "border-purple-500/25" },
        { icon: "📱", title: "Fully Responsive", desc: "Pixel-perfect on desktop, tablet, or mobile.", grad: "from-blue-500/20 to-transparent", border: "border-blue-500/25" },
        { icon: "📈", title: "Smart Analytics", desc: "Dashboards for attendance trends & results.", grad: "from-violet-500/20 to-transparent", border: "border-violet-500/25" },
        { icon: "🚀", title: "Lightning Fast", desc: "React + Node.js + MongoDB for sub-second loads.", grad: "from-fuchsia-500/20 to-transparent", border: "border-fuchsia-500/25" },
        { icon: "🔧", title: "Easy Admin", desc: "Manage your whole campus in a few clicks.", grad: "from-sky-500/20 to-transparent", border: "border-sky-500/25" },
    ];

    const faqs = [
        { q: "Who can use EduERP?", a: "Three roles: Admins (full control), Faculty (class tools), and Students (academic access). Each has a dedicated login and customised dashboard." },
        { q: "How do I get my login credentials?", a: "Your institution admin issues credentials. Admins add faculty and students through the Admin Portal and the system creates secure accounts automatically." },
        { q: "Can faculty upload marks and attendance?", a: "Yes! Faculty can mark attendance, create tests, and upload marks. Students see results updated in real time." },
        { q: "Is student data secure?", a: "Absolutely — JWT authentication, bcrypt hashing, and strict role-based API guards mean each user only ever sees their own data." },
        { q: "Can students view their attendance history?", a: "Yes. A clean dashboard shows subject-wise attendance, test scores, and full academic profile history." },
        { q: "Does EduERP support multiple departments?", a: "Yes. Admins can create unlimited departments, assign subjects, and allocate faculty — all from the Admin Panel." },
    ];

    return (
        <>
            {/* ── Global keyframe styles ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

                *, *::before, *::after { box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif !important; }

                @keyframes orb-drift {
                    0%,100% { transform: translate(0, 0) scale(1); }
                    33%      { transform: translate(40px,-30px) scale(1.08); }
                    66%      { transform: translate(-30px,20px) scale(0.95); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes badge-glow {
                    0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
                    50%     { box-shadow: 0 0 20px 4px rgba(99,102,241,0.35); }
                }
                @keyframes float-y {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-10px); }
                }
                @keyframes counter-up {
                    from { opacity:0; transform:translateY(12px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                @keyframes gradient-shift {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .orb { animation: orb-drift 14s ease-in-out infinite; }
                .orb-2 { animation: orb-drift 18s ease-in-out infinite reverse; }
                .orb-3 { animation: orb-drift 22s ease-in-out infinite 4s; }

                .shimmer-text {
                    background: linear-gradient(90deg,
                        #6366f1 0%, #a855f7 25%, #c084fc 50%, #a855f7 75%, #6366f1 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 4s linear infinite;
                }
                .spin-ring { animation: spin-slow 8s linear infinite; }
                .float-icon { animation: float-y 3s ease-in-out infinite; }

                .card-hover {
                    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                                box-shadow 0.35s ease, border-color 0.35s ease;
                }
                .card-hover:hover {
                    transform: translateY(-10px) scale(1.01);
                    box-shadow: 0 30px 60px -10px rgba(99,102,241,0.3);
                    border-color: rgba(99,102,241,0.4) !important;
                }

                .why-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .why-card:hover {
                    transform: translateY(-6px) scale(1.02);
                    box-shadow: 0 20px 40px -10px rgba(99,102,241,0.25);
                }

                .nav-link {
                    position: relative;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -3px; left: 0;
                    width: 0; height: 2px;
                    background: linear-gradient(90deg,#6366f1,#a855f7);
                    border-radius: 2px;
                    transition: width 0.3s ease;
                }
                .nav-link:hover { color: #fff; }
                .nav-link:hover::after { width: 100%; }

                .faq-item {
                    transition: border-color 0.3s ease, background 0.3s ease;
                }
                .gradient-border {
                    background: linear-gradient(135deg,#6366f1,#a855f7,#3b82f6);
                    background-size: 200% 200%;
                    animation: gradient-shift 5s ease infinite;
                }
                .section-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                /* ── Hamburger ── */
                .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
                .hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.8); border-radius: 2px; transition: all 0.3s ease; }
                .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

                .nav-desktop { display: flex; gap: 2rem; align-items: center; }
                .nav-cta-desktop { display: block; }

                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    gap: 0;
                    background: rgba(8,12,24,0.97);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255,255,255,0.06);
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
                }

                /* ── Responsive breakpoints ── */
                @media (max-width: 768px) {
                    .hamburger { display: flex; }
                    .nav-desktop { display: none !important; }
                    .nav-cta-desktop { display: none !important; }
                    .mobile-menu { display: flex; }

                    .hero-title { font-size: 2.2rem !important; letter-spacing: -1px !important; }
                    .hero-section { padding-top: 8rem !important; padding-bottom: 4rem !important; }
                    .hero-sub { font-size: 1rem !important; }
                    .hero-ctas { flex-direction: column !important; align-items: center !important; }
                    .hero-ctas button { width: 100%; max-width: 280px; }
                    .stats-row { gap: 2rem !important; }

                    .section-inner { padding: 3rem 1.25rem !important; }
                    .section-title { font-size: 1.75rem !important; }

                    .portal-grid { grid-template-columns: 1fr !important; }
                    .features-grid { grid-template-columns: 1fr 1fr !important; }
                    .why-grid { grid-template-columns: 1fr 1fr !important; }

                    .highlight-strip { grid-template-columns: 1fr !important; }
                    .highlight-strip > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
                    .highlight-strip > div:last-child { border-bottom: none; }

                    .footer-inner { flex-direction: column !important; gap: 2rem !important; }
                    .footer-links { gap: 2rem !important; }

                    .cta-banner { margin: 0 1rem 4rem !important; padding: 3rem 1.5rem !important; }
                    .cta-banner-btns { flex-direction: column !important; align-items: center !important; }
                    .cta-banner-btns button { width: 100%; max-width: 280px; }
                }

                @media (max-width: 480px) {
                    .features-grid { grid-template-columns: 1fr !important; }
                    .why-grid { grid-template-columns: 1fr !important; }
                    .stats-row { grid-template-columns: 1fr 1fr !important; display: grid !important; gap: 1.5rem !important; }
                }
            `}</style>

            <div style={{ minHeight: "100vh", background: "#080c18", color: "#fff", fontFamily: "'Inter',sans-serif", overflowX: "hidden", position: "relative" }}>

                {/* ── Animated background orbs ── */}
                <div className="orb" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                    <div style={{ position: "absolute", top: "-15%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)" }} />
                </div>
                <div className="orb-2" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                    <div style={{ position: "absolute", top: "35%", right: "-8%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)" }} />
                </div>
                <div className="orb-3" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                    <div style={{ position: "absolute", bottom: "-10%", left: "25%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)" }} />
                </div>

                {/* ── NAVBAR ── */}
                <nav style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
                    transition: "all 0.4s ease",
                    padding: scrolled ? "0.75rem 0" : "1.4rem 0",
                    background: scrolled ? "rgba(8,12,24,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
                    boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
                }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Logo */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🎓</div>
                            <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
                                Edu<span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ERP</span>
                            </span>
                        </div>
                        {/* Desktop links */}
                        <div className="nav-desktop">
                            {[["#login", "Login"], ["#features", "Features"], ["#why-us", "Why Us"], ["#faq", "FAQ"]].map(([href, label]) => (
                                <a key={href} href={href} className="nav-link">{label}</a>
                            ))}
                        </div>
                        {/* Desktop CTA */}
                        <button
                            className="nav-cta-desktop"
                            onClick={() => navigate("/login/adminlogin")}
                            style={{
                                padding: "0.55rem 1.4rem", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem",
                                background: "linear-gradient(135deg,#6366f1,#a855f7)",
                                color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.6)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
                        >
                            Get Started →
                        </button>
                        {/* Hamburger */}
                        <button className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
                            <span /><span /><span />
                        </button>
                    </div>
                    {/* Mobile drawer */}
                    <div className="mobile-menu" style={{ maxHeight: mobileOpen ? 320 : 0 }}>
                        {[["#login", "Login"], ["#features", "Features"], ["#why-us", "Why Us"], ["#faq", "FAQ"]].map(([href, label]) => (
                            <a
                                key={href} href={href}
                                onClick={() => setMobileOpen(false)}
                                style={{ padding: "1rem 2rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "1rem", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                {label}
                            </a>
                        ))}
                        <div style={{ padding: "1rem 2rem 1.5rem" }}>
                            <button
                                onClick={() => { navigate("/login/adminlogin"); setMobileOpen(false); }}
                                style={{ width: "100%", padding: "0.75rem", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff" }}
                            >
                                Get Started →
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ══════════════════════════════════════
                    HERO
                ══════════════════════════════════════ */}
                <section className="hero-section" style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: "10rem", paddingBottom: "7rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
                    {/* Badge */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.3rem 1.1rem", borderRadius: 50, marginBottom: "2rem",
                        background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)",
                        fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", fontWeight: 600,
                        animation: "badge-glow 3s ease infinite",
                    }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1", display: "inline-block" }} />
                        Next-Generation College ERP Platform
                    </div>

                    {/* Headline */}
                    <h1 className="hero-title" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: "1.6rem", maxWidth: 800, margin: "0 auto 1.6rem" }}>
                        Manage Your Institution
                        <br />
                        <span className="shimmer-text">Smarter & Faster</span>
                    </h1>

                    {/* Sub */}
                    <p className="hero-sub" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.75 }}>
                        One unified platform for admins, faculty, and students — streamline attendance, results, and academics effortlessly.
                    </p>

                    {/* CTAs */}
                    <div className="hero-ctas" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                            onClick={() => navigate("/login/studentlogin")}
                            style={{
                                padding: "0.85rem 2rem", borderRadius: 50, border: "none", cursor: "pointer",
                                background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                                boxShadow: "0 8px 30px rgba(99,102,241,0.45)", transition: "all 0.3s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(99,102,241,0.6)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.45)"; }}
                        >
                            Student Portal →
                        </button>
                        <button
                            onClick={() => navigate("/login/facultylogin")}
                            style={{
                                padding: "0.85rem 2rem", borderRadius: 50, cursor: "pointer",
                                background: "transparent", color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                                border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                                transition: "all 0.3s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                        >
                            Faculty Portal →
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="stats-row" style={{ display: "flex", justifyContent: "center", gap: "4rem", marginTop: "5rem", flexWrap: "wrap" }}>
                        {stats.map((s, i) => (
                            <div key={i} style={{ textAlign: "center", animation: `counter-up 0.6s ease ${i * 120}ms both` }}>
                                <div style={{
                                    fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-1px",
                                    background: "linear-gradient(135deg,#6366f1,#a855f7)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative divider */}
                    <div style={{ marginTop: "5rem", height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(168,85,247,0.4), transparent)", maxWidth: 800, margin: "5rem auto 0" }} />
                </section>

                {/* ══════════════════════════════════════
                    PORTAL LOGIN CARDS
                ══════════════════════════════════════ */}
                <section id="login" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                            <span className="section-label" style={{ color: "#818cf8" }}>Access Portals</span>
                            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.75rem" }}>
                                Choose Your Portal
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", fontSize: "1rem" }}>
                                Dedicated dashboards crafted for every role in your institution.
                            </p>
                        </div>
                    </Reveal>

                    <div className="portal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
                        {portals.map((p, i) => (
                            <Reveal key={i} delay={i * 120}>
                                <div
                                    className="card-hover"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: 24, padding: "2.2rem",
                                        position: "relative", overflow: "hidden",
                                    }}
                                >
                                    {/* Top gradient bleed */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.accent},${p.accent}88)`, borderRadius: "24px 24px 0 0" }} />

                                    {/* Spinning ring icon */}
                                    <div className="float-icon" style={{ marginBottom: "1.5rem", position: "relative", width: 72, height: 72 }}>
                                        <div className={`spin-ring gradient-border`} style={{ position: "absolute", inset: -2, borderRadius: "50%", opacity: 0.7 }} />
                                        <div style={{
                                            position: "relative", zIndex: 1, width: 72, height: 72, borderRadius: "50%",
                                            background: `${p.accent}22`, border: `1px solid ${p.accent}44`,
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem",
                                        }}>
                                            {p.icon}
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.6rem", letterSpacing: "-0.3px" }}>{p.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.desc}</p>

                                    <ul style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                        {p.perks.map((perk, j) => (
                                            <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>
                                                <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${p.accent}33`, border: `1px solid ${p.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", flexShrink: 0 }}>✓</span>
                                                {perk}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => navigate(p.route)}
                                        style={{
                                            width: "100%", padding: "0.8rem", borderRadius: 14, border: "none", cursor: "pointer",
                                            background: `linear-gradient(135deg,${p.accent},${p.accent}bb)`,
                                            color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                                            boxShadow: `0 4px 20px ${p.accent}44`,
                                            transition: "all 0.3s",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.02)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        Login →
                                    </button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Divider */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)" }} />
                </div>

                {/* ══════════════════════════════════════
                    FEATURES
                ══════════════════════════════════════ */}
                <section id="features" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                            <span className="section-label" style={{ color: "#818cf8" }}>Features</span>
                            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.75rem" }}>
                                Powerful Features
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>
                                Everything you need to run your institution seamlessly.
                            </p>
                        </div>
                    </Reveal>

                    <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                        {features.map((f, i) => (
                            <Reveal key={i} delay={i * 80}>
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: 18, padding: "1.75rem",
                                        transition: "all 0.3s cubic-bezier(.22,.68,0,1.2)",
                                        cursor: "default",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = "translateY(-6px)";
                                        e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                                        e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                                        e.currentTarget.style.boxShadow = "0 16px 40px rgba(99,102,241,0.18)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{f.icon}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Divider */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)" }} />
                </div>

                {/* ══════════════════════════════════════
                    WHY CHOOSE US
                ══════════════════════════════════════ */}
                <section id="why-us" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                            <span className="section-label" style={{ color: "#c084fc" }}>Why Us</span>
                            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.75rem" }}>
                                Why Choose EduERP?
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", maxWidth: 480, margin: "0.75rem auto 0" }}>
                                Built for modern institutions that demand reliability, speed, and zero friction.
                            </p>
                        </div>
                    </Reveal>

                    <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                        {whyUs.map((item, i) => (
                            <Reveal key={i} delay={i * 80}>
                                <div
                                    className="why-card"
                                    style={{
                                        background: `linear-gradient(135deg, ${item.grad.replace("from-", "").replace(" to-transparent", "")} 0%, transparent 80%)`,
                                        border: `1px solid ${item.border.replace("border-", "").replace("/25", "")}33`,
                                        borderRadius: 18, padding: "1.75rem", cursor: "default",
                                    }}
                                >
                                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Highlight strip */}
                    <Reveal delay={200}>
                        <div className="highlight-strip" style={{
                            marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 16, overflow: "hidden",
                        }}>
                            {["No software to install", "Instant role-based access", "Works 24 / 7 on any device"].map((label, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem",
                                    padding: "1.25rem 2rem",
                                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                                }}>
                                    <span style={{ fontSize: "1.2rem" }}>✅</span>
                                    <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: "0.875rem" }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* Divider */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)" }} />
                </div>

                {/* ══════════════════════════════════════
                    FAQ
                ══════════════════════════════════════ */}
                <section id="faq" style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "5rem 2rem" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                            <span className="section-label" style={{ color: "#c084fc" }}>FAQ</span>
                            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.75rem" }}>
                                Frequently Asked Questions
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>
                                Everything you need to know before you get started.
                            </p>
                        </div>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {faqs.map((faq, i) => (
                            <Reveal key={i} delay={i * 60}>
                                <div
                                    className="faq-item"
                                    style={{
                                        border: openFaq === i ? "1px solid rgba(99,102,241,0.45)" : "1px solid rgba(255,255,255,0.08)",
                                        background: openFaq === i ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
                                        borderRadius: 14, overflow: "hidden",
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{
                                            width: "100%", textAlign: "left", display: "flex",
                                            justifyContent: "space-between", alignItems: "center",
                                            padding: "1.25rem 1.5rem", background: "transparent", border: "none",
                                            cursor: "pointer", color: "#fff", fontWeight: 600, fontSize: "0.95rem",
                                        }}
                                    >
                                        <span>{faq.q}</span>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                            background: openFaq === i ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)",
                                            color: openFaq === i ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                                            fontSize: "1.2rem", fontWeight: 300, lineHeight: 1,
                                            transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease, background 0.3s ease",
                                        }}>+</span>
                                    </button>
                                    <div style={{
                                        maxHeight: openFaq === i ? 200 : 0,
                                        overflow: "hidden",
                                        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                                    }}>
                                        <p style={{
                                            padding: "0 1.5rem 1.25rem",
                                            color: "rgba(255,255,255,0.55)",
                                            fontSize: "0.9rem", lineHeight: 1.75,
                                            borderTop: "1px solid rgba(255,255,255,0.07)",
                                            paddingTop: "1rem",
                                        }}>
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    CTA BANNER
                ══════════════════════════════════════ */}
                <Reveal>
                    <section className="cta-banner" style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto 6rem", padding: "0 2rem" }}>
                        <div style={{
                            position: "relative", borderRadius: 28, overflow: "hidden", textAlign: "center",
                            padding: "5rem 3rem",
                            background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.12) 50%, rgba(59,130,246,0.1) 100%)",
                            border: "1px solid rgba(99,102,241,0.25)",
                        }}>
                            {/* shimmer overlay */}
                            <div style={{
                                position: "absolute", inset: 0, pointerEvents: "none",
                                background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 70%)",
                            }} />
                            <span className="section-label" style={{ color: "#818cf8", position: "relative", zIndex: 1 }}>Get Started</span>
                            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", margin: "1rem 0 0.75rem", position: "relative", zIndex: 1 }}>
                                Ready to Transform Your Institution?
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem", position: "relative", zIndex: 1, fontSize: "1rem" }}>
                                Join institutions already using EduERP to simplify campus management.
                            </p>
                            <div className="cta-banner-btns" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                                <button
                                    onClick={() => navigate("/login/studentlogin")}
                                    style={{
                                        padding: "0.85rem 2rem", borderRadius: 50, border: "none", cursor: "pointer",
                                        background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                                        boxShadow: "0 8px 30px rgba(99,102,241,0.45)", transition: "all 0.3s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(99,102,241,0.6)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.45)"; }}
                                >
                                    Student Login →
                                </button>
                                <button
                                    onClick={() => navigate("/login/facultylogin")}
                                    style={{
                                        padding: "0.85rem 2rem", borderRadius: 50, cursor: "pointer",
                                        background: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                                        border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", transition: "all 0.3s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                                >
                                    Faculty Login →
                                </button>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ══════════════════════════════════════
                    FOOTER
                ══════════════════════════════════════ */}
                <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}>
                    <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "3.5rem 2rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2.5rem" }}>
                        {/* Brand */}
                        <div style={{ maxWidth: 280 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎓</div>
                                <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                                    Edu<span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ERP</span>
                                </span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                                Empowering educational institutions with modern, intelligent ERP solutions.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="footer-links" style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
                            {[
                                { heading: "Portals", links: [["Student Login", "/login/studentlogin"], ["Faculty Login", "/login/facultylogin"], ["Admin Login", "/login/adminlogin"]] },
                                { heading: "Features", links: [["Attendance", "#features"], ["Results", "#features"], ["Notices", "#features"]] },
                                { heading: "Navigate", links: [["Why Us", "#why-us"], ["FAQ", "#faq"], ["Get Started", "/login/adminlogin"]] },
                            ].map(({ heading, links }) => (
                                <div key={heading}>
                                    <h4 style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>{heading}</h4>
                                    {links.map(([label, href]) => (
                                        <div key={label} style={{ marginBottom: "0.6rem" }}>
                                            <a
                                                href={href}
                                                style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                                                onMouseEnter={e => e.currentTarget.style.color = "#a5b4fc"}
                                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                                                onClick={href.startsWith("/") ? (e) => { e.preventDefault(); navigate(href); } : undefined}
                                            >
                                                {label}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem 2rem", textAlign: "center" }}>
                        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
                            © 2026 EduERP · All rights reserved · Built with ❤️ for education
                        </p>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default LandingPage;