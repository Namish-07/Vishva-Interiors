import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Disable body scroll when loader mounts
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable body scroll when loader unmounts
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    // Non-linear simulation of loading files for premium feel (stops, jumps, then finishes)
    let current = 0;
    const intervalRef = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2; // Jump by 2 to 10%
      current += increment;

      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef);
        // Let user see 100% for a brief perfect moment, then start sliding transition
        setTimeout(() => {
          setIsFinishing(true);
          // Wait for curtain animation to complete before unmounting
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 600);
      }

      setProgress(current);
    }, 80);

    return () => clearInterval(intervalRef);
  }, [onComplete]);

  // Characters corresponding to "VISHVA INTERIORS" for staggered reveal
  const brandWord1 = "VISHVA".split("");
  const brandWord2 = "INTERIORS".split("");

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          id="global-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#05070a] z-[9999] flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none"
        >
          {/* Subtle Ambient Glowing Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(177,132,59,0.08)_0%,rgba(5,7,10,0)_70%)] pointer-events-none" />

          {/* Thin aesthetic structural outline to match high-end blueprints */}
          <div className="absolute inset-6 md:inset-10 border border-white/5 pointer-events-none flex flex-col justify-between p-4">
            <div className="flex justify-between">
              <div className="w-5 h-5 border-t border-l border-gold-500/20" />
              <div className="w-5 h-5 border-t border-r border-gold-500/20" />
            </div>
            <div className="flex justify-between">
              <div className="w-5 h-5 border-b border-l border-gold-500/20" />
              <div className="w-5 h-5 border-b border-r border-gold-500/20" />
            </div>
          </div>

          {/* TOP BAR: Estd Label */}
          <div className="relative z-10 flex justify-between items-center font-mono text-[9px] tracking-[0.3em] uppercase text-gray-500">
            <span>VISHVA ARCHITECTURAL STUDIO</span>
            <span className="flex items-center gap-1.5 text-gold-400">
              <Sparkles className="w-3 h-3 animate-pulse" /> ESTD 2012
            </span>
          </div>

          {/* CENTER PANEL: Brand reveal with staggered letters */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto">
            {/* Animated Gold Logo - Clickable Maps Redirect */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onClick={() => window.open("https://maps.app.goo.gl/6EDexhSqfoHztf4X9", "_blank")}
              title="Click to locate on Google Maps"
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 p-[1px] flex items-center justify-center shadow-2xl shadow-gold-500/10 mb-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-full h-full rounded-2xl bg-[#0a0e14] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="flex items-center justify-center"
                >
                  <Compass className="w-7 h-7 text-gold-400 animate-pulse" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title staggered spelling */}
            <div className="space-y-3">
              <div className="flex flex-col items-center justify-center">
                {/* Word 1 - VISHVA */}
                <div className="flex gap-2.5 sm:gap-4 justify-center">
                  {brandWord1.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.15 + index * 0.08, 
                        duration: 0.8, 
                        ease: [0.215, 0.61, 0.355, 1] 
                      }}
                      className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-white uppercase"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* Word 2 - INTERIORS */}
                <div className="flex gap-1.5 sm:gap-2.5 justify-center mt-2.5">
                  {brandWord2.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ 
                        delay: 0.6 + index * 0.05, 
                        duration: 1 
                      }}
                      className="font-mono text-[9px] sm:text-xs tracking-[0.4em] text-gold-400 uppercase font-light"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-sans text-[10px] sm:text-xs text-gray-300 font-light tracking-widest max-w-[280px] sm:max-w-md mx-auto leading-relaxed"
              >
                PREMIUM GLASS • ALUMINUM • PVD • BRASS • EPOXY RESIN
              </motion.p>
            </div>
          </div>

          {/* BOTTOM BAR: Loading info & progress tracker */}
          <div className="relative z-10 flex items-end justify-between font-mono">
            {/* Context/Location */}
            <div className="text-left text-gray-500 text-[10px] tracking-wider space-y-1">
              <span className="block">HEADQUARTERS: VISAKHAPATNAM</span>
              <span className="block italic text-[9px] text-gray-600 font-sans">Crafting spaces that last.</span>
            </div>

            {/* The Big elegant Percentage Counter */}
            <div className="text-right flex flex-col items-end">
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl md:text-6xl font-sans font-light tracking-tighter tabular-nums">
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl text-gold-500 font-light">%</span>
              </div>
              <div className="w-32 md:w-48 h-[1px] bg-white/10 mt-2 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-gold-500 to-gold-300"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
