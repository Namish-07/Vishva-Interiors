import { useState, useEffect } from "react";
import { Compass, Mail, Phone, Moon, Sun, Menu, X, Sparkles, MapPin } from "lucide-react";
import InteractivePhone from "./InteractivePhone";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollToSection, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Studio", id: "studio" }, // Live Material Studio Configurator
    { label: "Portfolio", id: "portfolio" },
    { label: "Heritage", id: "heritage" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-slate-925/90 backdrop-blur-xl py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-full mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <a 
            href="https://maps.app.goo.gl/6EDexhSqfoHztf4X9"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="View Store Location on Google Maps"
            className="relative w-10 h-10 rounded-lg bg-gradient-to-tr from-gold-600 to-gold-400 p-[1px] flex items-center justify-center transition-transform duration-500 hover:rotate-12"
          >
            <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
              <Compass className="w-5 h-5 text-gold-400 animate-spin-slow" />
            </div>
          </a>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-widest text-white uppercase group-hover:text-gold-400 transition-colors">
              Vishva
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold-500 uppercase font-light">
              Interiors
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs tracking-widest uppercase font-medium transition-all py-2 hover:text-white ${
                    activeSection === item.id
                      ? "text-gold-400 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Quick contact trigger */}
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500 border border-gold-400/20 hover:border-gold-400/50 text-gold-300 hover:text-white font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-gold-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Book Consultation
          </button>
        </nav>

        {/* Mobile menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 font-sans text-[9px] tracking-widest uppercase"
          >
            Consult
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] right-0 w-full h-[calc(100vh-72px)] bg-slate-950/98 backdrop-blur-2xl z-40 border-t border-white/5 flex flex-col p-8 transition-all duration-300">
          <ul className="flex flex-col gap-6 my-auto text-center">
            {navItems.map((item, idx) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-lg font-serif tracking-widest uppercase transition-colors ${
                    activeSection === item.id ? "text-gold-400 font-bold" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Quick contact and location on Drawer Footer */}
          <div className="border-t border-white/5 pt-8 flex flex-col gap-4 text-center mt-auto">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Visakhapatnam, Andhra Pradesh</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <InteractivePhone showIcon={true} />
              </span>
              <span className="flex items-center gap-1 col-span-2">
                <Mail className="w-3.5 h-3.5 text-gold-500" /> contact@vishvainteriors.com
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
