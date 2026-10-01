import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { FEATURED_PROJECT as F, PROJECTS, PROJECT_STATUS } from "../data/content.js";

function StatusPill({ status }) {
  const s = PROJECT_STATUS[status];
  return (
    <span className="status-pill" style={{ "--c": s.color }}>
      <span className="status-dot"></span>
      {s.label}
    </span>
  );
}

export default function Projects() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          eyebrow="Projects & R&D"
          title="What we are building"
          text="Real automation projects we are researching and developing, with AI, cameras, sensors and machines working together."
        />

        {/* ---------- Featured project ---------- */}
        <article className="featured reveal">
          <div className="featured-info">
            <div className="featured-top">
              <span className="featured-tag">⭐ Featured project</span>
              <StatusPill status={F.status} />
            </div>
            <h3>🥔 {F.title}</h3>
            <p className="featured-summary">{F.summary}</p>

            <ol className="flow-chips">
              {F.flow.map((step, i) => (
                <li key={step}>
                  <span>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <ul className="check-list compact">
              {F.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <div className="tech-list left">
              {F.tech.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>

            <p className="rnd-note">🔬 {F.note}</p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setShowDemo(true)}>
                ▶ Try live simulation
              </button>
              <a className="btn btn-ghost" href={F.demo} target="_blank" rel="noreferrer">
                Open full screen ↗
              </a>
            </div>
          </div>

          <div className="demo-frame">
            <div className="flow-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="flow-title">potato-grading-simulation</span>
              <span className="live-pill">● LIVE DEMO</span>
            </div>
            {showDemo ? (
              <iframe src={F.demo} title="Potato grading line simulation" loading="lazy"></iframe>
            ) : (
              <button className="demo-placeholder" onClick={() => setShowDemo(true)}>
                <span className="play">▶</span>
                <span>Click to run the interactive grading line</span>
                <small>Adjust belt speed, defect rate and camera accuracy</small>
              </button>
            )}
          </div>
        </article>

        {/* ---------- Other projects ---------- */}
        <h3 className="sub-head reveal">More automation projects in our pipeline</h3>
        <div className="grid cards-3">
          {PROJECTS.map((p) => (
            <article className="card project-card reveal" key={p.title}>
              <div className="project-top">
                <div className="card-icon">{p.icon}</div>
                <StatusPill status={p.status} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="partner-box reveal">
          <div>
            <h3>Want one of these for your plant or farm?</h3>
            <p>We are looking for pilot partners. Share your requirement and we’ll build it with you.</p>
          </div>
          <a href="#contact" className="btn btn-primary">Become a pilot partner</a>
        </div>
      </div>
    </section>
  );
}
