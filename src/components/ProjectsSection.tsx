import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Button } from './ui/button';
import { MiniCard } from './ui/mini-card';

// Premium 3D Card component
function Project3DCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.03) 45%, hsl(var(--foreground) / 0.06) 50%, hsl(var(--foreground) / 0.03) 55%, transparent 60%)",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

const projects = [
  {
    title: 'Melora',
    subtitle: 'Music Recommendation System',
    date: 'Mar 2025',
    description: 'Full-stack recommendation engine with bidirectional Spotify playlist synchronization. Features secure OAuth 2.0 authentication, real-time listening history analysis, and personalized playlist generation.',
    highlights: [
      'Bidirectional Spotify playlist sync',
      'Secure OAuth 2.0 authentication',
      'Real-time listening history analysis',
      'Personalized playlist generation',
    ],
    techStack: ['Spring Boot', 'React.js', 'Spotify API', 'OAuth 2.0'],
    year: '2025',
    github: 'https://github.com/RitikRaj108/Music-Recommender',
    featured: true,
  },
  {
    title: 'SnapEntry',
    subtitle: 'Student Entry/Exit System',
    date: 'Dec 2025',
    description: 'Progressive Web App for real-time student tracking using QR codes. Features offline access and local storage support, managing 1000+ student records with reduced manual errors.',
    highlights: [
      'QR-based real-time tracking',
      'Offline access & local storage',
      'Managed 1000+ student records',
      'Reduced manual record errors',
    ],
    techStack: ['React.js', 'Express.js', 'Netlify', 'PWA'],
    year: '2025',
    github: 'https://github.com/RitikRaj108/SnapEntry-PWA',
    demo: 'https://692efd95d4f68c130ec8971f--kaleidoscopic-snickerdoodle-d02eef.netlify.app/',
    featured: true,
  },
  {
    title: 'EV Battery Health Management',
    subtitle: 'ML Prediction System',
    date: 'Sept 2024',
    description: 'Machine learning system predicting EV battery health with 94% accuracy using Random Forest and XGBoost models. Provides data-driven battery maintenance insights.',
    highlights: [
      '94% prediction accuracy',
      'Random Forest & XGBoost models',
      'Data-driven maintenance insights',
    ],
    techStack: ['Python', 'Machine Learning', 'Random Forest', 'XGBoost'],
    year: '2024',
    github: 'https://github.com/RitikRaj108/ev-battery-management',
    featured: true,
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Staggered reveal animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
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
    <section id="projects" className="py-16 lg:py-24 relative" ref={ref}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />
      
      {/* Ambient floating orbs */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-muted/10 to-transparent blur-3xl opacity-50"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Enhanced */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-24">
            <div>
              <motion.span
                className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Featured Work
              </motion.span>
              <motion.h2
                className="font-heading text-display-sm lg:text-display leading-[0.95]"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Projects that
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-muted-foreground"
                    initial={{ y: '100%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    make impact.
                  </motion.span>
                </span>
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg mt-6 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                A selection of projects demonstrating full-stack development, AI/ML integration, and scalable architecture.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button variant="premiumOutline" size="lg" asChild className="mt-10 lg:mt-0 group" data-magnetic>
                <a href="https://github.com/RitikRaj108" target="_blank" rel="noopener noreferrer">
                  View All
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Projects Grid - Enhanced Case Study Style */}
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.article
                key={project.title}
                className="group relative"
                variants={itemVariants}
              >
                <MiniCard className="!rounded-3xl">
                  <Project3DCard className="relative">
                    <div className="p-8 lg:p-12 xl:p-16 relative overflow-hidden">
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative z-10">
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-5">
                          <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
                            {project.date}
                          </span>
                          <span className="w-10 h-px bg-border group-hover:w-16 group-hover:bg-foreground/30 transition-all duration-500" />
                          <span className="text-xs text-muted-foreground tracking-wide">
                            {project.subtitle}
                          </span>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 group-hover:text-foreground transition-colors duration-500">
                        {project.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl mb-8 group-hover:text-muted-foreground/80 transition-colors duration-500">
                        {project.description}
                      </p>

                      {/* Highlights Grid - Case Study Style */}
                      {project.highlights && (
                        <div className="grid sm:grid-cols-2 gap-3 mb-10">
                          {project.highlights.map((highlight, hIndex) => (
                            <motion.div
                              key={hIndex}
                              className="flex items-start gap-3 text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + hIndex * 0.1, duration: 0.4 }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2.5 mb-10">
                        {project.techStack.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 text-xs font-medium border border-border/60 rounded-full text-muted-foreground bg-background/50 backdrop-blur-sm group-hover:border-foreground/20 group-hover:bg-foreground/5 transition-all duration-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + techIndex * 0.05, duration: 0.4 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border/60 rounded-full text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </motion.a>
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all duration-500"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Live Demo
                            <ArrowUpRight className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </Project3DCard>
                </MiniCard>
              </motion.article>
            ))}
          </motion.div>

          {/* Other Projects - Minimal List Enhanced */}
          <motion.div
            className="mt-20 pt-20 border-t border-border/50"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-10 font-medium">
              Other Projects
            </h3>
            <div className="space-y-0">
              {projects.filter(p => !p.featured).map((project, index) => (
                <motion.a
                  key={project.title}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-6 border-b border-border/30 group hover:border-foreground/20 transition-all duration-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center gap-8">
                    <span className="text-sm text-muted-foreground font-medium w-12">{project.year}</span>
                    <span className="font-heading font-semibold text-lg text-foreground group-hover:text-muted-foreground transition-colors duration-500">
                      {project.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
