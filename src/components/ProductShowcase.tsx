import { useState } from "react";
import { PRODUCT_CATEGORIES } from "../data";
import { Sparkles, ArrowDownRight, Layers, Sliders, ChevronDown, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import WordReveal from "./WordReveal";

interface ProductShowcaseProps {
  onSelectCategoryFilter: (catId: string) => void;
}

export default function ProductShowcase({ onSelectCategoryFilter }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const [expandedSubMap, setExpandedSubMap] = useState<Record<string, boolean>>({});

  const toggleSub = (subId: string) => {
    setExpandedSubMap(prev => ({
      ...prev,
      [subId]: !prev[subId]
    }));
  };

  const selectedCategory = PRODUCT_CATEGORIES.find((c) => c.id === activeCategory) || PRODUCT_CATEGORIES[0];

  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5">
      {/* Decorative side mesh or light */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3.5xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3.5xl pointer-events-none" />

      <ScrollReveal className="max-w-full px-6 md:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-5 h-5 text-gold-500 transform -rotate-90" />
              <span className="font-mono text-xs text-gold-400 tracking-widest uppercase font-medium">Bespoke Architectural Range</span>
            </div>
            <WordReveal 
              as="h2"
              text="Materials & Engineering Detailed Services"
              className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            />
          </div>
          <WordReveal
            as="p"
            text="Our specialized production yards in Visakhapatnam handle materials with micro-precision. Select a category below to explore technical drawings, sub-ranges, and live installations."
            className="font-sans text-gray-400 text-sm md:text-base leading-relaxed max-w-md block"
            staggerDelay={0.01}
          />
        </div>

        {/* Category Toggles Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin border-b border-white/5 mb-12">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-4 rounded-xl border text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 border-gold-400 text-white shadow-lg shadow-gold-500/20"
                    : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15 text-gray-400 hover:text-gray-200"
                }`}
              >
                <Layers className={`w-4 h-4 ${isActive ? "text-white" : "text-gold-500"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left panel - High Resolution Visual Callout with Zoom effect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-2xl border border-white/5 aspect-4/3 lg:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <img
                src={selectedCategory.coverImage}
                alt={selectedCategory.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                <span className="font-mono text-[9px] tracking-widest uppercase text-gold-400">Featured System Detail</span>
                <h4 className="font-serif text-xl font-bold text-white tracking-wide">{selectedCategory.name}</h4>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4">
              <h5 className="font-serif text-white font-semibold">Quality &amp; Compliance Standards</h5>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Every unit in this directory undergoes thorough hydrostatic, high-wind load capacity, and micro-metric surface finishes alignment testing directly in Andhra Pradesh.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 font-mono text-[10px] text-gold-400">IS 2879 COMPLIANT</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 font-mono text-[10px] text-gold-400">100% LEAD-FREE</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 font-mono text-[10px] text-gold-400">SO9001 SYSTEM</span>
              </div>
            </div>
          </div>

          {/* Right panel - Dynamic Accordion of Subcategories and details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2 mb-6">
              <span className="font-mono text-xs text-gold-500 uppercase tracking-widest">Engineering Frameworks</span>
              <p className="font-sans text-gray-300 text-sm leading-relaxed">{selectedCategory.description}</p>
            </div>

            <div className="space-y-4">
              {selectedCategory.subcategories.map((sub, idx) => {
                const isExpanded = expandedSubMap[sub.id] ?? (idx === 0);
                return (
                  <div
                    key={sub.id}
                    className={`rounded-2xl transition-all duration-300 border ${
                      isExpanded
                        ? "bg-slate-900/60 border-gold-500/30 shadow-xl"
                        : "bg-white/5 hover:bg-white/10 border-white/5"
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs ${
                          isExpanded ? "bg-gold-500 text-white" : "bg-white/5 text-gold-500"
                        }`}>
                          0{idx + 1}
                        </div>
                        <h4 className="font-serif text-sm md:text-base font-bold tracking-wide text-white transition-colors hover:text-gold-400">
                          {sub.name}
                        </h4>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180 text-gold-400" : ""}`} />
                    </button>

                    {/* Expandable Panel */}
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[350px] pb-6 px-6 border-t border-white/5 pt-4" : "max-h-0"}`}>
                      <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
                        {sub.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-6 mb-6">
                        <div className="space-y-2">
                          <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Typical Applications</span>
                          <span className="block font-sans text-xs text-white">Commercial Lobbies, High-rise Spandrels, Premium Residential Balconies</span>
                        </div>
                        <div className="space-y-2">
                          <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Key Advantage</span>
                          <span className="block font-sans text-xs text-gold-400 font-semibold">Extremely solid structural core with perfect bespoke styling</span>
                        </div>
                      </div>

                      {/* CTA inside accordion linking back to the major gallery! */}
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-gold-500" />
                          Complete post-installation alignment inspection included
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectCategoryFilter(sub.id)}
                          className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-gold-400 hover:text-gold-300 tracking-wider uppercase transition-colors"
                        >
                          Show Installations
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
