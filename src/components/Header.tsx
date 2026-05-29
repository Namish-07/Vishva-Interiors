import { useState, useEffect } from "react";
import { Compass, Mail, Phone, Moon, Sun, Menu, X, Sparkles, MapPin } from "lucide-react";
import InteractivePhone from "./InteractivePhone";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export default function Header({ 
  onScrollToSection, 
  activeSection,
  theme = "dark",
  onToggleTheme
}: HeaderProps) {
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
          <div 
            title="Vishva Interiors Logo"
            className="relative w-12 h-10 select-none transition-transform duration-300 hover:scale-110 flex items-center justify-center bg-transparent"
          >
            <svg 
              viewBox="0 0 100 80" 
              className="w-full h-full text-white"
              fill="currentColor"
              aria-label="Vishva Logo"
            >
              <defs>
                <linearGradient id="logo-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop offset="30%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="logo-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="70%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Top Bar (shifted right, fades from left to right) */}
              <rect 
                x="22" 
                y="12" 
                width="73" 
                height="14" 
                rx="1"
                fill="url(#logo-fade-right)" 
              />
              {/* Middle Bar (shifted left, fades from right to left) */}
              <rect 
                x="5" 
                y="33" 
                width="73" 
                height="14" 
                rx="1"
                fill="url(#logo-fade-left)" 
              />
              {/* Bottom Bar (shifted right, fades from left to right) */}
              <rect 
                x="22" 
                y="54" 
                width="73" 
                height="14" 
                rx="1"
                fill="url(#logo-fade-right)" 
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-widest text-white uppercase group-hover:text-gold-400 transition-colors">
              Vishva
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold-500 uppercase font-light">
              Interiors & Antiques
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
            onClick={() => handleNavClick("enquiry-form")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500 border border-gold-400/20 hover:border-gold-400/50 text-gold-300 hover:text-white font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-gold-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Enquire Now
          </button>

          {/* Premium Theme Switcher */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 ml-1 rounded-full border border-gold-400/20 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden group shadow-md"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
              )}
            </button>
          )}
        </nav>

        {/* Mobile menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-gold-400/20 bg-gold-500/10 text-gold-400 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md"
              title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-gold-400" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => handleNavClick("enquiry-form")}
            className="px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 font-sans text-[9px] tracking-widest uppercase font-medium"
          >
            Enquire
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
