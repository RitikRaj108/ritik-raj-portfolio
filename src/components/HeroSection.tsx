import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useRef, useEffect, useState } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Smooth spring for parallax
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  // Track mouse for gradient interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Interactive gradient that follows mouse - more pronounced */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--foreground) / 0.04) 0%, transparent 40%)`,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.3 }}
        />
        
        {/* Secondary ambient layer */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          animate={{
            background: `radial-gradient(600px circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, hsl(var(--muted-foreground) / 0.02) 0%, transparent 50%)`,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.5 }}
        />
        
        {/* Gradient Orbs with enhanced animation */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-muted/40 via-muted/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-muted/30 via-muted/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Morphing blob - premium cinematic effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[900px] lg:h-[900px]">
          <motion.div 
            className="w-full h-full rounded-full bg-gradient-to-br from-muted/30 via-secondary/20 to-muted/10 blur-3xl"
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
              scale: [1, 1.08, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Additional subtle blob for depth */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-muted/20 to-transparent blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise" />
        
        {/* Subtle grid pattern - refined */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Fixed Social Links - Left Side */}
      <motion.div 
        className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 z-40"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="w-px h-20 bg-gradient-to-b from-transparent via-border to-border mx-auto"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.a
          href="https://github.com/RitikRaj108"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
          aria-label="GitHub"
          data-magnetic
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/ritik-raj-311236258"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
          aria-label="LinkedIn"
          data-magnetic
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="mailto:ritikraj.contact@gmail.com"
          className="p-2.5 text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
          aria-label="Email"
          data-magnetic
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Mail className="w-5 h-5" />
        </motion.a>
        <motion.div 
          className="w-px h-20 bg-gradient-to-t from-transparent via-border to-border mx-auto"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Main Content with parallax - Side by Side Layout */}
      <motion.div 
        className="container mx-auto px-6 lg:px-8 relative z-10"
        style={{ y: springY, opacity, scale }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Greeting with enhanced animation */}
              <motion.div className="overflow-hidden mb-6">
                <motion.p
                  className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Hi, I'm Ritik Raj
                </motion.p>
              </motion.div>

              {/* Main Headline with staggered text reveal */}
              <div className="mb-8">
                <motion.h1
                  className="font-heading text-display-sm md:text-display lg:text-[4rem] xl:text-display-lg leading-[0.9] tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Computer Science
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Engineer <span className="text-muted-foreground">&</span>
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block text-muted-foreground"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Full-stack Developer.
                    </motion.span>
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle with blur reveal */}
              <motion.p
                className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Building scalable enterprise solutions with expertise in full-stack development, 
                AI/ML systems, and data-driven applications.
              </motion.p>

              {/* CTA Buttons with stagger */}
              <motion.div
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button variant="premium" size="lg" asChild className="group relative overflow-hidden min-w-[160px]" data-magnetic>
                  <a href="#projects" className="relative z-10">
                    <span className="relative z-10">View Work</span>
                    <motion.span 
                      className="absolute inset-0 bg-background/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </a>
                </Button>
                <Button variant="premiumOutline" size="lg" asChild className="min-w-[160px]" data-magnetic>
                  <a href="#contact">
                    Contact
                  </a>
                </Button>
              </motion.div>

              {/* Mobile Social Links */}
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-8 mt-10 lg:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="https://github.com/RitikRaj108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/ritik-raj-311236258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:ritikraj.contact@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            {/* Right Side - Premium Hero Image */}
            <motion.div 
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow Effect Behind Image */}
              <motion.div 
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                {/* Primary glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-foreground/[0.08] via-muted/20 to-transparent blur-3xl" />
                {/* Secondary accent glow */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-tr from-muted/30 via-secondary/15 to-transparent blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Image Container with Premium Effects */}
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Soft border glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-foreground/10 via-muted/5 to-foreground/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
                
                {/* Image Frame */}
                <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px] xl:w-[460px] xl:h-[560px] rounded-[1.5rem] overflow-hidden">
                  {/* Gradient overlay for cinematic look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40 z-10 pointer-events-none" />
                  
                  {/* Hero Portrait */}
                  <motion.img
                    src="/hero-portrait.jpg"
                    alt="Ritik Raj - Computer Science Engineer"
                    className="w-full h-full object-cover object-top"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      filter: 'contrast(1.05) brightness(0.98)',
                    }}
                  />
                  
                  {/* Subtle vignette effect */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] z-10 pointer-events-none rounded-[1.5rem]" />
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/10 rounded-2xl -z-10"
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div 
                  className="absolute -top-4 -left-4 w-16 h-16 border border-foreground/10 rounded-xl -z-10"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Status Badge */}
                <motion.div 
                  className="absolute -bottom-2 left-6 sm:left-8 bg-background/90 backdrop-blur-md border border-border/60 rounded-full px-4 py-2 shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-foreground/80">Available for work</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Enhanced */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-500 group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
