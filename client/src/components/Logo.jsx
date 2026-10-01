import { COMPANY } from "../data/content.js";

export default function Logo() {
  return (
    <a href="#home" className="logo">
      <img src="/favicon.svg" alt="" width="28" height="28" />
      <span>
        {COMPANY.name}
        <span className="accent"> {COMPANY.suffix}</span>
      </span>
    </a>
  );
}
