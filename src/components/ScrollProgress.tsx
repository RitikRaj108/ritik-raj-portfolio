import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Create a glow effect that intensifies as you scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.8]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Glow effect underneath */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] origin-left z-[99] blur-sm"
        style={{ 
          scaleX,
          opacity: glowOpacity,
          background: 'linear-gradient(90deg, hsl(var(--foreground) / 0.5), hsl(var(--foreground) / 0.8))'
        }}
      />
    </>
  );
}
