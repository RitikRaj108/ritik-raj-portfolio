import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if mobile - use very fast timings
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    
    if (isMobile) {
      // Skip preloader on mobile completely for best performance
      setTimeout(() => onComplete(), 100);
      return;
    }
    
    // Desktop timings
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setIsExiting(true), 2800),
      setTimeout(() => onComplete(), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && (window.innerWidth < 768 || ('ontouchstart' in window))) {
    return null;
  }

  if (isExiting) {
    return (
      <div 
        className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden opacity-0"
        style={{ transition: 'opacity 0.3s ease-out' }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden">
      {/* Text container */}
      <div className="relative z-10 text-center px-4">
        {/* Hi */}
        <div style={{ opacity: stage >= 0 ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <span className="text-muted-foreground text-base md:text-xl font-light tracking-wide">
            Hi,
          </span>
        </div>

        {/* I am */}
        <div style={{ opacity: stage >= 1 ? 1 : 0, transition: 'opacity 0.3s ease', marginTop: '0.5rem' }}>
          <span className="text-muted-foreground text-base md:text-xl font-light tracking-wide">
            I am
          </span>
        </div>

        {/* Ritik Raj */}
        <div style={{ 
          opacity: stage >= 2 ? 1 : 0, 
          transform: stage >= 2 ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          marginTop: '0.75rem'
        }}>
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Ritik
            <span className="text-[#A100FF]"> Raj</span>
          </span>
        </div>

        {/* Underline */}
        <div 
          style={{
            width: stage >= 2 ? '5rem' : '0',
            opacity: stage >= 2 ? 1 : 0,
            transition: 'width 0.5s ease, opacity 0.3s ease',
            marginTop: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '2px',
            background: '#A100FF',
            borderRadius: '9999px'
          }}
        />
      </div>
    </div>
  );
}
