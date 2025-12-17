import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0); // 0: hi, 1: i am, 2: name, 3: exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),   // Show "I am"
      setTimeout(() => setStage(2), 1200),  // Show "Ritik Raj"
      setTimeout(() => setStage(3), 2800),  // Start exit
      setTimeout(() => onComplete(), 3400), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden"
          exit={{ 
            scale: 1.1,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle purple glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: '#A100FF' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Text container */}
          <div className="relative z-10 text-center">
            {/* Hi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <span className="text-muted-foreground text-lg md:text-xl font-light tracking-wide">
                Hi,
              </span>
            </motion.div>

            {/* I am */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: stage >= 1 ? 1 : 0, 
                y: stage >= 1 ? 0 : 30 
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2"
            >
              <span className="text-muted-foreground text-lg md:text-xl font-light tracking-wide">
                I am
              </span>
            </motion.div>

            {/* Ritik Raj */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ 
                opacity: stage >= 2 ? 1 : 0, 
                scale: stage >= 2 ? 1 : 0.8,
                y: stage >= 2 ? 0 : 40 
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <motion.span 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground"
                animate={stage >= 2 ? {
                  textShadow: [
                    '0 0 0px transparent',
                    '0 0 30px rgba(161, 0, 255, 0.5)',
                    '0 0 0px transparent'
                  ]
                } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Ritik
                <span className="text-[#A100FF]"> Raj</span>
              </motion.span>
            </motion.div>

            {/* Underline animation */}
            <motion.div
              className="mt-6 mx-auto h-[2px] bg-[#A100FF] rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: stage >= 2 ? 120 : 0, 
                opacity: stage >= 2 ? 1 : 0 
              }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
