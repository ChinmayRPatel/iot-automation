import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import { NAV_LINKS } from "../data/content.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary btn-sm" onClick={close}>
            Start a project
          </a>
        </nav>

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
