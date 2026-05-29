import { useState } from "react";
import { Sliders, Eye, Sparkles, Send, CheckCircle2, RefreshCw, Compass, ShieldCheck, Gem, Power, Zap, Layers, Grid, ChevronRight } from "lucide-react";
import InteractivePhone from "./InteractivePhone";
import ScrollReveal from "./ScrollReveal";
import WordReveal from "./WordReveal";

interface MaterialConfiguratorProps {
  onSendConfigToArchitect: (configSummary: string, categoryId?: string) => void;
}

// SIMULATOR 1: ARCHITECTURAL GLASS DESIGNS
const GLASS_TYPES = [
  { 
    id: "clear", 
    name: "Absolute Clear Glass Pane", 
    color: "rgba(224, 242, 254, 0.15)", 
    opacity: 0.2, 
    border: "rgba(14, 165, 233, 0.4)", 
    desc: "12mm premium low-iron toughened pane providing ultra-clear optical transparency, ideal for expansive minimal partitions." 
  },
  { 
    id: "frosted", 
    name: "Acid-Frosted Satin Privacy", 
    color: "rgba(241, 245, 249, 0.75)", 
    opacity: 0.8, 
    border: "rgba(255, 255, 255, 0.95)", 
    desc: "Smooth acid-etched glass scattering incident light to assure absolute silhouette privacy while filtering a soft radiant glow." 
  },
  { 
    id: "fluted", 
    name: "Ribbed Fluted Glass Pane", 
    color: "rgba(224, 242, 254, 0.28)", 
    opacity: 0.35, 
    border: "rgba(186, 230, 253, 0.65)", 
    pattern: "repeating-linear-gradient(90deg, rgba(255,255,255, 0.12) 0px, rgba(255,255,255, 0.12) 4px, transparent 4px, transparent 12px)", 
    desc: "Architectural vertical-reeded stripes generating sophisticated shadows, perfect for modern conference dividers." 
  },
  { 
    id: "switchable", 
    name: "Smart Electrochromic Glass", 
    color: "rgba(203, 213, 225, 0.42)", 
    opacity: 0.38, 
    border: "rgba(148, 163, 184, 0.7)", 
    desc: "PDLC switchable smart glass that transitions from an opaque white privacy block to clear transparency on electrical command." 
  },
  { 
    id: "sandwich", 
    name: "Laminated Safety Sandwich", 
    color: "rgba(219, 234, 254, 0.22)", 
    opacity: 0.3, 
    border: "rgba(59, 130, 246, 0.55)", 
    desc: "High-integrity multi-ply safety glass featuring bonded dual tempered layers sandwiching heavy acoustical PVB membranes." 
  },
  { 
    id: "laminated", 
    name: "Fabric Laminated Luxury Canvas", 
    color: "rgba(254, 250, 224, 0.52)", 
    opacity: 0.62, 
    border: "rgba(214, 191, 132, 0.75)", 
    pattern: "repeating-linear-gradient(45deg, transparent 0px, transparent 2px, rgba(230,220,180, 0.22) 2px, rgba(230,220,180, 0.22) 4px)", 
    desc: "Exquisite gold metallic mesh or woven luxury ivory linen embedded between dual safety tempered glass panes." 
  }
];

// BACKLIGHT OPTIONS FOR GLASS
const GLASS_BACKLIGHTS = [
  { id: "sunset", name: "Amber Sunset Backlight", hex: "#f59e0b", glow: "0 0 45px rgba(245, 158, 11, 0.45)" },
  { id: "aurora", name: "Teal Aurora Backlight", hex: "#14b8a6", glow: "0 0 45px rgba(20, 184, 166, 0.42)" },
  { id: "neutral", name: "Soft Warm Backlight", hex: "#fde047", glow: "0 0 35px rgba(253, 224, 71, 0.32)" },
  { id: "off", name: "Acoustic LEDs Switched Off", hex: "transparent", glow: "none" }
];


