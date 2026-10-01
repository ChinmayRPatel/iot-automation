import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { COMPANY, PROJECT_TYPES, TEAM } from "../data/content.js";

// The form is sent to our own Node.js server (/api/contact),
// which emails it with Gmail. Email settings live in server/.env.

const EMPTY = { name: "", email: "", projectType: PROJECT_TYPES[0], message: "" };
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !isEmail(form.email.trim()) || !form.message.trim()) {
      setStatus({ type: "err", text: "Please fill in your name, a valid email and your message." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus({ type: "ok", text: data.message });
        setForm(EMPTY);
      } else {
        const msg = data.errors ? Object.values(data.errors).join(". ") : data.error;
        setStatus({ type: "err", text: msg || "Could not send your message. Please try again." });
      }
    } catch {
      setStatus({ type: "err", text: "Server not reachable. Is the Node.js server running (npm run dev)?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section alt" id="contact">
      <div className="container narrow">
        <SectionHead
          eyebrow="Contact"
          title="Start your project"
          text="Tell us about your idea and we’ll get back to you within one business day."
        />

        <div className="contact-cards reveal">
          {TEAM.map((t) => (
            <div className="contact-card" key={t.tel}>
              <strong>{t.name}</strong>
              <span className="muted">{t.role}</span>
              <a href={`tel:${t.tel}`}>📞 {t.phone}</a>
              <a href={`https://wa.me/${t.tel.replace("+", "")}`} target="_blank" rel="noreferrer">💬 WhatsApp</a>
            </div>
          ))}
          <div className="contact-card">
            <strong>Email &amp; office</strong>
            <a href={`mailto:${COMPANY.email}`}>✉️ {COMPANY.email}</a>
            <span>📍 {COMPANY.location}</span>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={submit} noValidate>
          <div className="form-row">
            <label>
              Name
              <input name="name" value={form.name} onChange={update} placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required />
            </label>
          </div>
          <label>
            Project type
            <select name="projectType" value={form.projectType} onChange={update}>
              {PROJECT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Tell us about your idea
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={update}
              placeholder="What do you want to build or automate?"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Sending…" : "Send message"}
          </button>
          <p className={`form-status ${status.type}`} role="status">{status.text}</p>
        </form>
      </div>
    </section>
  );
}
