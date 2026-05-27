import { useState } from "react";
import { COMPANY_VALUES } from "../data";
import { Compass, Sparkles, Building2, Shield, Calendar, Users, Award, Landmark } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"heritage" | "values">("heritage");

  return (
    <section id="heritage" className="relative w-full py-24 md:py-32 bg-slate-950 border-t border-white/5">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3.5xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full font-mono text-[9px] tracking-widest text-gold-400 uppercase">
            <Landmark className="w-3.5 h-3.5" />
            <span>Corporate Heritage Profile</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Andhra Pradesh's <br />
            <span className="italic font-normal text-gold-300">Legacy of Exquisite Craft</span>
          </h2>
          <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl">
            Established on structural transparency and uncompromising material durability. Under the leadership of Vishva Interiors, we engineer premium glass, aluminum, and metallic concepts that last.
          </p>
        </div>

        {/* Tab Selector buttons */}
        <div className="flex items-center gap-4 mb-12 border-b border-white/5 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("heritage")}
            className={`pb-4 px-2 text-xs tracking-widest uppercase font-semibold transition-all relative ${
              activeTab === "heritage" ? "text-gold-400 font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Our Journey &amp; Legacy
            {activeTab === "heritage" && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab("values")}
            className={`pb-4 px-2 text-xs tracking-widest uppercase font-semibold transition-all relative ${
              activeTab === "values" ? "text-gold-400 font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            The Tenets Of Luxury
            {activeTab === "values" && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400" />
            )}
          </button>
        </div>

        {activeTab === "heritage" ? (
          /* TAB 1: HERITAGE TIMELINE SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Premium Collage / Double Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 rounded-2.5xl overflow-hidden border border-white/10 group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600"
                  alt="Glass Railing Heritage"
                  className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating caption pointing to Rajahmundry starting */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest font-semibold block">FOUNDING OFFICE • 2012</span>
                  <p className="font-serif text-sm text-white font-semibold">The Railing Point &amp; Antiques, Rajahmundry</p>
                </div>
              </div>
            </div>

            {/* Right side: Elegant narrative and core cards */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white tracking-wide">
                  Where Handcrafted Precision Meets Heavy Structural Engineering
                </h3>
                <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                  Our journey began in 2012 in the historic city of Rajahmundry, specializing in high-grade architectural glass under the brand <strong className="text-white">The Railing Point &amp; Antiques</strong>. Harnessing hands-on casting experience and rising market demand, we expanded into Visakhapatnam, consolidating our design houses into the unified elite mark of <strong className="text-gold-400">Vishva Interiors</strong>.
                </p>
                <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                  Today, we deliver complex, thermally broken aluminum system windows, smart switchable glass screens, titanium PVD partitions, solid custom-cast heavy brass architectural pull handles, and deep live-edge epoxy river slabs.
                </p>
              </div>

              {/* Timeline checkpoints */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <span className="font-serif text-gold-400 font-bold text-lg md:text-xl shrink-0 mt-0.5">2012</span>
                  <div className="space-y-1">
                    <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wide">Founding Era</h5>
                    <span className="block font-sans text-xs text-gray-400">Launched glass railing fabrications in Rajahmundry. Built structural mastery.</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <span className="font-serif text-gold-400 font-bold text-lg md:text-xl shrink-0 mt-0.5">2022</span>
                  <div className="space-y-1">
                    <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wide">Brand Unification</h5>
                    <span className="block font-sans text-xs text-gray-400">Consolidated under Vishva Interiors in Visakhapatnam. Introduced aluminum casing and luxury PVD systems.</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-serif text-gold-400 font-bold text-lg md:text-xl shrink-0 mt-0.5">2026</span>
                  <div className="space-y-1">
                    <h5 className="font-sans font-bold text-white text-xs md:text-sm uppercase tracking-wide">Luxury Dominance</h5>
                    <span className="block font-sans text-xs text-gray-400">Andhra Pradesh's preferred architecture partner, providing full-warranty, high-definition interior ecosystems.</span>
                  </div>
                </div>
              </div>

              {/* Strategic Walkthrough of Decade of Growth, Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest font-semibold block">A DECADE OF GROWTH</span>
                  <p className="font-sans text-[11px] text-gray-300 leading-relaxed font-light">
                    From specialized glass railing casting in East Godavari to comprehensive premium interior spaces in Visakhapatnam. Delivering timeless heavy structural mastery.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest font-semibold block">OUR MISSION</span>
                  <p className="font-sans text-[11px] text-gray-300 leading-relaxed font-light">
                    To create refined interior and exterior spaces by delivering premium-quality products, exceptional craftsmanship and seamless service, ensuring every project reflects elegance and durability.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest font-semibold block">OUR VISION</span>
                  <p className="font-sans text-[11px] text-gray-300 leading-relaxed font-light">
                    To be a leading luxury interior and exterior brand in Andhra Pradesh, recognized for sophisticated design, uncompromising quality and trusted client relationships.
                  </p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* TAB 2: COMPANY VALUES CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border-white/5 p-6 hover:border-gold-500/30 transition-all duration-300 shadow-xl space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-400/20 font-mono text-xs text-gold-400">
                      0{idx + 1}
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
                      {val.accentTitle}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                    {val.title}
                  </h4>
                  
                  <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-gold-550 flex items-center gap-1.5 uppercase border-t border-white/5 pt-4">
                  <span>UNCOMPROMISING SYSTEM STANDARD</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
