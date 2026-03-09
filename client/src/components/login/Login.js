import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="app-bg min-h-screen flex items-center justify-center p-6">
      <div className="surface-panel w-full max-w-5xl rounded-3xl p-10">
        <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome to <span className="brand-text">EduERP</span>
            </h1>
            <p className="text-muted mt-2">
              Choose your portal to continue.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Student",
              desc: "Subjects, attendance, results, and profile.",
              to: "/login/studentlogin",
              icon: "🎒",
            },
            {
              title: "Faculty",
              desc: "Attendance, tests, marks upload, and classes.",
              to: "/login/facultylogin",
              icon: "🧑‍🏫",
            },
            {
              title: "Admin",
              desc: "Full control over departments, users, and notices.",
              to: "/login/adminlogin",
              icon: "🛡️",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="surface-card rounded-2xl p-7 border border-white/10 hover:border-indigo-500/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl btn-brand flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  {c.icon}
                </div>
                <h2 className="text-xl font-bold">{c.title}</h2>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {c.desc}
              </p>
              <Link
                type="button"
                to={c.to}
                className="btn-brand inline-flex items-center justify-center h-11 px-5 rounded-xl text-white font-semibold hover:opacity-95 transition w-full"
              >
                Continue
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
