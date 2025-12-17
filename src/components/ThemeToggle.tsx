import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check localStorage on mount - default to light mode
    const stored = localStorage.getItem('theme');
    
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // Ensure light mode is set
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      if (!stored) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(var(--muted) / 0.5) 0%, transparent 100%)'
          : 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 100%)',
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, hsl(var(--foreground) / 0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
      />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-xl border border-border/50 group-hover:border-border transition-colors duration-300" />
      
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Moon className="h-5 w-5 text-foreground" />
            {/* Stars decoration */}
            <motion.span
              className="absolute -top-1 -right-1 w-1 h-1 bg-foreground/60 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0.8] }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <motion.span
              className="absolute -bottom-0.5 -left-1.5 w-0.5 h-0.5 bg-foreground/40 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0.6] }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Sun className="h-5 w-5 text-foreground" />
            {/* Sun rays animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute w-7 h-7 rounded-full border border-dashed border-foreground/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