// SIMULATOR 2: ALUMINUM ANODISED FINISHES
const ANODISED_FINISHES = [
  { 
    id: "gold", 
    name: "Gold", 
    bg: "linear-gradient(135deg, #eae1c8 0%, #b89f6d 70%, #6e583c 100%)", 
    colorCode: "#b89f6d", 
    desc: "Heavy-duty anodised coating giving a warm gold tone with low-specular grain protection." 
  },
  { 
    id: "rosegold", 
    name: "Rose Gold", 
    bg: "linear-gradient(135deg, #e5b39f 0%, #b27c69 70%, #6e3e2f 100%)", 
    colorCode: "#b27c69", 
    desc: "Exquisite copper-infused rose-gold hue providing modern visual elegance to luxury frames." 
  },
  { 
    id: "champagne", 
    name: "Champagne", 
    bg: "linear-gradient(135deg, #f5f5f4 0%, #a8a29e 70%, #44403c 100%)", 
    colorCode: "#a8a29e", 
    desc: "Extremely understated, soft beige premium champagne finish capturing class for sleek profiles." 
  },
  { 
    id: "black", 
    name: "Black", 
    bg: "linear-gradient(135deg, #334155 0%, #0f172a 80%, #020617 100%)", 
    colorCode: "#1e293b", 
    desc: "Micro-beaded sandblasted matte black anodisation resistant to intense saline air rustic patterns." 
  }
];

// ALUMINUM FRAME PROFILES
const ANODISED_PROFILES = [
  { id: "slim", name: "18mm Ultra-Slim Profile Screen", borderWidth: "2px" },
  { id: "casement", name: "Executive Sound-Stop Casement", borderWidth: "6px" }
];


// SIMULATOR 3: PREMIUM PVD FINISHES
const PVD_FINISHES = [
  { 
    id: "gold_glossy", 
    name: "Gold Glossy", 
    bg: "linear-gradient(135deg, #fffbeb 0%, #facc15 50%, #d97706 100%)", 
    colorCode: "#eab308", 
    isGlossy: true, 
    desc: "Titanium vacuum deposition delivering maximum pristine gold mirror reflections." 
  },
  { 
    id: "gold_matt", 
    name: "Gold Matt", 
    bg: "radial-gradient(circle, #eae1c8 0%, #b89f6d 100%)", 
    colorCode: "#a16207", 
    isGlossy: false, 
    desc: "Refined satin treatment over titanium plating, yielding soft velvet ambient specular reflections." 
  },
  { 
    id: "rosegold_glossy", 
    name: "Rose Gold Glossy", 
    bg: "linear-gradient(135deg, #f7dcd5 0%, #d69f91 45%, #b27a6d 75%, #7a4b40 100%)", 
    colorCode: "#b27a6d", 
    isGlossy: true, 
    desc: "Exquisite copper-rose high-polish metal plating capturing deep warm premium aesthetics." 
  },
  { 
    id: "rosegold_matt", 
    name: "Rose Gold Matt", 
    bg: "radial-gradient(circle, #e7beaf 0%, #b28373 60%, #825647 100%)", 
    colorCode: "#b28373", 
    isGlossy: false, 
    desc: "Brushed rose copper sheet offering anti-fingerprint elegant velvet surfaces." 
  },
  { 
    id: "black_glossy", 
    name: "Black Glossy", 
    bg: "linear-gradient(135deg, #475569 0%, #0f172a 80%, #000000 100%)", 
    colorCode: "#090d16", 
    isGlossy: true, 
    desc: "Bold vacuum carbon-deposition producing deep obsidian black chrome mirror layouts." 
  }
];

// CUSTOM SURFACE TEXTURE OVERLAYS FOR PVD FINISH
const PVD_TEXTURES = [
  { 
    id: "mirror", 
    name: "Super-Mirror Polishing", 
    code: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 100%)",
    size: "100% 100%",
    desc: "A flawless reflective mirror style representing immaculate high-end cladding."
  },
  { 
    id: "hairline", 
    name: "Vertical Fine Hairline Brushed", 
    code: "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)",
    size: "4px 100%",
    desc: "A highly sophisticated micro-brushed continuous hairline grain minimizing reflection glare."
  },
  { 
    id: "ripple", 
    name: "Undulating Water-Ripple Waves", 
    code: "repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0px, transparent 12px, rgba(0,0,0,0.18) 24px, rgba(255,255,255,0.06) 36px)",
    size: "48px 48px",
    desc: "Organic fluid sheet forming beautiful specular light patterns modeled off dynamic wave ripples."
  }
];

