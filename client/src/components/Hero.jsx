import { FLOW_STEPS, HERO_POINTS } from "../data/content.js";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-text reveal">
          <span className="badge">AI + IoT Automation · Ahmedabad, Gujarat</span>
          <h1>
            Smart devices.
            <br />
            <span className="gradient-text">Smarter with AI.</span>
          </h1>
          <p className="lead">
            IoT Automation is an Ahmedabad-based company that connects hardware and
            software with artificial intelligence to build IoT and industrial automation
            solutions for homes, factories, farms and your own unique projects.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Start your project</a>
            <a href="#how" className="btn btn-ghost">See how it works →</a>
          </div>
          <ul className="hero-points">
            {HERO_POINTS.map((p) => (
              <li key={p}>✔ {p}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual reveal" aria-hidden="true">
          <div className="flow-card">
            <div className="flow-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="flow-title">Smart factory — live</span>
              <span className="live-pill">● LIVE</span>
            </div>
            {FLOW_STEPS.map((step, i) => (
              <div key={step.text}>
                <div className={`flow-step ${step.type}`} style={{ animationDelay: `${i}s` }}>
                  <span className="step-icon">{step.icon}</span> {step.text}
                </div>
                {i < FLOW_STEPS.length - 1 && <div className="flow-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
