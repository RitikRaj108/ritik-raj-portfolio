import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 lg:py-24 border-t border-border/50 relative overflow-hidden" ref={footerRef}>
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent pointer-events-none" />
      
      {/* Ambient glow */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-radial from-muted/10 to-transparent blur-3xl opacity-50"
        style={{ opacity }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Large CTA Text */}
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            style={{ opacity, y }}
          >
            <motion.h3 
              className="font-heading text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <span className="text-muted-foreground">Let's create</span>
              <br />
              <span className="text-foreground">something great.</span>
            </motion.h3>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-10 border-t border-border/30">
            {/* Left - Logo & Copyright */}
            <motion.div 
              className="flex flex-col items-center lg:items-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="font-heading font-bold text-3xl tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                R<span className="text-muted-foreground">.</span>
              </motion.span>
              <p className="text-sm text-muted-foreground">
                © {currentYear} Ritik Raj. All rights reserved.
              </p>
            </motion.div>

            {/* Center - Social Links */}
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                { href: "https://github.com/RitikRaj108", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/ritik-raj-311236258", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:ritikraj.contact@gmail.com", icon: Mail, label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-foreground hover:border-foreground transition-all duration-500"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Right - Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <span className="tracking-wide text-xs uppercase">Back to top</span>
              <motion.div 
                className="w-11 h-11 rounded-full border-2 border-border/60 flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
