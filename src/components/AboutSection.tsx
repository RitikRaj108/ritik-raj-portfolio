import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MiniCard } from './ui/mini-card';

export function AboutSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { value: '4+', label: 'Projects Built' },
    { value: '1', label: 'Internship' },
    { value: '10+', label: 'Technologies' },
    { value: '1K+', label: 'Users Served' },
  ];

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-16 lg:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent"
        style={{ y: backgroundY }}
      />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-muted/30 to-transparent blur-3xl opacity-50" />
      
      <div className="container mx-auto relative" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Label - Enhanced */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              About
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
            {/* Left Column - Main Content */}
            <div className="space-y-10">
              <motion.h2
                className="font-heading text-display-sm lg:text-display leading-[0.95]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Passionate About
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Building <span className="text-muted-foreground">Enterprise</span>
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-muted-foreground"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Solutions.
                  </motion.span>
                </span>
              </motion.h2>

              <motion.div
                className="space-y-7 text-muted-foreground text-lg lg:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>
                  I'm a Computer Science undergraduate at <span className="text-foreground font-medium">Indian Institute of Information Technology Guwahati</span>, 
                  focused on building software that solves real problems and scales with demand.
                </p>
                <p>
                  I work primarily with React, Node.js, and modern databases — tools I've used to ship applications 
                  that handle real traffic and serve actual users. I care about writing code that's maintainable, 
                  not just functional.
                </p>
                <p>
                  During my time at <span className="text-foreground font-medium">AshwaQuant</span>, I learned what it means 
                  to build under constraints: tight deadlines, evolving requirements, and teams where clear communication 
                  matters as much as technical skill.
                </p>
                <p>
                  I'm drawn to projects where the work has visible impact — whether that's improving a user experience, 
                  optimizing a backend process, or building something from scratch that people actually use.
                </p>
              </motion.div>

              {/* Stats Grid - Enhanced with stagger */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center lg:text-left group"
                    variants={itemVariants}
                  >
                    <motion.div 
                      className="text-4xl lg:text-5xl font-heading font-bold text-foreground"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground mt-2 tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Details Enhanced */}
            <motion.div
              className="space-y-12 lg:pt-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Current Focus - Enhanced card */}
              <MiniCard>
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                  Current Focus
                </h3>
                <p className="text-foreground text-lg lg:text-xl leading-relaxed">
                  Seeking software engineering opportunities where I can contribute to innovative 
                  projects and continue growing as a developer.
                </p>
              </MiniCard>

              {/* Education */}
              <MiniCard>
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-foreground font-medium text-lg">B.Tech in Computer Science & Engineering</p>
                    <p className="text-muted-foreground">Indian Institute of Information Technology Guwahati • Present</p>
                  </div>
                </div>
              </MiniCard>

              {/* Expertise - Enhanced pills */}
              <MiniCard>
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                  Core Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Full-Stack Development', 'React.js', 'Node.js', 'AI/ML', 'System Design', 'Database Architecture'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-5 py-2.5 text-sm border border-border/60 rounded-full text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </MiniCard>

              {/* Location */}
              <MiniCard>
                <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                  Location
                </h3>
                <p className="text-foreground text-lg">
                  Guwahati, India • <span className="text-muted-foreground">Open to Remote</span>
                </p>
              </MiniCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
