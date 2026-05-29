import { useState } from "react";
import { Sliders, Eye, Sparkles, Send, CheckCircle2, RefreshCw, Compass, Sun, CloudRain, ShieldCheck, Gem, Table, Power, Zap } from "lucide-react";
import InteractivePhone from "./InteractivePhone";
import ScrollReveal from "./ScrollReveal";
import WordReveal from "./WordReveal";

interface MaterialConfiguratorProps {
  onSendConfigToArchitect: (configSummary: string, categoryId?: string) => void;
}

// SIMULATOR 4: SMART MIRROR CONFIGS
const MIRROR_SHAPES = [
  { id: "arch", name: "Organic Vault Arch", radiusClass: "rounded-t-full h-80 w-52", desc: "Arched luxury profile reminiscent of high-end boutique hotel suites." },
  { id: "pill", name: "Capsule Sleek Pill", radiusClass: "rounded-full h-80 w-44", desc: "Elongated soft-oval structure designed to elevate vanity coordinates." },
  { id: "orb", name: "Celestial Pure Orb", radiusClass: "rounded-full h-64 w-64", desc: "Perfect symmetric round vanity mirror framing architectural spaces cleanly." }
];

const MIRROR_LIGHTS = [
  { id: "candles", name: "Candlelight Golden Glow (2200K)", hex: "#f59e0b", glow: "0 0 40px rgba(245, 158, 11, 0.5)" },
  { id: "daylight", name: "Daylight Pure Alabaster (4000K)", hex: "#e2e8f0", glow: "0 0 40px rgba(226, 232, 240, 0.45)" },
  { id: "cosmic", name: "Cosmic Lavender Bloom (RGB)", hex: "#c084fc", glow: "0 0 45px rgba(192, 132, 252, 0.55)" }
];

const MIRROR_SERVICES = [
  { id: "frosted", name: "Framed Frosted Sandblast Halo", desc: "Includes a 2cm precision sandblasted border band that diffuses the LED backlight forward." },
  { id: "clean", name: "Seamless Edge Optical Aura", desc: "Features a clean non-beveled mirror edge allowing the backlit aura to paint the host wall softly." }
];

// SIMULATOR 5: ALUMINUM ULTRA-SLIM SYSTEM WINDOW CONFIGS
const WINDOW_FRAMES = [
  { id: "charcoal", name: "Anodized Slate Charcoal", colorCode: "#272a2e", desc: "Heavy-duty coastal anodization protecting against saline air corrosion." },
  { id: "champagne", name: "PVD Champagne Gold Luxury", colorCode: "#b1843b", desc: "Exquisite PVD vapor deposition, adding a reflective gold metallic sheen to visual profiles." },
  { id: "black", name: "Executive Jet Black Matte", colorCode: "#111317", desc: "Ultra-sleek modern architectural profile matching dark minimalist interiors." }
];

