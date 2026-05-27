import { useState } from "react";
import { Sliders, Eye, Sparkles, Send, CheckCircle2, RefreshCw, Compass, Sun, CloudRain, ShieldCheck } from "lucide-react";
import InteractivePhone from "./InteractivePhone";
import ScrollReveal from "./ScrollReveal";

interface MaterialConfiguratorProps {
  onSendConfigToArchitect: (configSummary: string) => void;
}

// SIMULATOR 1: GLASS CONFIGS
const GLASS_STYLES = [
  { id: "clear", name: "Absolute Clear Glass", color: "rgba(224, 242, 254, 0.2)", opacity: 0.25, border: "rgba(186, 230, 253, 0.6)", desc: "12mm Toughened Saint Gobain laminate with maximum optical transparency." },
  { id: "frosted", name: "Acid-Frosted Satin", color: "rgba(241, 245, 249, 0.75)", opacity: 0.8, border: "rgba(255, 255, 255, 0.9)", desc: "Soft light diffusion privacy glass with perfect matte finishing." },
  { id: "laminated", name: "Fabric Laminated (Ivory)", color: "rgba(254, 250, 224, 0.55)", opacity: 0.65, border: "rgba(214, 191, 132, 0.8)", pattern: "repeating-linear-gradient(45deg, transparent 0px, transparent 2px, rgba(230,220,180, 0.25) 2px, rgba(230,220,180, 0.25) 4px)", desc: "Woven luxury linen embedded inside dual tempered layers." },
  { id: "switchable", name: "Smart Switchable Electrochromic", color: "rgba(203, 213, 225, 0.4)", opacity: 0.35, border: "rgba(100, 116, 139, 0.7)", desc: "Turns opaque on a single electrical trigger. Configured at 24V DC." }
];

const FRAME_FINISHES = [
  { id: "gold", name: "Mirror PVD Gold Plated", bg: "linear-gradient(135deg, #f3e8ff 0%, #b1843b 50%, #4a2f1a 100%)", colorCode: "#b1843b", desc: "Premium PVD titanium ion vacuum deposition over solid marine grade steel." },
  { id: "bronze", name: "Champagne Antique Bronze", bg: "linear-gradient(135deg, #d6bf84 0%, #7c5326 100%)", colorCode: "#7c5326", desc: "Rich textured oil-rubbed bronze presenting warm historical tones." },
  { id: "black", name: "Matte Black Anodized", bg: "linear-gradient(135deg, #1e293b 0%, #020617 100%)", colorCode: "#0f172a", desc: "Corrosion proof micro-beaded tactical black structural grading." },
  { id: "silver", name: "Satin Hairline Stainless", bg: "linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)", colorCode: "#94a3b8", desc: "Brushed architectural steel delivering maximum modernity." }
];

const LIGHT_MODES = [
  { id: "sunset", name: "Sunset Gold Backlight", hex: "#f59e0b", glow: "0 0 35px rgba(245, 158, 11, 0.38)" },
  { id: "aurora", name: "Aurora Teal Acoustic Glow", hex: "#14b8a6", glow: "0 0 35px rgba(20, 184, 166, 0.35)" },
  { id: "warm", name: "Soft Warm Hospitality Light", hex: "#fde047", glow: "0 0 25px rgba(253, 224, 71, 0.25)" },
  { id: "neutral", name: "Backlighting Switched Off", hex: "transparent", glow: "none" }
];

// SIMULATOR 2: PERGOLA CONFIGS
const PERGOLA_FRAMES = [
  { id: "black", name: "Carbon Matte Black Anodized", colorCode: "#0f172a", border: "#334155", desc: "Corrosion-proof heavy extruded coastal-grade construction." },
  { id: "white", name: "Satin Oyster White Coating", colorCode: "#eedcc9", border: "#eedcc9", desc: "Reflects maximum sunlight. Keeps poolside loungers naturally cool." },
  { id: "charcoal", name: "Slate Charcoal Textured", colorCode: "#334155", border: "#475569", desc: "Maritime powder-coating designed for direct saline sea spray." },
  { id: "bronze", name: "Imperial Royal Bronze", colorCode: "#431407", border: "#9a3412", desc: "Refined custom bronze tone offering striking high-end villa aesthetics." }
];

const PERGOLA_LOUVERS = [
  { id: "closed", name: "0° Fully Closed (Storm Proof)", angle: 0, status: "WATERPROOF SHIELD ACTIVE", desc: "Airtight rubber interlocking gaskets providing total wind, dust, and rain exclusion." },
  { id: "semi", name: "45° Semi-Open (Air Circulation)", angle: 45, status: "PASSIVE PASSAGE WAY", desc: "Admits soft, filtered sunlight while promoting passive chimney-effect air ventilation." },
  { id: "open", name: "90° Skywards (Direct Sunlight)", angle: 90, status: "MAXIMUM ILLUMINATION INTAKE", desc: "Rotates completely perpendicular to invite direct daylighting and sky visibility." }
];

