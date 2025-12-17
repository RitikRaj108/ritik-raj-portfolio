import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  
  // Use refs for position to avoid re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Mouse Move Event
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Move the small dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    // 2. Hover Effects (Scale up on links/buttons)
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        if (outlineRef.current) outlineRef.current.classList.add('hovered');
      }
    };
    
    const handleMouseOut = (e) => {
       if (outlineRef.current) outlineRef.current.classList.remove('hovered');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver); // Using delegation for better performance
    document.addEventListener('mouseout', handleMouseOut);

    // 3. Animation Loop (Smooth "Lag" Effect)
    const animate = () => {
      // Linear Interpolation (Lerp) for smoothness
      // 0.15 is the speed. Lower = slower/more lag.
      const speed = 0.15;
      
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * speed;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * speed;

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlinePos.current.x}px`;
        outlineRef.current.style.top = `${outlinePos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
};

export default Cursor;
