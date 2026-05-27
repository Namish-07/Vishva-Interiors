import { Compass, Mail, Phone, MapPin, Landmark, ArrowUp, ArrowRight, Shield } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Decorative lighting */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-600/5 rounded-full blur-3.5xl pointer-events-none" />

      <div className="max-w-full px-6 md:px-16 xl:px-24 relative z-10">
        
        {/* Core Quick Grids linking modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/5">
          
          {/* Col 1: Brand & Narrative */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              onClick={() => onScrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <a 
                href="https://maps.app.goo.gl/6EDexhSqfoHztf4X9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="View Store Location on Google Maps"
                className="w-10 h-10 rounded-lg bg-gradient-to-tr from-gold-600 to-gold-400 p-[1px] flex items-center justify-center transition-transform hover:rotate-12"
              >
                <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-gold-400 animate-spin-slow" />
                </div>
              </a>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest text-white uppercase">
                  Vishva
                </span>
                <span className="font-mono text-[9px] tracking-[0.35em] text-gold-500 uppercase font-light">
                  Interiors
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
              Andhra Pradesh's premier architectural glass, aluminum engineering, PVD partitions, cast bronze monuments, and burled wood epoxy resin artisans. Fusing luxury art with absolute load safety standards.
            </p>

            <div className="flex items-center gap-3.5 text-xs font-mono text-gray-500 uppercase">
              <Landmark className="w-4 h-4 text-gold-500" />
              <span>ESTD 2012 • VISAKHAPATNAM HQ</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              Company
            </h5>
            <ul className="text-xs text-gray-400 space-y-3 font-sans">
              <li>
                <button type="button" onClick={() => onScrollToSection("home")} className="hover:text-gold-400 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("services")} className="hover:text-gold-400 transition-colors">
                  Service Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("portfolio")} className="hover:text-gold-400 transition-colors">
                  Client Portfolio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("heritage")} className="hover:text-gold-400 transition-colors">
                  Heritage Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product categories */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              Engineering Specialties
            </h5>
            <ul className="text-xs text-gray-400 space-y-3 font-sans">
              <li>
                <button type="button" onClick={() => onScrollToSection("services")} className="hover:text-gold-400 transition-colors">
                  Laminated Glass Railings
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("services")} className="hover:text-gold-400 transition-colors">
                  Bioclimatic Motorized Pergolas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("services")} className="hover:text-gold-400 transition-colors">
                  Titanium PVD Partitions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollToSection("services")} className="hover:text-gold-400 transition-colors">
                  Live-Edge Resin River Tables
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              Exclusive Publications
            </h5>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Subscribe to receive catalog updates, technical data, and styling guides from our chief architect.
            </p>
            <div className="flex bg-slate-950 border border-white/10 rounded-xl p-1 items-center max-w-sm">
              <input
                type="email"
                placeholder="Exquisite Email..."
                className="bg-transparent text-xs text-white pl-3 pr-2 py-2 flex-1 focus:outline-none min-w-0 placeholder-gray-600"
              />
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-gold-500 hover:bg-gold-400 text-white flex items-center justify-center flex-shrink-0 transition-all"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-gray-500 w-full uppercase">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>© {new Date().getFullYear()} Vishva Interiors. All rights reserved.</span>
            <span className="hidden md:inline text-gray-800">|</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-gold-500" />
              Structural Warranties Enforced
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-gold-400">Security Privacy</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-gold-400">Terms of Alignment</span>
            <span>•</span>
            
            {/* Scroll back up Button */}
            <button
              type="button"
              onClick={handleScrollTop}
              className="p-2.5 rounded-lg border border-white/10 bg-slate-900 text-gold-400 hover:text-white hover:border-gold-400 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
