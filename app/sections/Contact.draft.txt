"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";

type FormData = { name: string; email: string; message: string };
type Status = "idle" | "loading" | "success" | "error";

const inputBase = `
  w-full bg-[#0f0f1c] border border-white/8 rounded-xl px-4 py-3.5
  text-slate-200 text-sm placeholder:text-slate-600
  focus:outline-none focus:border-indigo-500/60 focus:bg-[#0f0f22]
  transition-all duration-200
`;

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Khushi",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      void err;
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-8 md:px-24 xl:px-40 bg-[#08080f]">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-indigo-500" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-indigo-400"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Heading + Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              Let&apos;s build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                together.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Whether it&apos;s an internship opportunity, a collaboration, or just a conversation
              about design and code — my inbox is open.
            </p>

            <div className="space-y-3">
              <SocialCard
                href="mailto:khuship2708@gmail.com"
                label="Email"
                value="khuship2708@gmail.com"
                icon={<EmailIcon />}
              />
              <SocialCard
                href="http://www.linkedin.com/in/khushi-patel-85a994274"
                label="LinkedIn"
                value="Khushi Patel"
                icon={<LinkedinIcon />}
                external
              />
              <SocialCard
                href="https://github.com/Khushi-Patel-code"
                label="GitHub"
                value="Khushi-Patel-code"
                icon={<GithubIcon />}
                external
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="bg-[#0f0f1c] border border-emerald-500/30 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                >
                  Message sent!
                </h3>
                <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6 md:p-8 space-y-5"
              >
                <div>
                  <label
                    className="block text-xs text-slate-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-slate-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-slate-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity or project..."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p
                    className="text-red-400 text-sm"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <Button
                  text={status === "loading" ? "Sending..." : "Send Message"}
                  type="submit"
                  variant="secondary"
                  disabled={status === "loading"}
                  className="w-full"
                />
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialCard({
  href, label, value, icon, external = false,
}: {
  href: string; label: string; value: string; icon: React.ReactNode; external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 bg-[#0f0f1c] border border-white/6 rounded-xl hover:border-indigo-500/30 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
          {label}
        </div>
        <div className="text-sm text-slate-300 group-hover:text-white transition-colors">{value}</div>
      </div>
    </a>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
