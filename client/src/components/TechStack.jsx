import { TECH } from "../data/content.js";

export default function TechStack() {
  return (
    <section className="tech">
      <div className="container reveal">
        <p className="tech-title">Technologies we work with</p>
        <div className="tech-list">
          {TECH.map((t) => (
            <span className="chip" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
