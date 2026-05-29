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
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryFilterId, setGalleryFilterId] = useState("");
  const [preFilledInterest, setPreFilledInterest] = useState("");
  const [preFilledMessage, setPreFilledMessage] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(15 < 20 ? "dark" : "light"); // fallback initial
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const targetId = sectionId === "contact" ? "enquiry-form" : sectionId;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      let headerOffset = 100;
      if (sectionId === "home") {
        headerOffset = 0;
      } else if (sectionId === "portfolio") {
        headerOffset = 140; // Roomy offset to see the portfolio title and top selections clearly
      } else if (sectionId === "enquiry-form" || sectionId === "contact") {
        headerOffset = 135; // Roomy headroom to view the form header perfectly
      }
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Connects Product Showcase to Portfolio Gallery Filter
  const handleSelectCategoryFilter = (subCatId: string) => {
    setGalleryFilterId(subCatId);
    // Use timeout to let DOM re-render the filtered layout before scrolling
    setTimeout(() => {
      const portfolioElem = document.getElementById("portfolio-filters");
      if (portfolioElem) {
        const headerOffset = 110; // Plentiful offset to see the sub-systems filters clearly under the header bar
        const elementPosition = portfolioElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 120);
  };

  // Connects Portfolio Lightbox Enquiry to Contact Form Pre-fill
  const handleSelectProjectForEnquiry = (projectTitle: string) => {
    setPreFilledInterest("glass"); // default to glass or general
    setPreFilledMessage(
      `Hi! I am extremely interested in the following signature project design: "${projectTitle}". Please provide raw materials compliance details, custom dimension sizing options, and an estimated quotation sheet for a similar setup.`
    );
    setTimeout(() => {
      const contactElem = document.getElementById("enquiry-form");
      if (contactElem) {
        const headerOffset = 135; // Roomy headroom so header is fully visible below the sticky bar
        const elementPosition = contactElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  // Connects Interactive Sandbox Configurator specs to Contact Form Pre-fill
  const handleSendConfigToArchitect = (configSummary: string) => {
    setPreFilledInterest("glass"); // general
    setPreFilledMessage(
      `Greetings! I have experimented with your Interactive Studio Configurator and compiled a desired specification package:\n\n${configSummary}\n\nPlease let me know if an on-site design review in Andhra Pradesh can be scheduled to draft these combinations.`
    );
    setTimeout(() => {
      const contactElem = document.getElementById("enquiry-form");
      if (contactElem) {
        const headerOffset = 135; // Roomy headroom to showcase the booking details cleanly
        const elementPosition = contactElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
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
        className={`relative min-h-screen bg-transparent ${theme === "light" ? "text-slate-900" : "text-gray-100"} flex flex-col font-sans transition-all duration-500 ease-out ${
          isLoading 
            ? "opacity-0 pointer-events-none invisible scale-98 blur-md will-change-transform" 
            : "opacity-100 visible blur-0"
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
        onEnquireNow={() => handleScrollToSection("enquiry-form")} 
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

      {/* 7. Contact Enquiry Form Booking */}
      <ContactForm 
        preFilledInterest={preFilledInterest} 
        preFilledMessage={preFilledMessage} 
      />

      {/* 8. Global License Footers */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Floating Scroll To Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full border border-gold-400 bg-slate-950/90 text-gold-400 hover:text-white hover:bg-gold-500 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