const PERGOLA_LIGHTS = [
  { id: "daylight", name: "Cool Daylight LED Grid", hex: "#e2e8f0", glow: "0 0 30px rgba(241, 245, 249, 0.4)" },
  { id: "amber", name: "Acoustic Warm Amber LED", hex: "#fbbf24", glow: "0 0 30px rgba(251, 191, 36, 0.38)" },
  { id: "none", name: "Linear LEDs Switched Off", hex: "transparent", glow: "none" }
];

// SIMULATOR 3: LIVE EDGE RESIN TABLE CONFIGS
const TABLE_WOODS = [
  { id: "teak", name: "Burl Golden Teak Slabs", bg: "radial-gradient(circle, #78350f 0%, #451a03 100%)", colorCode: "#78350f", desc: "Highly oily golden aged teak wood with intense burl growth patterns." },
  { id: "walnut", name: "Savage Aged Walnut Slabs", bg: "radial-gradient(circle, #451101 0%, #1c0e08 100%)", colorCode: "#451101", desc: "Dark brown walnut slab detailing pristine live edges & rich heartwood curves." },
  { id: "acacia", name: "Wild Flowing Acacia Slabs", bg: "radial-gradient(circle, #5c2c06 0%, #170701 100%)", colorCode: "#5c2c06", desc: "Vibrant honey contrasts complete with elegant flowing grains." }
];

const TABLE_RESINS = [
  { id: "emerald", name: "Bio Liquid Emerald River", color: "#10b981", glow: "0 0 35px rgba(16, 185, 129, 0.45)", pattern: "radial-gradient(circle, rgba(16,185,129,0.92), rgba(4,120,87,0.8))", desc: "Wavy multi-layer bio-resin mirroring Vizag's marine deep water beauty." },
  { id: "sapphire", name: "Deep Translucent Sapphire", color: "#3b82f6", glow: "0 0 35px rgba(59, 130, 246, 0.45)", pattern: "radial-gradient(circle, rgba(59,130,246,0.92), rgba(29,78,216,0.8))", desc: "Intense sea-blue color matrix containing micro-suspended mineral dust." },
  { id: "copper", name: "Molten Copper & Gold Metal", color: "#d97706", glow: "0 0 35px rgba(217, 119, 6, 0.45)", pattern: "radial-gradient(circle, rgba(217,119,6,0.88), rgba(120,53,4,0.75))", desc: "Translucent polymer enriched with metallic foil flakes for a warm look." }
];

const TABLE_BASES = [
  { id: "hairpin", name: "Dual-Stiffener Hairpin Brass", visual: "hairpin", desc: "High-load solid polished brass rods giving a space-saving mid-century look." },
  { id: "starburst", name: "Starburst Intersecting Gold PVD", visual: "starburst", desc: "Interlocking geometrical profile vacuum-plated in titanium gold ion coat." },
  { id: "slate", name: "Symmetric Monolithic Matte Black", visual: "slate", desc: "Bold, brutalist flat iron sheets highlighting solid weight distribution." }
];

