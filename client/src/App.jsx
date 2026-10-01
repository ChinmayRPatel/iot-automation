import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Solutions from "./components/Solutions.jsx";
import TechStack from "./components/TechStack.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useReveal from "./hooks/useReveal.js";

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <HowItWorks />
        <Solutions />
        <TechStack />
        <CtaBanner />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
