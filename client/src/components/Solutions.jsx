import { useState } from "react";
import SectionHead from "./SectionHead.jsx";
import { SOLUTIONS } from "../data/content.js";

export default function Solutions() {
  const tabs = Object.keys(SOLUTIONS);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="section" id="solutions">
      <div className="container">
        <SectionHead eyebrow="Examples" title="Solutions for every need" />
        <div className="tabs reveal">
          <div className="tab-buttons" role="tablist">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === t}
                className={`tab-btn ${active === t ? "active" : ""}`}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="tab-panel" role="tabpanel" key={active}>
            <ul className="check-list">
              {SOLUTIONS[active].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