export default function MaterialConfigurator({ onSendConfigToArchitect }: MaterialConfiguratorProps) {
  // Top level state to toggle simulators (exactly 3)
  const [selectedSim, setSelectedSim] = useState<"glass" | "aluminum" | "pvd">("glass");

  // State 1: Glass simulator fields
  const [glassType, setGlassType] = useState(GLASS_TYPES[0]);
  const [glassBacklight, setGlassBacklight] = useState(GLASS_BACKLIGHTS[0]);
  const [switchableIsActive, setSwitchableIsActive] = useState(true); // Toggle smart glass

  // State 2: Aluminum Anodised Finish fields
  const [anodisedFinish, setAnodisedFinish] = useState(ANODISED_FINISHES[0]);
  const [anodisedProfile, setAnodisedProfile] = useState(ANODISED_PROFILES[0]);
  const [slidingPercentage, setSlidingPercentage] = useState(40); // 40% open sliding window

  // State 3: PVD Premium Finish fields
  const [pvdFinish, setPvdFinish] = useState(PVD_FINISHES[0]);
  const [pvdTexture, setPvdTexture] = useState(PVD_TEXTURES[0]);
  const [pvdBacklitGlow, setPvdBacklitGlow] = useState(true);

  const [submitted, setSubmitted] = useState(false);

  const resetStudio = () => {
    if (selectedSim === "glass") {
      setGlassType(GLASS_TYPES[0]);
      setGlassBacklight(GLASS_BACKLIGHTS[0]);
      setSwitchableIsActive(true);
    } else if (selectedSim === "aluminum") {
      setAnodisedFinish(ANODISED_FINISHES[0]);
      setAnodisedProfile(ANODISED_PROFILES[0]);
      setSlidingPercentage(40);
    } else if (selectedSim === "pvd") {
      setPvdFinish(PVD_FINISHES[0]);
      setPvdTexture(PVD_TEXTURES[0]);
      setPvdBacklitGlow(true);
    }
    setSubmitted(false);
  };

  const handleSendConfig = () => {
    let configString = "";
    let catId = "glass";

    if (selectedSim === "glass") {
      const smartState = glassType.id === "switchable" ? `\n- Smart Electrochromic State: ${switchableIsActive ? "Transparent (Power ON)" : "Opaque (Power OFF)"}` : "";
      configString = `Glass Products Spec Package:\n- Category: Premium Glass Options\n- Material Option: ${glassType.name}\n- Backlighting Setup: ${glassBacklight.name}${smartState}\n- Design Notes: Custom-sized partition`;
      catId = "glass";
    } else if (selectedSim === "aluminum") {
      configString = `Aluminum Products Spec Package:\n- Category: Aluminum Anodised Finish\n- Anodised Trim: ${anodisedFinish.name}\n- Architectural Profile Frame: ${anodisedProfile.name}\n- Customized Sliding Position: Slider set to ${slidingPercentage}% open`;
      catId = "aluminum";
    } else {
      configString = `PVD Products Spec Package:\n- Category: PVD Architectural Finish\n- Metallic Finish Tone: ${pvdFinish.name}\n- Surface Micro-Texture finish: ${pvdTexture.name}\n- Rear Backlit Glow Accent: ${pvdBacklitGlow ? "Activated" : "Deactivated"}`;
      catId = "pvd";
    }

    onSendConfigToArchitect(configString, catId);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section id="studio" className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5 overflow-hidden">
      {/* Ambient Radial Background Light representing active choices */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-1000 z-0"
        style={{ 
          backgroundColor: 
            selectedSim === "glass" ? (glassBacklight.hex !== "transparent" ? glassBacklight.hex : "#b1843b") :
            selectedSim === "aluminum" ? anodisedFinish.colorCode :
            pvdFinish.colorCode
        }}
      />

      <ScrollReveal className="max-w-full px-6 md:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8 border-b border-white/5 pb-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full font-mono text-[9px] tracking-widest text-gold-400 uppercase">
              <Sliders className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Material Studio</span>
            </div>
            <WordReveal 
              as="h2"
              text="Architectural Material Simulators"
              className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            />
            <WordReveal
              as="p"
              text="Configure customized physical styles below. Synthesize our glass laminates, anodised profiles, or premium Physical Vapor Deposition (PVD) gold textures, and instantly preview realistic 3D representations."
              className="font-sans text-gray-400 text-sm leading-relaxed block"
              staggerDelay={0.01}
            />
          </div>
        </div>

        {/* EXACTLY 3 Tabs representing requested Simulators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Tab 1: Glass */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("glass");
              setSubmitted(false);
            }}
            className={`group text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
              selectedSim === "glass"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900/80 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "glass" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Gem className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "glass" ? "text-gold-300" : "text-white"}`}>
                Glass Products
              </h4>
              <p className="font-sans text-[11px] text-gray-400 leading-normal font-light">
                Clear, Frosted, Fluted, Laminated &amp; Smart Film
              </p>
            </div>
          </button>

          {/* Tab 2: Aluminum Anodised Finish */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("aluminum");
              setSubmitted(false);
            }}
            className={`group text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
              selectedSim === "aluminum"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900/80 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "aluminum" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "aluminum" ? "text-gold-300" : "text-white"}`}>
                Anodised Finish
              </h4>
              <p className="font-sans text-[11px] text-gray-400 leading-normal font-light">
                Extruded Gold, Rosegold, Champagne &amp; Black Satin
              </p>
            </div>
          </button>

          {/* Tab 3: PVD Premium Finish */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("pvd");
              setSubmitted(false);
            }}
            className={`group text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
              selectedSim === "pvd"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900/80 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "pvd" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Grid className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "pvd" ? "text-gold-300" : "text-white"}`}>
                PVD Finish
              </h4>
              <p className="font-sans text-[11px] text-gray-400 leading-normal font-light">
                High-Mirror &amp; Matte Vacuum Ion Titanium Plating
              </p>
            </div>
          </button>
        </div>

        {/* Dynamic Studio Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT CANVASES - Render corresponding simulated frame or panels */}
          <div className="lg:col-span-7 bg-slate-900/50 rounded-3xl border border-white/10 p-6 md:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Visualizer header indicating system */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8 font-mono text-[10px] tracking-wider text-gray-400 uppercase select-none">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gold-400" /> Dynamic Render Joint
              </span>
              <span className="text-gold-400 font-bold opacity-75">
                {selectedSim === "glass" && "SUITE: VISHVA-ARCHITECTURAL-GLASS"}
                {selectedSim === "aluminum" && "SUITE: VISHVA-SASH-ANODISED"}
                {selectedSim === "pvd" && "SUITE: VISHVA-TITANIUM-PVD"}
              </span>
            </div>

            {/* INTERACTIVE COMPRESSED CANVAS AREA */}
            <div className="flex-1 min-h-[350px] md:min-h-[420px] flex items-center justify-center relative p-6">
              
              {/* Backlight halo glow for glass or PVD backlit panel */}
              {selectedSim === "glass" && glassBacklight.hex !== "transparent" && (
                <div 
                  className="absolute w-72 h-72 rounded-full duration-700 ease-out z-0 filter blur-3xl opacity-50"
                  style={{ 
                    backgroundColor: glassBacklight.hex,
                    boxShadow: glassBacklight.glow
                  }}
                />
              )}

              {selectedSim === "pvd" && pvdBacklitGlow && (
                <div 
                  className="absolute w-80 h-80 rounded-full duration-700 ease-out z-0 filter blur-[40px] opacity-45"
                  style={{ 
                    backgroundColor: pvdFinish.colorCode,
                    boxShadow: `0 0 50px ${pvdFinish.colorCode}`
                  }}
                />
              )}

              {/* Grid backdrop helper bounds */}
              <div className="absolute inset-4 rounded-xl border border-white/5 bg-slate-950/25 z-0 pointer-events-none flex flex-col justify-between p-4 selector-backdrop">
                <div className="flex justify-between">
                  <div className="w-3.5 h-3.5 border-t border-l border-white/20" />
                  <div className="w-3.5 h-3.5 border-t border-r border-white/20" />
                </div>
                <div className="flex justify-between">
                  <div className="w-3.5 h-3.5 border-b border-l border-white/20" />
                  <div className="w-3.5 h-3.5 border-b border-r border-white/20" />
                </div>
              </div>

              {/* 1. GLASS PRODUCTS SIMULATOR */}
              {selectedSim === "glass" && (
                <div className="w-72 md:w-80 h-84 md:h-[350px] relative z-10 flex flex-col justify-between p-2 rounded-2xl shadow-3xl bg-slate-950/40 overflow-hidden">
                  
                  {/* Surrounding PVD Outer Trim Casing */}
                  <div 
                    className="absolute inset-0 z-10 rounded-2xl border-[3.5px] transition-all duration-500 pointer-events-none"
                    style={{ borderColor: "#a8a29e", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }}
                  />

                  {/* Glass Pane Overlay */}
                  <div 
                    className="absolute inset-[3.5px] z-0 rounded-xl transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                    style={{ 
                      backgroundColor: glassType.id === "switchable" && !switchableIsActive ? "rgba(255,255,255,0.9)" : glassType.color, 
                      borderColor: glassType.border,
                      borderWidth: "1.5px",
                      backgroundImage: glassType.pattern || "none",
                      boxShadow: glassType.id === "switchable" && !switchableIsActive ? "inset 0 0 35px rgba(255,255,255,0.9)" : `inset 0 0 20px ${glassType.border}`
                    }}
                  >
                    
                    {/* Store location direct links */}
                    <Compass 
                      onClick={() => window.open("https://maps.app.goo.gl/6EDexhSqfoHztf4X9", "_blank")}
                      title="View MVP Double Road Store on Google Maps"
                      className="w-10 h-10 mb-4 opacity-30 hover:opacity-85 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-300 z-20 text-white"
                    />

                    <div className="space-y-1 select-none z-10">
                      <span className="block font-mono text-[8px] tracking-[0.3em] font-extrabold text-white/40 uppercase">
                        VISHVA LAMINATES
                      </span>
                      <span className="block font-serif text-sm font-bold tracking-wide transition-all duration-500 uppercase text-white/80">
                        {glassType.name.split(" ")[0]} Finish
                      </span>
                    </div>

                    {/* Switchable Glass Interactive Controller */}
                    {glassType.id === "switchable" && (
                      <button
                        type="button"
                        onClick={() => setSwitchableIsActive(!switchableIsActive)}
                        className="mt-6 px-3 py-1 bg-black/60 hover:bg-slate-900 border border-white/20 rounded-full flex items-center gap-1.5 font-mono text-[9px] text-white/90 font-bold tracking-wider z-20 cursor-pointer active:scale-95 transition-transform"
                      >
                        <Power className={`w-3 h-3 ${switchableIsActive ? "text-emerald-400" : "text-red-400"}`} />
                        <span>STATE: {switchableIsActive ? "TRANSPARENT" : "OPAQUE"}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 2. ALUMINUM ANODISED FINISH SIMULATOR */}
              {selectedSim === "aluminum" && (
                <div className="w-72 md:w-80 h-84 md:h-[350px] relative z-10 flex flex-col justify-between p-4 rounded-2xl shadow-3xl bg-slate-950/70 border border-white/5 overflow-hidden transition-all duration-500">
                  <div className="text-center pb-2 z-10 relative">
                    <span className="font-mono text-[8.5px] text-gold-400 font-bold uppercase tracking-wider block">
                      ANODISED SASH ELEVATION
                    </span>
                  </div>

                  {/* Window frame simulated section with sliding glass pane */}
                  <div 
                    className="flex-1 rounded-xl relative flex items-stretch overflow-hidden transition-all duration-500"
                    style={{ 
                      backgroundColor: "rgba(15,23,42,0.9)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                    }}
                  >
                    {/* Simulated Background Scenic Vistas */}
                    <div 
                      className="absolute inset-0 opacity-15 pointer-events-none" 
                      style={{ 
                        backgroundImage: "linear-gradient(rgba(14, 165, 233, 0.1) 0%, rgba(220,180,100,0.1) 100%), repeating-linear-gradient(0deg, #111 0px, #111 2px, transparent 2px, transparent 15px), repeating-linear-gradient(90deg, #111 0px, #111 2px, transparent 2px, transparent 15px)"
                      }} 
                    />

                    {/* Left Frame Window Panel (Static) */}
                    <div className="absolute inset-y-0 left-0 w-1/2 border-r flex items-center justify-center p-2 text-center" style={{ borderColor: anodisedFinish.colorCode, backgroundColor: "rgba(14, 165, 233, 0.12)" }}>
                      <span className="font-serif text-[8px] text-white/40 lowercase italic tracking-wider select-none">stationary pane</span>
                    </div>

                    {/* Right Frame Window Panel (Sliding option) */}
                    <div 
                      className="absolute inset-y-0 right-0 w-1/2 border-l shadow-2xl flex items-center justify-center p-2 z-10 transition-all duration-500"
                      style={{ 
                        borderColor: anodisedFinish.colorCode, 
                        transform: `translateX(${slidingPercentage * 0.9}%)`,
                        backgroundColor: "rgba(14, 165, 233, 0.22)",
                        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                    >
                      {/* Integrated premium door sash pull handle */}
                      <div className="absolute left-1 w-1.5 h-12 rounded transition-colors duration-500" style={{ backgroundColor: anodisedFinish.colorCode }} />
                      
                      <div className="select-none text-center">
                        <span className="block font-mono text-[7px] text-white/50 tracking-widest font-bold">SLIDER</span>
                        <span className="block font-sans text-[8px] text-gold-400 font-extrabold uppercase mt-0.5">
                          {slidingPercentage === 0 ? "CLOSED" : `${slidingPercentage}% OPEN`}
                        </span>
                      </div>
                    </div>

                    {/* Dynamic Extruded Metal Profile Overlay acting as the physical structural frame */}
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-all duration-500"
                      style={{ 
                        borderStyle: "solid",
                        borderWidth: anodisedProfile.borderWidth,
                        borderColor: anodisedFinish.colorCode,
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)"
                      }}
                    />
                  </div>

                  {/* Manual slider controller for profile movement */}
                  <div className="space-y-1 bg-slate-900/60 border border-white/5 px-2.5 py-1.5 rounded-xl mt-3 z-10">
                    <div className="flex justify-between items-center text-[8px] font-mono text-gray-400 uppercase tracking-wider">
                      <span>Slide Assembly Adjustment:</span>
                      <span className="text-gold-400 font-bold">{slidingPercentage}% Extruded</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={slidingPercentage}
                      onChange={(e) => setSlidingPercentage(parseInt(e.target.value))}
                      className="w-full accent-gold-500 bg-slate-950 h-1.5 rounded-lg cursor-ew-resize focus:outline-none py-0"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 mt-2">
                    <span>EXTRUDED PROFILES</span>
                    <span>BEADED SEALS ACTIVE</span>
                  </div>
                </div>
              )}

              {/* 3. PREMIUM PVD FINISHES SIMULATOR */}
              {selectedSim === "pvd" && (
                <div className="w-72 md:w-80 h-84 md:h-[350px] relative z-10 flex flex-col justify-between p-4 rounded-2xl shadow-3xl bg-slate-950/70 border border-white/5 overflow-hidden transition-all duration-500">
                  <div className="text-center pb-2 z-10 relative">
                    <span className="font-mono text-[8.5px] text-gold-400 font-bold uppercase tracking-wider block">
                      PVD DECORATIVE PARTITIONS
                    </span>
                  </div>

                  {/* Clean back-rendered ambient chamber */}
                  <div className="flex-1 rounded-xl relative border border-white/10 flex items-center justify-center p-4 overflow-hidden bg-slate-950/95">
                    
                    {/* Soft Backlighting behind the partition */}
                    {pvdBacklitGlow && (
                      <div 
                        className="absolute w-44 h-44 rounded-full filter blur-2xl opacity-60 mix-blend-screen transition-all duration-700 pointer-events-none"
                        style={{ 
                          background: `radial-gradient(circle, ${pvdFinish.colorCode} 0%, transparent 70%)`
                        }}
                      />
                    )}

                    {/* Ambient room wall grid overlay behind partition */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                    {/* THE PREMIUM SURFACE-TEXTURE PVD PARTITION SCREEN */}
                    <div 
                      className="w-40 h-56 rounded-xl border-4 shadow-2xl relative z-10 transition-all duration-500 flex flex-col justify-between p-3 select-none overflow-hidden"
                      style={{ 
                        background: pvdFinish.bg,
                        borderColor: pvdFinish.colorCode,
                        boxShadow: pvdFinish.isGlossy 
                          ? "0 15px 40px rgba(0,0,0,0.85), inset 0 0 15px rgba(255,255,255,0.15)" 
                          : "0 15px 30px rgba(0,0,0,0.7), inset 0 0 8px rgba(255,255,255,0.05)"
                      }}
                    >
                      {/* Fine Surface Texture Sheet Overlay DIRECTLY inside the partition */}
                      <div 
                        className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-85"
                        style={{ 
                          backgroundImage: pvdTexture.code,
                          backgroundSize: pvdTexture.size,
                        }}
                      />

                      {/* Polished mirror swept reflection effect */}
                      {pvdFinish.isGlossy && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-[-20deg] transform animate-pulse pointer-events-none z-5" />
                      )}

                      {/* Inner branding stamps */}
                      <Grid className="w-3.5 h-3.5 opacity-60 text-black/75 mx-auto relative z-10" />
                      
                      <div className="text-center leading-none relative z-10">
                        <span className="font-mono text-[5.5px] tracking-widest font-extrabold text-black/55 block leading-tight">PVD COATING</span>
                        <span className="font-sans text-[7.5px] text-black/85 font-extrabold tracking-tight block truncate mt-0.5 uppercase">{pvdFinish.name}</span>
                      </div>
                      
                      <div className="w-2.5 h-[1px] bg-black/30 mx-auto relative z-10" />
                    </div>

                  </div>

                  <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 mt-3 pt-1 border-t border-white/5">
                    <span> SURFACE FINISH</span>
                    <span>{pvdFinish.name.toUpperCase()}</span>
                  </div>
                </div>
              )}

            </div>

            {/* Spec readout on visualizer bottom footer */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-8 font-mono text-[9px] text-gray-500 tracking-wide uppercase select-none">
              {selectedSim === "glass" ? (
                <>
                  <div className="space-y-1">
                    <span>01. Glass Pane</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{glassType.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Smart Switch</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{glassType.id === "switchable" ? (switchableIsActive ? "Active Clear" : "Opaque Frosted") : "Not Applicable"}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. LED Backlight</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{glassBacklight.name.split(" ")[0]}</span>
                  </div>
                </>
              ) : selectedSim === "aluminum" ? (
                <>
                  <div className="space-y-1">
                    <span>01. Metal Tone</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{anodisedFinish.name.replace("Satin Anodised ", "")}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Profile Casing</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{anodisedProfile.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Slide Extent</span>
                    <span className="block text-gold-400 font-semibold font-mono text-[10px]">{slidingPercentage === 0 ? "Locked Close" : `${slidingPercentage}% Slid Open`}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <span>01. PVD Metallic</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pvdFinish.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Micro-Finish</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pvdTexture.name.split(" ").slice(-1)[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Rear Backlight</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pvdBacklitGlow ? "Activated Glow" : "No Backlight"}</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* RIGHT SIDE CONTROLS - Controller step cards */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* GLASS CONTROLLER PANEL */}
              {selectedSim === "glass" && (
                <>
                  {/* Step 1. Choose glass */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Material Glass (6 Options)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {GLASS_TYPES.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => {
                            setGlassType(g);
                            setSubmitted(false);
                          }}
                          className={`text-left px-3.5 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                            glassType.id === g.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold shadow-inner-gold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="font-semibold block">{g.name.split(" ")[0]}</span>
                          <span className="text-[9.5px] text-gray-500 line-clamp-1 truncate font-light leading-none">{g.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-[11px] text-gray-400 leading-relaxed italic block mt-1 bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                      {glassType.desc}
                    </p>
                  </div>

                  {/* Step 2. Select backlights */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Configure Backlit Glow Mode
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {GLASS_BACKLIGHTS.map((gb) => (
                        <button
                          key={gb.id}
                          type="button"
                          onClick={() => {
                            setGlassBacklight(gb);
                            setSubmitted(false);
                          }}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer ${
                            glassBacklight.id === gb.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div 
                            className="w-4.5 h-4.5 rounded-full border border-white/15 shrink-0"
                            style={{ backgroundColor: gb.hex }}
                          />
                          <span className="block text-[11px] font-semibold text-white truncate">{gb.name.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ALUMINUM ANODISED CONTROLLER PANEL */}
              {selectedSim === "aluminum" && (
                <>
                  {/* Step 1. Color finishing */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Anodised Frame Profile Finish
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {ANODISED_FINISHES.map((af) => (
                        <button
                          key={af.id}
                          type="button"
                          onClick={() => {
                            setAnodisedFinish(af);
                            setSubmitted(false);
                          }}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                            anodisedFinish.id === af.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-white/10"
                              style={{ background: af.bg }}
                            />
                            <span className="font-semibold block text-xs text-white">{af.name}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-light leading-tight block">{af.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2. Frame structure */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Select Architectural Profile Layout
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {ANODISED_PROFILES.map((ap) => (
                        <button
                          key={ap.id}
                          type="button"
                          onClick={() => {
                            setAnodisedProfile(ap);
                            setSubmitted(false);
                          }}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs cursor-pointer ${
                            anodisedProfile.id === ap.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="font-semibold block text-xs text-white uppercase tracking-wider">{ap.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* PVD CONTROLLER PANEL */}
              {selectedSim === "pvd" && (
                <>
                  {/* Step 1. Plated Tone */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Select Titanium PVD Vacuum Plated Finish
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {PVD_FINISHES.map((pf) => (
                        <button
                          key={pf.id}
                          type="button"
                          onClick={() => {
                            setPvdFinish(pf);
                            setSubmitted(false);
                          }}
                          className={`text-left px-4 py-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                            pvdFinish.id === pf.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div 
                              className="w-4 h-4 rounded-full border border-white/10"
                              style={{ background: pf.bg }}
                            />
                            <span className="font-semibold block text-xs text-white">{pf.name}</span>
                          </div>
                          <span className="text-[10.5px] text-gray-500 font-light leading-tight block">{pf.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2. Texture profiles */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Choose Embossed Surface Texture style
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {PVD_TEXTURES.map((pt) => (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => {
                            setPvdTexture(pt);
                            setSubmitted(false);
                          }}
                          className={`text-left px-4 py-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                            pvdTexture.id === pt.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="font-semibold block text-xs text-white">{pt.name}</span>
                          <span className="text-[10.5px] text-gray-500 font-light leading-snug block">{pt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Backlight toggle */}
                  <div className="flex items-center justify-between bg-white/5 border border-white/5 px-4 py-3.5 rounded-xl">
                    <div className="space-y-0.5">
                      <span className="block text-[11px] font-sans font-bold text-white">Soft LED Halo Backlight</span>
                      <span className="block text-[9.5px] text-gray-400">Diffusion lighting behind the textured PVD partition sheet.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPvdBacklitGlow(!pvdBacklitGlow)}
                      className={`px-3 py-1.5 rounded-lg border text-[9.5px] font-mono tracking-wider font-bold transition-all cursor-pointer ${
                        pvdBacklitGlow
                          ? "bg-gold-500/10 border-gold-400 text-white"
                          : "bg-slate-950 border-white/10 text-gray-500"
                      }`}
                    >
                      {pvdBacklitGlow ? "ACTIVATED" : "DEACTIVATED"}
                    </button>
                  </div>
                </>
              )}

            </div>

            {/* Action buttons exporter to Contact Form */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4 shadow-xl mt-4">
              <div className="space-y-1">
                <h5 className="font-serif text-white font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-400" /> Export Specs to Architect
                </h5>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Click below to directly transmit these specification parameters down to our MVP Double Road main showroom booking desk. These selections will be pre-filled automatically!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSendConfig}
                  className="flex-1 group py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Transmitted to Form!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Specs to Form</span>
                    </>
                  )
                  }
                </button>
                <button
                  type="button"
                  onClick={resetStudio}
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear options"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Informational helpful banner footer */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 max-w-3xl mx-auto text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
            💡 <strong className="text-white">Note on Material Selection:</strong> This interactive studio is built to simulate standard configurations representing a specific selected subset of Vishva Interiors' design catalogs. Our MVP Double Road showroom in Visakhapatnam hosts infinitely broader finishes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-xs text-gold-400 uppercase tracking-wider">
            <span>Talk to our Principal Architect directly at MVP Double Road: </span>
            <InteractivePhone className="text-white hover:text-gold-400 font-bold border-b border-dashed border-gold-400/40 pb-0.5 animate-pulse" showIcon={true} />
          </div>
        </div>

      </ScrollReveal>
    </section>
  );
}
