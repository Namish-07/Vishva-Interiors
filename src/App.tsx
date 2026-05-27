import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import PortfolioGallery from "./components/PortfolioGallery";
import MaterialConfigurator from "./components/MaterialConfigurator";
import AboutSection from "./components/AboutSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AnimatedBackgroundPattern from "./components/AnimatedBackgroundPattern";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryFilterId, setGalleryFilterId] = useState("");
  const [preFilledInterest, setPreFilledInterest] = useState("");
  const [preFilledMessage, setPreFilledMessage] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(15 < 20 ? "dark" : "light"); // fallback initial

  // Robust client-only theme load to avoid SSR type mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Connects Product Showcase to Portfolio Gallery Filter
  const handleSelectCategoryFilter = (subCatId: string) => {
    setGalleryFilterId(subCatId);
    const portfolioElem = document.getElementById("portfolio");
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Connects Portfolio Lightbox Enquiry to Contact Form Pre-fill
  const handleSelectProjectForEnquiry = (projectTitle: string) => {
    setPreFilledInterest("glass"); // default to glass or general
    setPreFilledMessage(
      `Hi! I am extremely interested in the following signature project design: "${projectTitle}". Please provide raw materials compliance details, custom dimension sizing options, and an estimated quotation sheet for a similar setup.`
    );
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Connects Interactive Sandbox Configurator specs to Contact Form Pre-fill
  const handleSendConfigToArchitect = (configSummary: string) => {
    setPreFilledInterest("glass"); // general
    setPreFilledMessage(
      `Greetings! I have experimented with your Interactive Studio Configurator and compiled a desired specification package:\n\n${configSummary}\n\nPlease let me know if an on-site consultation in Andhra Pradesh can be scheduled to draft these combinations.`
    );
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Intersection Observer to update active navigation tabs dynamically based on scroll focus
  useEffect(() => {
    const sections = ["home", "services", "studio", "portfolio", "heritage", "contact"];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.18 } // trigger when 18% of section is visible
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="page-preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div 
        className={`relative min-h-screen bg-transparent ${theme === "light" ? "text-slate-900" : "text-gray-100"} flex flex-col font-sans transition-all duration-500 ease-out will-change-transform ${
          isLoading 
            ? "opacity-0 pointer-events-none invisible scale-98 blur-md" 
            : "opacity-100 visible scale-100 blur-0"
        }`}
      >
        {/* Animated Architectural & Geometric Scrolling Background */}
        <AnimatedBackgroundPattern />

        {/* 1. Header Bar */}
      <Header 
        activeSection={activeSection} 
        onScrollToSection={handleScrollToSection} 
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      {/* 2. Panoramic Slider Intro */}
      <Hero 
        onLearnMore={() => handleScrollToSection("services")} 
        onBookConsultation={() => handleScrollToSection("contact")} 
      />

      {/* 3. Detailed Services Accordions */}
      <ProductShowcase 
        onSelectCategoryFilter={handleSelectCategoryFilter} 
      />

      {/* 4. Interactive Material Sandbox Configurator */}
      <MaterialConfigurator 
        onSendConfigToArchitect={handleSendConfigToArchitect} 
      />

      {/* 5. 150+ Portfolio High-Res Galleries and Details Modal */}
      <PortfolioGallery 
        initialSubCategoryId={galleryFilterId} 
        onSelectProjectForEnquiry={handleSelectProjectForEnquiry}
      />

      {/* 6. HeritageTimeline About Block */}
      <AboutSection />

      {/* 7. Contact Consultation Form Booking */}
      <ContactForm 
        preFilledInterest={preFilledInterest} 
        preFilledMessage={preFilledMessage} 
      />

      {/* 8. Global License Footers */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
    </>
  );
}
