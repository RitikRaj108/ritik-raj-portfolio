import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skills = {
  'Languages': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL'],
  'Frontend': ['React.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  'Backend': ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs'],
  'Database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'],
  'Cloud & Tools': ['AWS', 'Docker', 'Git', 'Postman', 'Netlify'],
  'AI/ML': ['Machine Learning', 'NLP', 'Data Analytics', 'Pandas'],
};

export function SkillsSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const reverseMarqueeX = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="skills" className="py-36 lg:py-48 relative overflow-hidden bg-surface/30" ref={containerRef}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Ambient glow */}
      <motion.div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-muted/10 to-transparent blur-3xl opacity-40"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Enhanced */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6 font-medium">
              Technologies
            </span>
            <h2 className="font-heading text-display-sm lg:text-display leading-[0.95]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Tech Stack
                </motion.span>
              </span>
            </h2>
          </motion.div>

          {/* Skills Grid - Enhanced */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="group"
              >
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-medium flex items-center gap-3">
                  <motion.span 
                    className="w-8 h-px bg-border"
                    whileHover={{ width: 48, backgroundColor: 'hsl(var(--foreground) / 0.5)' }}
                    transition={{ duration: 0.3 }}
                  />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-5 py-2.5 text-sm border border-border/60 rounded-full text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.03, duration: 0.4 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Marquee - Enhanced with scroll-linked animation */}
          <motion.div
            className="mt-28 overflow-hidden -mx-6 lg:-mx-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* First row - moves left */}
            <motion.div 
              className="flex gap-12"
              style={{ x: marqueeX }}
            >
              <div className="flex gap-12 animate-marquee">
                {[...Object.values(skills).flat().slice(0, 12), ...Object.values(skills).flat().slice(0, 12)].map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="text-5xl lg:text-7xl xl:text-8xl font-heading font-bold text-muted/15 whitespace-nowrap select-none transition-colors duration-300 hover:text-muted/30"
                    style={{ WebkitTextStroke: '1px hsl(var(--muted) / 0.08)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Second row - moves right (opposite direction) */}
            <motion.div 
              className="flex gap-12"
              style={{ x: reverseMarqueeX }}
            >
              <div className="flex gap-12 animate-marquee-reverse">
                {[...Object.values(skills).flat().slice(12), ...Object.values(skills).flat().slice(12)].map((skill, index) => (
                  <span
                    key={`${skill}-reverse-${index}`}
                    className="text-5xl lg:text-7xl xl:text-8xl font-heading font-bold text-muted/10 whitespace-nowrap select-none transition-colors duration-300 hover:text-muted/25"
                    style={{ WebkitTextStroke: '1px hsl(var(--muted) / 0.05)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
