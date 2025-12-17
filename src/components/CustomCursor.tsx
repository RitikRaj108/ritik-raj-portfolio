import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Outline position (for lerp)
  const outlinePos = useRef({ x: -100, y: -100 });
  // Animation frame reference
  const rafRef = useRef<number>();

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // LERP function for smooth interpolation
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Update dot position instantly
    const moveDot = () => {
      if (dot) {
        dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
    };

    // Animate outline with lerp (GSAP-style smooth lag)
    const animateOutline = () => {
      // Lerp factor - lower = more lag, higher = faster follow
      const lerpFactor = 0.15;
      
      outlinePos.current.x = lerp(outlinePos.current.x, mousePos.current.x, lerpFactor);
      outlinePos.current.y = lerp(outlinePos.current.y, mousePos.current.y, lerpFactor);
      
      if (outline) {
        outline.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px)`;
      }
      
      rafRef.current = requestAnimationFrame(animateOutline);
    };

    // Start the animation loop
    rafRef.current = requestAnimationFrame(animateOutline);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      moveDot();
      setIsVisible(true);
    };

    // Hover detection for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest('a, button, input, textarea, [data-cursor], [data-magnetic]');
      setIsHovering(!!interactiveElement);
    };

    // Mouse enter/leave body
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor Dot - 5px, follows instantly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Cursor Outline - 30px ring, follows with lerp lag */}
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '50px' : '30px',
          height: isHovering ? '50px' : '30px',
          border: '1px solid #fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'difference',
          marginLeft: isHovering ? '-25px' : '-15px',
          marginTop: isHovering ? '-25px' : '-15px',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Hide default cursor globally */}
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        
        html, body {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
