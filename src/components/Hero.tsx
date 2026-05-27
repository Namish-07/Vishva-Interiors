import { useState, useEffect } from "react";
import { ArrowRight, Play, Award, Sparkles, Building2, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onLearnMore: () => void;
  onBookConsultation: () => void;
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1600",
    title: "Sculpting Light & Space",
    subtitle: "PREMIUM GLASS & ALUMINUM RAILINGS",
    description: "Uncompromised safety engineered into minimal visual profiles. Transforming Andhra Pradesh's elite coastal residencies with world-class structural glass systems since 2012."
  },
  {
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=90&w=1600",
    title: "Luminous Titanium Radiance",
    subtitle: "PVD TITANIUM LUXURY ELEMENTS",
    description: "High-end vacuum-plated gold and champagne bronze laser-cut partitions and custom furniture. Designed to reflect elite luxury and withstand the test of time."
  },
  {
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=90&w=1600",
    title: "Nature Cast in Liquid Glass",
    subtitle: "LIVE-EDGE EXOTIC RESIN FURNITURE",
    description: "Luminous, crystal-clear resin pours paired with ancient burled hardwoods. Beautiful bespoke live-edge conference slabs, dining tables, and backlightable focal points."
  }
];

export default function Hero({ onLearnMore, onBookConsultation }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen bg-slate-950 flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-out gpu-accelerated ${
            idx === currentSlide ? "opacity-35 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
          }`}
          style={{ transition: "opacity 1s ease-out, transform 6s ease-out" }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover gpu-accelerated"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 md:pt-24 flex flex-col lg:flex-row gap-12 lg:items-center">
        {/* Left text column */}
        <div className="flex-1 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 font-mono text-[9px] tracking-widest uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTD 2012 • VISAKHAPATNAM</span>
          </div>

          {/* Text sliding animation wrapper - absolute layering for ultra-smooth GPU-accelerated transition */}
          <div className="relative min-h-[220px] xs:min-h-[200px] sm:min-h-[180px] md:min-h-[160px] lg:min-h-[220px] w-full select-none">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-x-0 top-0 transition-all duration-1000 ease-in-out gpu-accelerated flex flex-col justify-start ${
                  idx === currentSlide
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto z-10"
                    : "opacity-0 -translate-y-2 scale-98 pointer-events-none z-0"
                }`}
              >
                <h5 className="font-mono text-xs md:text-sm tracking-[0.4em] text-gold-400 uppercase font-light mb-3">
                  {slide.subtitle}
                </h5>
                <h1 className="font-serif text-3xl md:text-5xl xl:text-6.5xl font-bold tracking-tight text-white leading-[1.1] mb-4">
                  {slide.title}
                </h1>
                <p className="font-sans text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onBookConsultation}
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-650 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-xl hover:shadow-gold-500/20"
            >
              Start Consulting
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onLearnMore}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-200 transition-all font-sans text-xs tracking-widest uppercase"
            >
              Explore Products
            </button>
          </div>
        </div>

        {/* Right content - Elite Architectural Counters Card */}
        <div className="w-full lg:w-[400px] xl:w-[460px] glass-panel rounded-2xl border-white/5 p-6 md:p-8 space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
          
          <h4 className="font-serif text-lg text-white font-bold tracking-wider border-b border-white/5 pb-4">
            Andhra Pradesh's Premier Interior Solutions
          </h4>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <span className="block font-serif text-2xl md:text-3.5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                14+ Years
              </span>
              <span className="block font-sans text-[11px] text-gray-400 uppercase tracking-widest leading-snug">
                Bespoke Craft Heritage
              </span>
            </div>

            <div className="space-y-2">
              <span className="block font-serif text-2xl md:text-3.5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                1000+
              </span>
              <span className="block font-sans text-[11px] text-gray-400 uppercase tracking-widest leading-snug">
                Completed Spaces
              </span>
            </div>

            <div className="space-y-2">
              <span className="block font-serif text-2xl md:text-3.5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                150+
              </span>
              <span className="block font-sans text-[11px] text-gray-400 uppercase tracking-widest leading-snug">
                Unique Galleries
              </span>
            </div>

            <div className="space-y-2">
              <span className="block font-serif text-2xl md:text-3.5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                5-Year
              </span>
              <span className="block font-sans text-[11px] text-gray-400 uppercase tracking-widest leading-snug">
                Full Warranty Guard
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Registered luxury brand with custom AP fabrication yards</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Award className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Collaborating with world-class components brands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-25 flex items-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
