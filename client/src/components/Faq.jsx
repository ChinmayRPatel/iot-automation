import SectionHead from "./SectionHead.jsx";
import { FAQS } from "../data/content.js";

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container narrow">
        <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
        {FAQS.map((f) => (
          <details className="faq reveal" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