export default function MaterialConfigurator({ onSendConfigToArchitect }: MaterialConfiguratorProps) {
  // Top level state to toggle simulators
  const [selectedSim, setSelectedSim] = useState<"glass" | "pergola" | "resintable">("glass");

  // State 1: Glass simulator fields
  const [glass, setGlass] = useState(GLASS_STYLES[0]);
  const [frame, setFrame] = useState(FRAME_FINISHES[0]);
  const [light, setLight] = useState(LIGHT_MODES[0]);

  // State 2: Pergola simulator fields
  const [pergolaFrame, setPergolaFrame] = useState(PERGOLA_FRAMES[0]);
  const [pergolaLouver, setPergolaLouver] = useState(PERGOLA_LOUVERS[1]); // Default semi-open
  const [pergolaLight, setPergolaLight] = useState(PERGOLA_LIGHTS[1]); // Default warm amber
  const [pergolaWeather, setPergolaWeather] = useState<"sun" | "rain">("sun");

  // State 3: Resin table fields
  const [tableWood, setTableWood] = useState(TABLE_WOODS[0]);
  const [tableResin, setTableResin] = useState(TABLE_RESINS[0]);
  const [tableBase, setTableBase] = useState(TABLE_BASES[1]); // Default starburst

  const [submitted, setSubmitted] = useState(false);

  const resetStudio = () => {
    if (selectedSim === "glass") {
      setGlass(GLASS_STYLES[0]);
      setFrame(FRAME_FINISHES[0]);
      setLight(LIGHT_MODES[0]);
    } else if (selectedSim === "pergola") {
      setPergolaFrame(PERGOLA_FRAMES[0]);
      setPergolaLouver(PERGOLA_LOUVERS[1]);
      setPergolaLight(PERGOLA_LIGHTS[1]);
      setPergolaWeather("sun");
    } else {
      setTableWood(TABLE_WOODS[0]);
      setTableResin(TABLE_RESINS[0]);
      setTableBase(TABLE_BASES[1]);
    }
    setSubmitted(false);
  };

  const handleSendConfig = () => {
    let configString = "";
    if (selectedSim === "glass") {
      configString = `Glass Spec Package:\n- Category: Premium Glass & PVD Partition\n- Glass Pane: ${glass.name}\n- Framing Metal: ${frame.name}\n- Light Scheme: ${light.name}`;
    } else if (selectedSim === "pergola") {
      configString = `Pergola Spec Package:\n- Category: Bioclimatic Motorized Pergola\n- Frame Finish: ${pergolaFrame.name}\n- Slat Rotation: ${pergolaLouver.name}\n- LED Lumens: ${pergolaLight.name}`;
    } else {
      configString = `River Table Spec Package:\n- Category: Live-Edge Resin River Table\n- Timber Wood: ${tableWood.name}\n- River Resin: ${tableResin.name}\n- Ground Base: ${tableBase.name}`;
    }

    onSendConfigToArchitect(configString);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section id="studio" className="relative w-full py-24 md:py-32 bg-transparent border-t border-white/5 overflow-hidden">
      {/* Dynamic Background Amber/Teak Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3.5xl opacity-20 pointer-events-none transition-all duration-1000"
        style={{ 
          backgroundColor: 
            selectedSim === "glass" ? (light.hex !== "transparent" ? light.hex : "#b1843b") :
            selectedSim === "pergola" ? (pergolaLight.hex !== "transparent" ? pergolaLight.hex : "#334155") :
            tableResin.color 
        }}
      />

      <ScrollReveal className="max-w-full px-6 md:px-16 xl:px-24 relative z-10">
        
        {/* Section Header with Top-Right Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 border-b border-white/5 pb-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full font-mono text-[9px] tracking-widest text-gold-400 uppercase">
              <Sliders className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Bespoke Sandbox</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              Live Material &amp; Product <span className="italic font-normal text-gold-300 font-sans">Simulators</span>
            </h2>
            <p className="font-sans text-gray-400 text-sm leading-relaxed">
              Synthesize your design specifications. Switch our digital sandbox to preview architectural glass layouts, motorized bioclimatic pergolas, or custom live-edge epoxy river tables in real-time.
            </p>
          </div>
          
          {/* Top Right Selector Component with padding fix to avoid icon overlap */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase block text-left sm:text-right font-black">
              SELECT SIM CONFIGURATION:
            </span>
            <div className="relative min-w-[270px]">
              <select
                value={selectedSim}
                onChange={(e) => {
                  setSelectedSim(e.target.value as any);
                  setSubmitted(false);
                }}
                className="w-full bg-slate-900 border border-gold-500/30 text-white font-mono text-xs px-4 py-3.5 pr-12 rounded-xl cursor-pointer focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 appearance-none shadow-2xl transition-all"
                title="Select Interactive Sandbox Simulator"
              >
                <option value="glass">💎 Glass &amp; PVD Partition</option>
                <option value="pergola">⛅ Bioclimatic Motorized Pergola</option>
                <option value="resintable">🌳 Live-Edge Resin River Table</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold-400">
                <Compass className="w-4 h-4 animate-spin-slow inline" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Studio Body GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN - High end interactive canvas visualizer */}
          <div className="lg:col-span-7 bg-slate-900/60 rounded-3xl border border-white/10 p-6 md:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Spec readout on visualizer header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8 font-mono text-[10px] tracking-wider text-gray-400 uppercase">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gold-400" /> Live Render Engine
              </span>
              <span className="text-gold-400 font-bold opacity-75">
                {selectedSim === "glass" && "SUITE: VISHVA-GLASS-PVD"}
                {selectedSim === "pergola" && "SUITE: VISHVA-PERGOLA-BIOCLIMATIC"}
                {selectedSim === "resintable" && "SUITE: VISHVA-EPOXY-DINING"}
              </span>
            </div>

            {/* THE INTERACTIVE OUTLINE SCENE */}
            <div className="flex-1 min-h-[350px] md:min-h-[440px] flex items-center justify-center relative p-8">
              
              {/* Backlight/Aura Ambient effect */}
              <div 
                className="absolute w-80 h-80 rounded-2xl transition-all duration-750 ease-out z-0 filter blur-3xl opacity-60"
                style={{ 
                  backgroundColor: 
                    selectedSim === "glass" ? (light.hex !== "transparent" ? light.hex : "transparent") :
                    selectedSim === "pergola" ? (pergolaLight.hex !== "transparent" ? pergolaLight.hex : "transparent") :
                    tableResin.color,
                  boxShadow: 
                    selectedSim === "glass" ? light.glow :
                    selectedSim === "pergola" ? pergolaLight.glow :
                    tableResin.glow 
                }}
              />

              {/* Simulated Room Scaffold Backdrop */}
              <div className="absolute inset-4 rounded-xl border border-white/5 bg-slate-950/40 z-0 pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t border-l border-white/20" />
                  <div className="w-4 h-4 border-t border-r border-white/20" />
                </div>
                {/* Horizontal guide lines */}
                <div className="h-[1px] w-full bg-white/5 border-dashed" />
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b border-l border-white/20" />
                  <div className="w-4 h-4 border-b border-r border-white/20" />
                </div>
              </div>

              {/* 1. GLASS PARTITION SIMULATOR */}
              {selectedSim === "glass" && (
                <div id="product-simulator-glass" className="w-72 md:w-80 h-84 md:h-96 relative z-10 flex flex-col justify-between p-1.5 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Simulated Product Framing */}
                  <div 
                    className="absolute inset-0 z-10 rounded-2xl border-4 transition-all duration-500"
                    style={{ 
                      borderColor: frame.colorCode,
                      boxShadow: frame.id === "gold" ? "0 0 15px rgba(177, 132, 59, 0.3)" : "none"
                    }}
                  />

                  {/* Simulated Glass Panel Pane */}
                  <div 
                    className="absolute inset-1.5 z-0 rounded-xl transition-all duration-500 flex flex-col items-center justify-center p-6 text-center"
                    style={{ 
                      backgroundColor: glass.color, 
                      borderColor: glass.border,
                      borderWidth: "1px",
                      backgroundImage: glass.pattern || "none"
                    }}
                  >
                    {/* Clickable compass maps locator */}
                    <Compass 
                      onClick={() => window.open("https://maps.app.goo.gl/6EDexhSqfoHztf4X9", "_blank")}
                      title="Click to view store on Google Maps"
                      className="w-12 h-12 mb-4 opacity-25 hover:opacity-75 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-350 z-20"
                      style={{ color: frame.colorCode }}
                    />
                    <div className="space-y-1 select-none">
                      <span className="block font-mono text-[9px] tracking-[0.3em] font-semibold text-white/40 uppercase">
                        VISHVA LUXURY CLASS
                      </span>
                      <span 
                        className="block font-serif text-sm font-bold text-white/50 tracking-wider transition-colors duration-500 uppercase"
                        style={{ color: glass.id === "frosted" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}
                      >
                        {glass.name}
                      </span>
                    </div>
                  </div>

                  {/* Decorative horizontal metal partition bars */}
                  <div 
                    className="w-full h-1.5 absolute top-1/4 left-0 z-12 transition-all duration-500"
                    style={{ backgroundColor: frame.colorCode }}
                  />
                  <div 
                    className="w-full h-1.5 absolute bottom-1/4 left-0 z-12 transition-all duration-500"
                    style={{ backgroundColor: frame.colorCode }}
                  />
                </div>
              )}

              {/* 2. BIOCLIMATIC MOTORIZED PERGOLA SIMULATOR (Highly Visual upgrade demonstrating active louvers & weather block) */}
              {selectedSim === "pergola" && (
                <div id="product-simulator-pergola" className="w-full max-w-[340px] h-96 relative z-10 flex flex-col justify-between p-4 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/90 border border-white/5">
                  
                  {/* Weather Scene Elements for Extreme Understanding of the Motorized Blades */}
                  <div className="absolute top-2 left-4 z-25 flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-gray-400">
                    <span className="font-bold text-white">Weather Simulation:</span>
                    <button 
                      onClick={() => setPergolaWeather("sun")} 
                      className={`px-1.5 py-0.5 rounded ${pergolaWeather === "sun" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "hover:text-white"}`}
                    >
                      ☀️ Sunny
                    </button>
                    <button 
                      onClick={() => setPergolaWeather("rain")} 
                      className={`px-1.5 py-0.5 rounded ${pergolaWeather === "rain" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "hover:text-white"}`}
                    >
                      🌧️ Rainy
                    </button>
                  </div>

                  {/* Visual interpretation banner of current blade state */}
                  <div className="absolute top-[38px] left-4 right-4 z-20 text-center py-1.5 bg-slate-900/90 border border-white/10 rounded-lg">
                    <div className="font-mono text-[9px] text-gold-400 font-bold tracking-widest uppercase flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      <span>{pergolaLouver.status}</span>
                    </div>
                  </div>

                  {/* Dynamic weather indicators based on slider & toggled weather */}
                  {pergolaWeather === "sun" && (
                    <div className="absolute top-14 right-8 z-10 flex flex-col items-center animate-pulse">
                      <Sun className="w-8 h-8 text-amber-400" />
                      <span className="text-[7px] font-mono text-amber-500 uppercase tracking-widest">Natural Daylighting</span>
                    </div>
                  )}

                  {pergolaWeather === "rain" && (
                    <div className="absolute inset-x-8 top-12 bottom-20 z-10 overflow-hidden pointer-events-none opacity-40">
                      {/* Interactive Falling Rain particles */}
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-[1px] h-3 bg-blue-300 rounded animate-bounce" 
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 20}%`,
                            animationDuration: `${0.8 + Math.random() * 0.5}s`,
                            animationIterationCount: "infinite"
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Structural Columns supporting the louver deck roof */}
                  <div 
                    className="absolute left-6 bottom-0 w-3 md:w-3.5 h-[190px] rounded-t-lg transition-all duration-500 z-10"
                    style={{ backgroundColor: pergolaFrame.colorCode, border: `1px solid ${pergolaFrame.border}` }}
                  />
                  <div 
                    className="absolute right-6 bottom-0 w-3 md:w-3.5 h-[190px] rounded-t-lg transition-all duration-500 z-10"
                    style={{ backgroundColor: pergolaFrame.colorCode, border: `1px solid ${pergolaFrame.border}` }}
                  />

                  {/* Main horizontal beam */}
                  <div 
                    className="absolute left-[18px] right-[18px] bottom-[180px] h-8 rounded-lg transition-all duration-500 z-20 flex items-center justify-between px-3"
                    style={{ backgroundColor: pergolaFrame.colorCode, border: `1px solid ${pergolaFrame.border}` }}
                  >
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[8px] font-mono text-white tracking-widest font-bold uppercase header-stiffener">
                      {pergolaFrame.name.split(" ")[0]} BEAM
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  </div>

                  {/* Dynamic Weather Interaction Canvas (Slats changing physical angle rotation) */}
                  <div className="absolute left-10 right-10 bottom-[212px] h-[75px] bg-slate-900/40 rounded-xl border border-white/5 flex items-center justify-around px-4 z-25 overflow-visible">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="relative w-8 h-12 flex flex-col justify-center items-center overflow-visible">
                        
                        {/* Interactive Slat Blade with 3D Rotate representation */}
                        <div 
                          className="w-2.5 h-10 transition-all duration-700 ease-in-out rounded-md shadow-2xl relative"
                          style={{ 
                            backgroundColor: pergolaFrame.colorCode, 
                            borderColor: pergolaFrame.border,
                            borderWidth: "1.5px",
                            transform: `rotate(${pergolaLouver.angle}deg)`,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
                          }}
                        >
                          {/* Inner aluminum reinforcement visual indicator */}
                          <div className="absolute inset-x-0.5 top-2 bottom-2 bg-white/10 rounded-sm" />
                        </div>

                        {/* Rain/Sun path visual block representation */}
                        {pergolaWeather === "rain" && pergolaLouver.angle === 0 && (
                          <div className="absolute -top-3 w-4 h-[1px] bg-blue-400 animate-pulse text-[7px] text-center text-blue-400 font-mono scale-75 whitespace-nowrap">
                            [BLOCKED]
                          </div>
                        )}
                        {pergolaWeather === "sun" && pergolaLouver.angle === 90 && (
                          <div className="absolute -bottom-6 w-full h-12 bg-amber-400/20 rounded blur-[3px] pointer-events-none" />
                        )}
                        {pergolaWeather === "sun" && pergolaLouver.angle === 45 && (
                          <div className="absolute -bottom-6 w-full h-12 bg-amber-400/10 rounded blur-[5px] pointer-events-none origin-top-left rotate-[45deg]" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Description of active louver behavior */}
                  <div className="absolute bottom-[44px] inset-x-4 bg-slate-900/80 border border-white/5 rounded-xl p-2.5 text-center min-h-[50px] flex items-center justify-center">
                    <p className="font-sans text-[10px] text-gray-300 leading-normal font-light">
                      {pergolaLouver.angle === 0 && "🌧️ Waterproof seal is active. Rainwater rolls off slats into side columns gutters."}
                      {pergolaLouver.angle === 45 && "🍃 Chimney-effect activated. Natural heat escapes upwards while allowing shaded daylight."}
                      {pergolaLouver.angle === 90 && "☀️ Open Sky option. Maximum sunlight intake for premium open-air terrace ambiance."}
                    </p>
                  </div>

                  {/* Geographic Redirect Pointer Compass removed for pergola */}
                  <div className="flex justify-between items-center px-2 font-mono text-[8px] text-gray-500 mt-auto">
                    <span>BIOCLIMATIC TECH</span>
                    <span>100% WATERPROOF</span>
                  </div>
                </div>
              )}

              {/* 3. LIVE EDGE RESIN RIVER TABLE (Complete gorgeous bird's-eye and side-view dining setup block) */}
              {selectedSim === "resintable" && (
                <div id="product-simulator-table" className="w-full max-w-[340px] h-96 relative z-10 flex flex-col justify-between p-4 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/80 border border-white/5">
                  
                  {/* Visual Label to show it is a Table */}
                  <div className="absolute top-2.5 left-4 right-4 text-center z-25 bg-slate-900/90 border border-white/10 py-1.5 rounded-lg select-none">
                    <span className="font-mono text-[8px] text-gold-400 font-bold uppercase tracking-widest block leading-none">
                      BESPOKE EPOXY DINING BLOCK
                    </span>
                    <span className="font-serif text-[11px] text-white font-semibold mt-1 block">
                      Bird's-Eye View: Natural Timber + Translucent Resin
                    </span>
                  </div>

                  {/* TOP-DOWN TABLE DESIGN BOARD (Bird's eye preview) */}
                  <div className="w-full h-44 rounded-2xl border border-white/10 relative overflow-hidden flex items-stretch mt-10 shadow-2xl">
                    
                    {/* Natural Wood Slab Left Side */}
                    <div 
                      className="flex-1 transition-all duration-500 relative flex items-center justify-start p-3 select-none"
                      style={{ 
                        background: tableWood.bg,
                        borderRight: `2px solid ${tableResin.color}`,
                        borderRadius: "12px 0 0 12px",
                        clipPath: "polygon(0% 0%, 100% 0%, 82% 25%, 95% 50%, 79% 75%, 90% 90%, 85% 100%, 0% 100%)"
                      }}
                    >
                      <div className="opacity-15 font-mono text-[6px] tracking-widest text-white rotate-90 origin-left mt-4 uppercase">
                        {tableWood.name.split(" ")[1]} hardwood
                      </div>
                    </div>

                    {/* Central Shimmering Epoxy Liquid River */}
                    <div 
                      className="absolute top-0 bottom-0 left-[33%] right-[33%] z-15 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden"
                      style={{ 
                        background: tableResin.pattern,
                        boxShadow: tableResin.glow,
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                        borderRight: "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(4px)"
                      }}
                    >
                      {/* Flowing liquid river highlight lines */}
                      <div className="absolute inset-y-0 w-1 bg-white/20 blur-sm mix-blend-overlay left-1/3 animate-pulse" />
                      <div className="absolute inset-y-0 w-2 bg-white/10 blur-[1px] mix-blend-overlay right-1/4 animate-pulse" />
                      
                      {/* Floating Gold Dust / Flakes */}
                      <div className="absolute top-1/4 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-60" />
                      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-70" />

                      {/* Decorative center shimmer indicator representing resin flow */}
                      <div className="w-7 h-7 flex items-center justify-center opacity-30 select-none">
                        <span className="font-mono text-[7px] text-white tracking-widest uppercase rotate-90">RIVER</span>
                      </div>
                    </div>

                    {/* Natural Wood Slab Right Side */}
                    <div 
                      className="flex-1 transition-all duration-500 relative flex items-center justify-end p-3 select-none"
                      style={{ 
                        background: tableWood.bg,
                        borderLeft: `2px solid ${tableResin.color}`,
                        borderRadius: "0 12px 12px 0",
                        clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 15% 100%, 10% 90%, 21% 75%, 5% 50%, 19% 25%)"
                      }}
                    >
                      <div className="opacity-15 font-mono text-[6px] tracking-widest text-white -rotate-90 origin-right mt-4 uppercase">
                        VISHVA SOLID TIMBER
                      </div>
                    </div>

                    {/* Highly Understandable Plate & Dining Setup Overlays (makes it obvious that it is a dining table) */}
                    <div className="absolute left-[8%] top-[28%] z-20 w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center p-[2px] shadow-lg backdrop-blur-sm pointer-events-none">
                      <div className="w-full h-full rounded-full border border-white/10 bg-[#0f172a]/65" />
                    </div>
                    
                    <div className="absolute right-[8%] top-[28%] z-20 w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center p-[2px] shadow-lg backdrop-blur-sm pointer-events-none">
                      <div className="w-full h-full rounded-full border border-white/10 bg-[#0f172a]/65" />
                    </div>

                    {/* Silverware details */}
                    <div className="absolute left-[3%] top-[38%] z-20 h-4 w-1 bg-white/15 rounded-full pointer-events-none" />
                    <div className="absolute right-[3%] top-[38%] z-20 h-4 w-1 bg-white/15 rounded-full pointer-events-none" />
                  </div>

                  {/* SIDE VIEW FOR TABLE LEGS DESIGN REPRESENTATION */}
                  <div className="h-24 bg-slate-900/50 rounded-xl border border-white/5 p-2 flex flex-col justify-between mt-3">
                    
                    <div className="text-center font-mono text-[7.5px] uppercase text-gray-500 tracking-wider">
                      Ground Support Structure (Side View)
                    </div>

                    {/* Physical leg layouts based on tableBase state */}
                    <div className="flex-1 flex justify-center items-end relative overflow-hidden pb-1">
                      
                      {/* Shared horizontal top frame representing the table panel thickness */}
                      <div className="absolute top-1 left-8 right-8 h-1 bg-amber-900/85 rounded-full" />

                      {/* Leg type 1: HAIRPIN */}
                      {tableBase.visual === "hairpin" && (
                        <div className="flex justify-between w-60">
                          {/* Left thin brass hairpin */}
                          <div className="w-3 h-14 border-r-2 border-l-2 border-gold-400 rounded-b-xl opacity-80" />
                          {/* Right thin brass hairpin */}
                          <div className="w-3 h-14 border-r-2 border-l-2 border-gold-400 rounded-b-xl opacity-80" />
                        </div>
                      )}

                      {/* Leg type 2: STARBURST (Classic intersecting high-end legs) */}
                      {tableBase.visual === "starburst" && (
                        <div className="relative w-40 h-14 flex items-center justify-center">
                          <div className="absolute w-[2px] h-14 bg-gradient-to-t from-gold-600 to-gold-400 rotate-25 origin-center" />
                          <div className="absolute w-[2px] h-14 bg-gradient-to-t from-gold-600 to-gold-400 -rotate-25 origin-center" />
                          <div className="absolute bottom-0 w-24 h-[1px] bg-gold-500/20" />
                        </div>
                      )}

                      {/* Leg type 3: SLATE MONOLITHIC METAL */}
                      {tableBase.visual === "slate" && (
                        <div className="flex justify-between w-[200px]">
                          {/* Left thick block */}
                          <div className="w-5 h-14 bg-slate-800 border-t border-slate-700 shadow-xl" />
                          {/* Right thick block */}
                          <div className="w-5 h-14 bg-slate-800 border-t border-slate-700 shadow-xl" />
                        </div>
                      )}
                    </div>

                    {/* Active structure text read-out */}
                    <div className="text-center font-mono text-[8px] text-gold-400 font-bold uppercase leading-none pb-0.5">
                      Base Leg Type: {tableBase.name}
                    </div>
                  </div>

                  {/* Ground metadata bar */}
                  <div className="flex justify-between items-center px-1 font-mono text-[8.5px] text-gray-500 mt-auto pt-2 border-t border-white/5">
                    <span>100% ORGANIC TEAK</span>
                    <span>HAND-CAST POLISH</span>
                  </div>
                </div>
              )}

            </div>

            {/* Specs read-out dashboard footer */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-8 font-mono text-[9px] text-gray-500 tracking-wide uppercase">
              {selectedSim === "glass" ? (
                <>
                  <div className="space-y-1">
                    <span>01. Glass Pane</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{glass.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Metallic Trim</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{frame.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Acoustic LED</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{light.name}</span>
                  </div>
                </>
              ) : selectedSim === "pergola" ? (
                <>
                  <div className="space-y-1">
                    <span>01. System Frame</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pergolaFrame.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Louvre Rotation</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pergolaLouver.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Under-Beam LED</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{pergolaLight.name.split(" ")[0]}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <span>01. Timber Wood</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{tableWood.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. River Resin</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{tableResin.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Ground Legs</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{tableBase.name.split(" ")[0]}</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN - Controller & spec descriptions */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* RENDER SUITE CONTROLLERS DYNAMICALLY */}
              {selectedSim === "glass" && (
                <>
                  {/* Glass Styles Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Material Glass
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {GLASS_STYLES.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGlass(g)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                            glass.id === g.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block">{g.name.split(" ")[0]}</span>
                          <span className="text-[10px] text-gray-500 line-clamp-1 truncate font-light leading-none">{g.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {glass.desc}
                    </p>
                  </div>

                  {/* Frame finish Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Select Metal Finishing (PVD)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {FRAME_FINISHES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrame(f)}
                          className={`text-left p-2 rounded-xl border transition-all flex items-center gap-3 w-full ${
                            frame.id === f.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex-shrink-0"
                            style={{ background: f.bg }}
                          />
                          <div className="flex-1 overflow-hidden">
                            <span className="block font-semibold text-xs text-white truncate">{f.name}</span>
                            <span className="block text-[9px] text-gray-500 truncate leading-none">Vacuum plating</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {frame.desc}
                    </p>
                  </div>

                  {/* Backlight LED Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 3. Configure Acoustic Lighting
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {LIGHT_MODES.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setLight(l)}
                          className={`px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all border ${
                            light.id === l.id
                              ? "bg-slate-900 border-gold-400 text-white font-black"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          {l.name.split(" ")[0]} Light
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}


              {selectedSim === "pergola" && (
                <>
                  {/* Pergola Frame Color Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Structure Frame Finish
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PERGOLA_FRAMES.map((pf) => (
                        <button
                          key={pf.id}
                          type="button"
                          onClick={() => setPergolaFrame(pf)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                            pergolaFrame.id === pf.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block">{pf.name.split(" ")[1]} coating</span>
                          <span className="text-[10px] text-gray-500 line-clamp-1 truncate font-light leading-none">{pf.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {pergolaFrame.desc}
                    </p>
                  </div>

                  {/* Louver Slat Rotation Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Adjust Bioclimatic Motor Louvres
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PERGOLA_LOUVERS.map((pl) => (
                        <button
                          key={pl.id}
                          type="button"
                          onClick={() => setPergolaLouver(pl)}
                          className={`text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 w-full ${
                            pergolaLouver.id === pl.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-400/20 text-gold-400 flex items-center justify-center font-bold text-xs tracking-wide shrink-0">
                            {pl.angle}°
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <span className="block font-semibold text-xs text-white truncate">{pl.name.split(" ")[0]}</span>
                            <span className="block text-[9px] text-gray-500 truncate leading-none">Tilt profile</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {pergolaLouver.desc}
                    </p>
                  </div>

                  {/* LED Backlight Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 3. Select Under-Beam Acoustic Lumens
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PERGOLA_LIGHTS.map((lit) => (
                        <button
                          key={lit.id}
                          type="button"
                          onClick={() => setPergolaLight(lit)}
                          className={`px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all border ${
                            pergolaLight.id === lit.id
                              ? "bg-slate-900 border-gold-400 text-white font-black"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          {lit.name.split(" ")[0]} Glow
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}


              {selectedSim === "resintable" && (
                <>
                  {/* Wood Table Switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Slabs Natural Hardwood
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {TABLE_WOODS.map((tw) => (
                        <button
                          key={tw.id}
                          type="button"
                          onClick={() => setTableWood(tw)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                            tableWood.id === tw.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block">{tw.name.split(" ")[1]} Slices</span>
                          <span className="text-[10px] text-gray-500 line-clamp-1 truncate font-light leading-none">{tw.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {tableWood.desc}
                    </p>
                  </div>

                  {/* Table Epoxy Polymer switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Select Epoxy Liquid Polymer
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {TABLE_RESINS.map((tr) => (
                        <button
                          key={tr.id}
                          type="button"
                          onClick={() => setTableResin(tr)}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 w-full ${
                            tableResin.id === tr.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <div 
                            className="w-8 h-8 rounded-full flex-shrink-0 border border-white/10"
                            style={{ background: tr.color }}
                          />
                          <div className="flex-1 overflow-hidden">
                            <span className="block font-semibold text-xs text-white truncate">{tr.name}</span>
                            <span className="block text-[9px] text-gray-500 truncate leading-none">Resin channel</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {tableResin.desc}
                    </p>
                  </div>

                  {/* Table Base supports */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 3. Pick Heavy Ground Legs Base
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {TABLE_BASES.map((tb) => (
                        <button
                          key={tb.id}
                          type="button"
                          onClick={() => setTableBase(tb)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 w-full ${
                            tableBase.id === tb.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block text-xs text-white">{tb.name}</span>
                          <span className="text-[10px] text-gray-500 font-light leading-tight">{tb.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Configurator actions container */}
            <div className="glass-panel rounded-2xl p-6 border-white/5 space-y-4">
              <div className="space-y-1">
                <h5 className="font-serif text-white font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-400 animate-spin" /> Custom Integration Estimator
                </h5>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Export this specification package directly to our Visakhapatnam designing architect. It will automatically pre-load your design parameters into our contact booking details!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSendConfig}
                  className="flex-1 group py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Transmitted to Booking Form!</span>
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
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors"
                  title="Clear options"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Notice for Customers */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 max-w-3xl mx-auto text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-600/5 rounded-full blur-2xl pointer-events-none" />
          <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
            💡 <strong className="text-white">Customer Demonstration Notice:</strong> This live configurator serves as an interactive simulation tool representing a selected subset of our craftsmanship. In practice, Vishva Interiors handles an infinitely broader range of custom styles, profiles, material grades, colors, and tailored design integrations than shown here. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-xs text-gold-400 uppercase tracking-wider">
            <span>Explore all types by contacting our lead design desk directly: </span>
            <InteractivePhone className="text-white hover:text-gold-400 font-bold border-b border-dashed border-gold-400/40 pb-0.5 animate-pulse" showIcon={true} />
          </div>
        </div>

      </ScrollReveal>
    </section>
  );
}
