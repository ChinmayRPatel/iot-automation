import SectionHead from "./SectionHead.jsx";
import { SERVICES } from "../data/content.js";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          eyebrow="What we do"
          title="AI-powered IoT services"
          text="Hardware, software and AI working together to solve real problems."
        />
        <div className="grid cards-3">
          {SERVICES.map((s) => (
            <article className="card reveal" key={s.title}>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
