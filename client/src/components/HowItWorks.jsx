import SectionHead from "./SectionHead.jsx";
import { STEPS } from "../data/content.js";

export default function HowItWorks() {
  return (
    <section className="section alt" id="how">
      <div className="container">
        <SectionHead
          eyebrow="Process"
          title="How it works"
          text="From your idea to a working, connected device in four simple steps."
        />
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step reveal" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
