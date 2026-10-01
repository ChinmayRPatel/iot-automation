import Logo from "./Logo.jsx";
import { COMPANY, NAV_LINKS, TEAM } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <address>
            📍 {COMPANY.location}
            <br />
            ✉️ <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            {TEAM.map((t) => (
              <span key={t.tel}>
                📞 <a href={`tel:${t.tel}`}>{t.phone}</a> ({t.name})
                <br />
              </span>
            ))}
          </address>
        </div>
        <nav aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <p>
          © {new Date().getFullYear()} {COMPANY.name} {COMPANY.suffix}, {COMPANY.location}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
