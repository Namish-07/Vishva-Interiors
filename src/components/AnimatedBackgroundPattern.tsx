import { motion } from "motion/react";
import { useRef } from "react";

export default function AnimatedBackgroundPattern() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 overflow-hidden bg-slate-950"
    >
      {/* 1. Subtle blueprints grid background (Extends to the full scrollable height of the document) */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* ================= SECTION 1: HERO / TOP RIGHT (VISHVA GLASS_01) ================= */}
      <div 
        className="absolute top-[32vh] right-[4vw] w-[180px] h-[180px] md:w-[300px] md:h-[300px] opacity-[0.35]" 
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [25, 385],
            rotateY: [40, 400],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glassmorphic 3D Double-Layer Laminated Architectural Joint Box */}
          <div className="absolute inset-0 border border-gold-400/40 rounded-lg flex items-center justify-center">
            {/* Back face */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-white/10 bg-slate-950/40 backdrop-blur-xs"
              style={{ transform: "translateZ(-75px)" }}
            />
            {/* Front face with Vishva premium branding */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-gold-400/50 bg-gold-400/5 backdrop-blur-sm flex flex-col justify-between p-3"
              style={{ transform: "translateZ(75px)" }}
            >
              <div className="w-3 h-3 border-l border-t border-gold-400" />
              <div className="text-[9px] md:text-[11px] font-mono text-gold-400 font-bold self-center uppercase tracking-widest leading-none">VISHVA GLASS_01</div>
              <div className="w-3 h-3 border-r border-b border-gold-400 self-end" />
            </div>
            {/* Left face */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-white/10"
              style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
            />
            {/* Right face */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-gold-400/25"
              style={{ transform: "rotateY(90deg) translateZ(75px)" }}
            />
            {/* Top face */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-white/20"
              style={{ transform: "rotateX(90deg) translateZ(75px)" }}
            />
            {/* Bottom face */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-dashed border-white/10"
              style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
            />
            {/* Custom laminated glass pattern diagonals */}
            <div className="absolute w-[1px] h-[160px] md:h-[225px] bg-gold-400/25 transform rotate-45" />
            <div className="absolute w-[1px] h-[160px] md:h-[225px] bg-white/10 transform -rotate-45" />
          </div>
        </motion.div>
      </div>

      {/* ================= SECTION 2: SERVICES / MIDDLE LEFT (VISHVA PVD_02) ================= */}
      <div 
        className="absolute top-[135vh] left-[4vw] w-[180px] h-[180px] md:w-[280px] md:h-[280px] opacity-[0.32]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [-15, -375],
            rotateY: [35, 395],
            rotateZ: [0, -360],
          }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Hexagonal Laser-Cut Vacuum Gold-Plated PVD Screen segment */}
          <div className="absolute inset-0 border border-gold-500/30 flex items-center justify-center">
            {/* Core PVD Solid Golden Plate Ring */}
            <div 
              className="absolute w-[120px] h-[120px] md:w-[180px] md:h-[180px] border border-gold-400/40 rounded-full flex items-center justify-center p-3"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="w-full h-full border border-dashed border-gold-400/20 rounded-full flex items-center justify-center">
                <span className="text-[8px] md:text-[10px] font-mono text-gold-400 font-bold uppercase tracking-widest">VISHVA PVD_02</span>
              </div>
            </div>

            {/* Honeycomb lattice backing plates */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-white/10 bg-slate-900/40 backdrop-blur-xs rotate-45"
              style={{ transform: "translateZ(-30px)" }}
            />
            <div 
              className="absolute w-[100px] h-[100px] md:w-[150px] md:h-[150px] border border-dashed border-white/20 rotate-12"
              style={{ transform: "translateZ(-60px)" }}
            />

            {/* 3D Gold Accent struts */}
            <div className="absolute w-[2px] h-[150px] md:h-[210px] bg-gold-400/40" style={{ transform: "rotateX(45deg) translateZ(10px)" }} />
            <div className="absolute w-[2px] h-[150px] md:h-[210px] bg-gold-400/40" style={{ transform: "rotateY(45deg) translateZ(10px)" }} />
          </div>
        </motion.div>
      </div>

      {/* ================= SECTION 3: STUDIO CONFIGURATOR / MIDDLE RIGHT (VISHVA FACADE_03) ================= */}
      <div 
        className="absolute top-[255vh] right-[5vw] w-[180px] h-[250px] md:w-[300px] md:h-[400px] opacity-[0.35]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [35, 395],
            rotateY: [-30, -390],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Isometric Aluminum Façade Struts and Intersecting support columns */}
          <div className="relative w-full h-full flex flex-col items-center justify-between">
            {/* Level slab 1: Bioclimatic Pergola adjustable louvers grid */}
            <div 
              className="absolute w-[130px] md:w-[200px] h-[35px] md:h-[45px] border border-gold-400/35 bg-slate-900/60 backdrop-blur-md"
              style={{ transform: "translateY(-70px) translateZ(40px) rotateX(12deg)" }}
            >
              <div className="absolute inset-0 flex items-center justify-around gap-1 p-1">
                {/* Simulated aluminum grill fins */}
                <div className="w-1.5 h-[80%] bg-gold-400/30" />
                <div className="w-1.5 h-[80%] bg-gold-400/30" />
                <div className="w-1.5 h-[80%] bg-gold-400/30" />
                <div className="w-1.5 h-[80%] bg-white/20" />
                <div className="w-1.5 h-[80%] bg-gold-400/30" />
              </div>
              <div className="absolute top-0 right-2 text-[7px] md:text-[9px] font-mono text-gold-400 font-bold">VISHVA FACADE_03</div>
            </div>

            {/* Level slab 2: Heavy-duty roller shutter mock layout */}
            <div 
              className="absolute w-[150px] md:w-[230px] h-[30px] md:h-[40px] border border-white/20 bg-slate-950/80 backdrop-blur-sm"
              style={{ transform: "translateY(10px) rotateY(-20deg) translateZ(60px)" }}
            >
              <div className="absolute inset-0 flex flex-col justify-around p-1 opacity-50">
                <div className="h-[2px] bg-white/20" />
                <div className="h-[2px] bg-white/20" />
                <div className="h-[2px] bg-white/20" />
              </div>
              <div className="absolute left-2 bottom-1 text-[7px] md:text-[8px] font-mono text-white/50">SYSTEM_SHUTTER</div>
            </div>

            {/* Base block slab */}
            <div 
              className="absolute w-[180px] md:w-[270px] h-[30px] md:h-[35px] border border-dashed border-gold-400/25 bg-slate-900/30"
              style={{ transform: "translateY(90px) translateZ(15px)" }}
            />

            {/* Vertical aluminum structural axis core */}
            <div 
              className="w-[3px] h-[220px] md:h-[300px] bg-gradient-to-b from-gold-400/40 via-white/20 to-transparent relative"
              style={{ transform: "translateZ(0)" }}
            >
              <div className="absolute -left-1.5 top-12 w-4.5 h-4.5 rounded-full border border-gold-400/40 animate-pulse bg-gold-500/10" />
              <div className="absolute -left-[14px] top-28 w-8 h-8 rounded-full border border-dashed border-white/20" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= SECTION 4: PORTFOLIO / LOWER LEFT (VISHVA BRASS_04) ================= */}
      <div 
        className="absolute top-[385vh] left-[4vw] w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-[0.32]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [15, 375],
            rotateY: [25, 385],
          }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Detailed multi-tiered solid brass layout representation */}
          <div className="absolute inset-0 border border-white/10 flex items-center justify-center">
            {/* Double solid brass inlays floating */}
            <div 
              className="absolute w-[100px] h-[100px] md:w-[160px] md:h-[160px] border border-gold-400/45 bg-gold-400/10 backdrop-blur-xs p-3 flex flex-col justify-between"
              style={{ transform: "translateZ(50px) rotateY(15deg)" }}
            >
              <div className="w-2.5 h-2.5 border-l border-t border-gold-400" />
              <div className="text-[7px] md:text-[9px] font-mono text-gold-400 font-bold uppercase tracking-widest text-center">VISHVA BRASS_04</div>
              <div className="w-2.5 h-2.5 border-r border-b border-gold-400 self-end" />
            </div>

            {/* Deep backing brass casting frame */}
            <div 
              className="absolute w-[120px] h-[120px] md:w-[180px] md:h-[180px] border border-dashed border-white/10 bg-slate-900/60"
              style={{ transform: "translateZ(-40px) rotateX(-15deg)" }}
            />

            {/* Brass inlay geometric coordinates */}
            <div className="absolute w-[140px] md:w-[210px] h-[1px] bg-gold-400/30 transform rotate-45" />
            <div className="absolute w-[140px] md:w-[210px] h-[1px] bg-white/15 transform -rotate-45" />
          </div>
        </motion.div>
      </div>

      {/* ================= SECTION 5: HERITAGE & CONTACT / LOWER RIGHT (VISHVA EPOXY_05) ================= */}
      <div 
        className="absolute top-[515vh] right-[4vw] w-[180px] h-[180px] md:w-[260px] md:h-[260px] opacity-[0.3]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            rotateX: [30, 390],
            rotateY: [-20, -380],
            rotateZ: [10, 370],
          }}
          transition={{
            duration: 75,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dynamic flowing resin epoxy slabs styled with wood live-edge configurations */}
          <div className="relative w-full h-full border border-white/10 flex items-center justify-center">
            {/* Translucent liquid epoxy pouring layer */}
            <div 
              className="absolute w-[110px] h-[110px] md:w-[170px] md:h-[170px] border border-sky-400/40 bg-sky-400/10 backdrop-blur-md flex flex-col justify-between p-3"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="w-2 h-2 border-l border-t border-sky-300" />
              <span className="text-[8px] md:text-[9px] font-mono text-sky-300 font-bold tracking-widest leading-none">VISHVA EPOXY_05</span>
              <div className="w-2 h-2 border-r border-b border-sky-300 self-end" />
            </div>

            {/* Solid organic timber backplate */}
            <div 
              className="absolute w-[130px] h-[130px] md:w-[190px] md:h-[190px] border border-gold-400/25 bg-slate-900/50"
              style={{ transform: "translateZ(-30px) rotateZ(10deg)" }}
            >
              {/* Grain vector simulations */}
              <div className="absolute top-2 bottom-2 left-6 w-[1.5px] bg-gold-400/10 rounded-full" />
              <div className="absolute top-4 bottom-4 left-16 w-[1.5px] bg-gold-400/10 rounded-full" />
              <div className="absolute top-2 bottom-2 left-24 w-[1.5px] bg-gold-400/10 rounded-full" />
            </div>

            <div 
              className="absolute w-[90px] h-[90px] md:w-[140px] md:h-[140px] border border-dashed border-white/15"
              style={{ transform: "translateZ(80px) rotateZ(-12deg)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* ================= BACKGROUND GLOWS ================= */}
      <div 
        className="absolute top-[80vh] left-1/4 w-[500px] h-[500px] rounded-full bg-gold-400/[0.04] blur-3.5xl pointer-events-none"
      />
      <div 
        className="absolute top-[280vh] right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/[0.035] blur-3.5xl pointer-events-none"
      />
      <div 
        className="absolute top-[450vh] left-1/3 w-[550px] h-[550px] rounded-full bg-sky-500/[0.03] blur-3.5xl pointer-events-none"
      />
    </div>
  );
}
