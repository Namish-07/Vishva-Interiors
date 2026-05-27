import { motion } from "motion/react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function WordReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.02, // snappier, faster stagger
  duration = 0.5, // fast, responsive
  as = "p",
}: WordRevealProps) {
  const Tag = as;

  // Split text into words, keeping whitespace
  const words = text.split(/\s+/);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      rotateX: 18, 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Custom snappy sleek ease-out Bezier curve
      },
    },
  };

  return (
    <Tag className={`${className} inline-block select-none overflow-hidden`} style={{ perspective: "600px" }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {words.map((word, index) => {
          // Double safeguard to bypass any empty elements
          if (!word.trim()) return null;
          
          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className="inline-block origin-bottom will-change-transform text-current"
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