const WINDOW_GLASSES = [
  { id: "double", name: "Argon SoundProof Double-Glazed", color: "rgba(224, 242, 254, 0.3)", opacity: 0.3, border: "rgba(14, 165, 233, 0.5)", desc: "19mm structural glazing filled with sound-stopping dense argon gas, reducing outside noise by 45dB." },
  { id: "ocean", name: "Ocean Reflective Solar Blue", color: "rgba(59, 130, 246, 0.45)", opacity: 0.5, border: "rgba(29, 78, 216, 0.7)", desc: "High-performance smart solar-coating that completely blocks solar heat gain while preserving beach vistas." },
  { id: "frosted", name: "Translucent Satin Acid-Etched", color: "rgba(248, 250, 252, 0.8)", opacity: 0.85, border: "rgba(255, 255, 255, 0.95)", desc: "Satin finish privacy pane that allows ambient light passage with complete silhouette shielding." }
];

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
  const [selectedSim, setSelectedSim] = useState<"glass" | "pergola" | "resintable" | "smartmirror" | "systemwindow">("glass");

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

  // State 4: Smart mirror fields
  const [mirrorShape, setMirrorShape] = useState(MIRROR_SHAPES[0]);
  const [mirrorLight, setMirrorLight] = useState(MIRROR_LIGHTS[0]);
  const [mirrorService, setMirrorService] = useState(MIRROR_SERVICES[0]);
  const [mirrorPower, setMirrorPower] = useState(true);

  // State 5: Aluminum System Window fields
  const [windowFrame, setWindowFrame] = useState(WINDOW_FRAMES[0]);
  const [windowGlass, setWindowGlass] = useState(WINDOW_GLASSES[0]);
  const [windowSlide, setWindowSlide] = useState(30); // Default 30% open

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
    } else if (selectedSim === "resintable") {
      setTableWood(TABLE_WOODS[0]);
      setTableResin(TABLE_RESINS[0]);
      setTableBase(TABLE_BASES[1]);
    } else if (selectedSim === "smartmirror") {
      setMirrorShape(MIRROR_SHAPES[0]);
      setMirrorLight(MIRROR_LIGHTS[0]);
      setMirrorService(MIRROR_SERVICES[0]);
      setMirrorPower(true);
    } else if (selectedSim === "systemwindow") {
      setWindowFrame(WINDOW_FRAMES[0]);
      setWindowGlass(WINDOW_GLASSES[0]);
      setWindowSlide(30);
    }
    setSubmitted(false);
  };

  const handleSendConfig = () => {
    let configString = "";
    let catId = "glass";
    if (selectedSim === "glass") {
      configString = `Glass Spec Package:\n- Category: Premium Glass & PVD Partition\n- Glass Pane: ${glass.name}\n- Framing Metal: ${frame.name}\n- Light Scheme: ${light.name}`;
      catId = "glass";
    } else if (selectedSim === "pergola") {
      configString = `Pergola Spec Package:\n- Category: Bioclimatic Motorized Pergola\n- Frame Finish: ${pergolaFrame.name}\n- Slat Rotation: ${pergolaLouver.name}\n- LED Lumens: ${pergolaLight.name}`;
      catId = "aluminum";
    } else if (selectedSim === "resintable") {
      configString = `River Table Spec Package:\n- Category: Live-Edge Resin River Table\n- Timber Wood: ${tableWood.name}\n- River Resin: ${tableResin.name}\n- Ground Base: ${tableBase.name}`;
      catId = "resin";
    } else if (selectedSim === "smartmirror") {
      configString = `Smart Mirror Spec Package:\n- Category: Aura LED Smart Mirror\n- Shape: ${mirrorShape.name}\n- Light Color: ${mirrorLight.name}\n- Sandblast Option: ${mirrorService.name}`;
      catId = "glass";
    } else {
      configString = `System Window Spec Package:\n- Category: Aluminum Slim System Window\n- Frame Finish: ${windowFrame.name}\n- Acoustic Glass: ${windowGlass.name}\n- Custom Slide Opening: ${windowSlide}%`;
      catId = "glass";
    }

    onSendConfigToArchitect(configString, catId);
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
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8 border-b border-white/5 pb-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full font-mono text-[9px] tracking-widest text-gold-400 uppercase">
              <Sliders className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Bespoke Sandbox</span>
            </div>
            <WordReveal 
              as="h2"
              text="Live Material & Product Simulators"
              className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            />
            <WordReveal
              as="p"
              text="Synthesize your design specifications. Switch our digital sandbox below to preview architectural glass layouts, motorized bioclimatic pergolas, or custom live-edge epoxy river tables in real-time."
              className="font-sans text-gray-400 text-sm leading-relaxed block"
              staggerDelay={0.01}
            />
          </div>
        </div>

        {/* 5 Selectable Inline Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-12">
          {/* Block 1 */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("glass");
              setSubmitted(false);
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden ${
              selectedSim === "glass"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "glass" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Gem className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "glass" ? "text-gold-300" : "text-white"}`}>
                Glass &amp; PVD
              </h4>
              <p className="font-sans text-[10px] text-gray-400 leading-normal font-light">
                Frames &amp; partitions.
              </p>
            </div>
          </button>

          {/* Block 2 */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("pergola");
              setSubmitted(false);
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden ${
              selectedSim === "pergola"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "pergola" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-550" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "pergola" ? "text-gold-300" : "text-white"}`}>
                Pergola
              </h4>
              <p className="font-sans text-[10px] text-gray-400 leading-normal font-light">
                Bioclimatic roofings.
              </p>
            </div>
          </button>

          {/* Block 3 */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("resintable");
              setSubmitted(false);
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden ${
              selectedSim === "resintable"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "resintable" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Table className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "resintable" ? "text-gold-300" : "text-white"}`}>
                Resin Table
              </h4>
              <p className="font-sans text-[10px] text-gray-400 leading-normal font-light">
                Epoxy river designs.
              </p>
            </div>
          </button>

          {/* Block 4 */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("smartmirror");
              setSubmitted(false);
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden ${
              selectedSim === "smartmirror"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "smartmirror" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "smartmirror" ? "text-gold-300" : "text-white"}`}>
                Aura Mirror
              </h4>
              <p className="font-sans text-[10px] text-gray-400 leading-normal font-light">
                Smart LED &amp; defog.
              </p>
            </div>
          </button>

          {/* Block 5 */}
          <button
            type="button"
            onClick={() => {
              setSelectedSim("systemwindow");
              setSubmitted(false);
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 col-span-2 lg:col-span-1 cursor-pointer relative overflow-hidden ${
              selectedSim === "systemwindow"
                ? "bg-gold-500/10 border-gold-400 text-white shadow-lg shadow-gold-500/5 ring-1 ring-gold-400/20"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              selectedSim === "systemwindow" ? "bg-gold-500 text-white border-gold-400" : "bg-slate-950 border-white/10 text-gold-400"
            }`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${selectedSim === "systemwindow" ? "text-gold-300" : "text-white"}`}>
                System Sliders
              </h4>
              <p className="font-sans text-[10px] text-gray-400 leading-normal font-light">
                Slim windows &amp; doors.
              </p>
            </div>
          </button>
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
                {selectedSim === "smartmirror" && "SUITE: VISHVA-AURA-MIRROR"}
                {selectedSim === "systemwindow" && "SUITE: VISHVA-SYSTEM-SLIDERS"}
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

              {/* 4. AURA LED SMART MIRROR SIMULATOR */}
              {selectedSim === "smartmirror" && (
                <div id="product-simulator-mirror" className="relative z-10 flex flex-col items-center justify-center p-4 transition-all duration-500">
                  
                  {/* Dynamic interactive Mirror Glass element */}
                  <div 
                    className="relative transition-all duration-700 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center border"
                    style={{ 
                      borderRadius: mirrorShape.id === "arch" ? "10rem 10rem 1rem 1rem" : mirrorShape.id === "pill" ? "9999px" : "9999px",
                      width: mirrorShape.id === "arch" ? "200px" : mirrorShape.id === "pill" ? "170px" : "240px",
                      height: mirrorShape.id === "arch" ? "320px" : mirrorShape.id === "pill" ? "320px" : "240px",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(200,225,240,0.5) 50%, rgba(255,255,255,0.4) 100%)",
                      borderColor: "rgba(255,255,255,0.4)",
                      boxShadow: mirrorPower 
                        ? `${mirrorLight.glow}, inset 0 0 15px rgba(255,255,255,0.6)` 
                        : "inset 0 0 15px rgba(0,0,0,0.2)",
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    {/* Glowing LED backlight ring when on AND under sandblasted border mode */}
                    {mirrorPower && mirrorService.id === "frosted" && (
                      <div 
                        className="absolute inset-2 pointer-events-none transition-all duration-700"
                        style={{ 
                          borderRadius: mirrorShape.id === "arch" ? "9.5rem 9.5rem 0.6rem 0.6rem" : mirrorShape.id === "pill" ? "9999px" : "9999px",
                          border: "12px solid rgba(255,255,255,0.95)",
                          filter: "blur(4px)",
                          opacity: 0.95,
                          boxShadow: `0 0 20px ${mirrorLight.hex}, inset 0 0 20px ${mirrorLight.hex}`
                        }}
                      />
                    )}

                    {/* Highly polished reflex shine strip */}
                    <div className="absolute top-0 left-[-150%] w-[300%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] transform animate-[shimmer_8s_infinite] pointer-events-none z-10" />

                    {/* Smart Glass digital touch interface buttons! */}
                    <div className="absolute bottom-10 z-20 flex gap-4 bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/15">
                      {/* Touch 1: Ambient power button */}
                      <button 
                        type="button"
                        onClick={() => setMirrorPower(!mirrorPower)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${mirrorPower ? "text-gold-400 scale-110" : "text-white/60 hover:text-white"}`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                      
                      {/* Touch 2: Demister heating active indicator */}
                      <div className="relative w-5 h-5 rounded-full flex items-center justify-center text-white/40">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      </div>
                    </div>

                    <div className="text-center font-sans select-none z-10 px-4 mt-[10%]">
                      <span className="block font-mono text-[8px] tracking-[0.2em] font-bold text-gray-800/50 uppercase leading-none">
                        VISHVA DIGITAL
                      </span>
                      <span className="mt-1 block font-serif text-[10px] font-semibold text-gray-700/60 lowercase leading-tight italic">
                        {mirrorShape.name}
                      </span>
                    </div>

                    {/* Defogging soft steam circle pattern */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 blur-xl rounded-full pointer-events-none opacity-50 z-0" />
                  </div>

                  {/* Caption underneath mirror size wrapper */}
                  <div className="mt-4 text-center font-mono text-[9px] text-gray-400 flex items-center justify-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${mirrorPower ? "bg-emerald-500 animate-pulse" : "bg-red-400"} transition-colors`} />
                    <span>LED CIRCUITRY: {mirrorPower ? `ONLINE (${mirrorLight.name.split(" ")[0]})` : "STANDBY (ACTIVE DEFOG)"}</span>
                  </div>
                </div>
              )}

              {/* 5. ALUMINUM ULTRA-SLIM SYSTEM WINDOW SIMULATOR */}
              {selectedSim === "systemwindow" && (
                <div id="product-simulator-window" className="relative w-full max-w-[345px] h-96 z-10 flex flex-col justify-between p-4 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/90 border border-white/5">
                  <div className="absolute top-2.5 left-4 right-4 text-center z-25 bg-slate-900/40 border border-white/10 py-1.5 rounded-lg select-none">
                    <span className="font-mono text-[8px] text-gold-400 font-bold uppercase tracking-widest block leading-none">
                      ALUMINUM ULTRA-SLIM SYSTEM WINDOW
                    </span>
                    <span className="font-serif text-[11px] text-white font-semibold mt-1 block">
                      Elevation Model: Dual-Track Slide Assembly
                    </span>
                  </div>

                  {/* Window Casing Frame */}
                  <div 
                    className="flex-1 min-h-[225px] rounded-2xl border-4 relative overflow-hidden transition-all duration-500 mt-10 p-0 flex items-stretch"
                    style={{ 
                      borderColor: windowFrame.colorCode,
                      backgroundColor: "rgba(10,12,18,0.9)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.5)"
                    }}
                  >
                    {/* Simulated scenic view behind window */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none" 
                      style={{ 
                        backgroundImage: "linear-gradient(rgba(14, 165, 233, 0.1) 0%, rgba(220,180,100,0.1) 100%), repeating-linear-gradient(0deg, #111 0px, #111 2px, transparent 2px, transparent 15px), repeating-linear-gradient(90deg, #111 0px, #111 2px, transparent 2px, transparent 15px)"
                      }} 
                    />
                    
                    {/* Visual center vertical bar of window sash */}
                    <div 
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 transition-colors duration-500 z-10" 
                      style={{ backgroundColor: windowFrame.colorCode }}
                    />

                    {/* Window Panel 1: Stationary Right Side Panel */}
                    <div 
                      className="absolute inset-y-0 right-0 w-1/2 border-l transition-all duration-500 flex items-center justify-center p-1.5"
                      style={{ 
                        backgroundColor: windowGlass.color, 
                        borderColor: windowFrame.colorCode,
                        boxShadow: `inset 0 0 20px ${windowGlass.border}`
                      }}
                    >
                      <span className="font-serif text-[8.5px] text-white/50 lowercase italic tracking-wider select-none z-10">fixed pane</span>
                    </div>

                    {/* Window Panel 2: SLIDING Left Side Panel */}
                    <div 
                      className="absolute inset-y-0 left-0 transition-all duration-500 border-r border-l shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center z-20 group"
                      style={{ 
                        width: "50%",
                        transform: `translateX(${windowSlide * 0.9}%)`,
                        backgroundColor: windowGlass.color,
                        borderColor: windowFrame.colorCode,
                        boxShadow: `0 4px 15px rgba(0,0,0,0.4), inset 0 0 25px ${windowGlass.border}`,
                        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s, border-color 0.5s"
                      }}
                    >
                      {/* Slim vertical metal integrated pull handle grip */}
                      <div 
                        className="absolute right-1 w-2 hover:w-2.5 h-16 rounded transition-all duration-300 animate-pulse"
                        style={{ backgroundColor: windowFrame.colorCode }}
                      />

                      <div className="text-center px-2 select-none z-10">
                        <span className="block font-sans text-[7.5px] font-bold text-white/75 uppercase leading-none">VISHVA SLIDE</span>
                        <span className="mt-0.5 block font-mono text-[7px] text-gold-400 font-bold tracking-wide">
                          {windowSlide === 0 ? "LOCK CLOSED" : `${windowSlide}% OPEN`}
                        </span>
                      </div>
                    </div>

                    {/* Outer sliding track helper line */}
                    <div className="absolute bottom-1 inset-x-2 h-1 bg-white/5 rounded pointer-events-none" />

                  </div>

                  {/* Tactile Range slider embedded inside the visualizer! */}
                  <div className="mt-4 px-1 space-y-1 bg-slate-900/60 border border-white/5 p-2 rounded-xl">
                    <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                      <span>SLIDERS POSITION MECHANICS:</span>
                      <span className="text-gold-400 font-bold">{windowSlide}% EXTENDED</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={windowSlide}
                      onChange={(e) => setWindowSlide(parseInt(e.target.value))}
                      className="w-full accent-gold-550 bg-slate-950 h-1.5 rounded-lg cursor-ew-resize focus:outline-none transition-all py-0"
                    />
                  </div>

                  {/* Ground measurement data */}
                  <div className="flex justify-between items-center px-1 font-mono text-[8.5px] text-gray-500 mt-2 pt-2 border-t border-white/5">
                    <span>SPAN: 3200mm SLIDING EXTRA</span>
                    <span>FLUSH SYSTEM THRESHOLD</span>
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
              ) : selectedSim === "resintable" ? (
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
              ) : selectedSim === "smartmirror" ? (
                <>
                  <div className="space-y-1">
                    <span>01. Shape Geometry</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{mirrorShape.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Backlight Aura</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{mirrorPower ? mirrorLight.name.split(" ")[0] : "Switched Off"}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Sandblast Band</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{mirrorService.name.split(" ")[0]}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <span>01. System Frame</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{windowFrame.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span>02. Architectural Glass</span>
                    <span className="block text-white font-semibold truncate text-[10px]">{windowGlass.name.split(" ")[0]}</span>
                  </div>
                  <div className="space-y-1">
                    <span>03. Slide Aperture</span>
                    <span className="block text-gold-400 font-mono font-bold text-[10px]">{windowSlide === 0 ? "Locked Closed" : `${windowSlide}% Slid Open`}</span>
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


              {selectedSim === "smartmirror" && (
                <>
                  {/* Shape switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Mirror Shape Geometry
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {MIRROR_SHAPES.map((sh) => (
                        <button
                          key={sh.id}
                          type="button"
                          onClick={() => setMirrorShape(sh)}
                          className={`text-left px-3 py-2.5 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                            mirrorShape.id === sh.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block truncate">{sh.name.split(" ")[2] || sh.name.split(" ")[1]}</span>
                          <span className="text-[9px] text-gray-500 truncate leading-none">{sh.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed italic">
                      {mirrorShape.desc}
                    </p>
                  </div>

                  {/* Light color switchers */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Select LED Backlight Temperature
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {MIRROR_LIGHTS.map((ml) => (
                        <button
                          key={ml.id}
                          type="button"
                          onClick={() => setMirrorLight(ml)}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 w-full cursor-pointer ${
                            mirrorLight.id === ml.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <div 
                            className="w-5 h-5 rounded-full border border-white/15"
                            style={{ backgroundColor: ml.hex }}
                          />
                          <div className="flex-1 overflow-hidden leading-none">
                            <span className="block text-xs font-semibold text-white truncate">{ml.name.split(" ")[0]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sandblast options */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 3. Pick Sandblasted Border Finish
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {MIRROR_SERVICES.map((ms) => (
                        <button
                          key={ms.id}
                          type="button"
                          onClick={() => setMirrorService(ms)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 w-full cursor-pointer ${
                            mirrorService.id === ms.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block text-xs text-white">{ms.name}</span>
                          <span className="text-[10px] text-gray-500 font-light leading-tight">{ms.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}


              {selectedSim === "systemwindow" && (
                <>
                  {/* Step 1. Frame Finishes */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 1. Choose Aluminum Frame Profile Finish
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {WINDOW_FRAMES.map((wf) => (
                        <button
                          key={wf.id}
                          type="button"
                          onClick={() => setWindowFrame(wf)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 w-full cursor-pointer ${
                            windowFrame.id === wf.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div 
                              className="w-4 h-4 rounded-full border border-white/10"
                              style={{ backgroundColor: wf.colorCode }}
                            />
                            <span className="font-semibold block text-xs text-white">{wf.name}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-light leading-tight">{wf.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2. Acoustic Glass */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 2. Select Acoustic Glass Performance Pane
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {WINDOW_GLASSES.map((wg) => (
                        <button
                          key={wg.id}
                          type="button"
                          onClick={() => setWindowGlass(wg)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all text-xs flex flex-col gap-1 w-full cursor-pointer ${
                            windowGlass.id === wg.id
                              ? "bg-slate-900 border-gold-500 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-semibold block text-xs text-white">{wg.name}</span>
                          <span className="text-[10px] text-gray-500 font-light leading-tight">{wg.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3. Slide presets */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[10px] text-gold-400 tracking-widest uppercase font-semibold">
                      Step 3. Configure Slide Position Quick Presets
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "0% Locked", val: 0 },
                        { label: "50% Halfway", val: 50 },
                        { label: "100% Full Open", val: 100 }
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setWindowSlide(preset.val)}
                          className={`py-2 px-3 rounded-xl border transition-all text-[11px] font-sans text-center cursor-pointer ${
                            windowSlide === preset.val
                              ? "bg-gold-500/20 border-gold-400 text-white font-semibold shadow-md"
                              : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          {preset.label}
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
