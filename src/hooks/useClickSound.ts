import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Premium soft tap sound - multiple sources for reliability
const SOUND_SOURCES = [
  'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft UI click
  'https://cdn.pixabay.com/audio/2022/03/15/audio_7c07f67a3a.mp3', // Soft click
];

let howlInstance: Howl | null = null;

// Initialize Howler sound
const initSound = (): Howl => {
  if (!howlInstance) {
    howlInstance = new Howl({
      src: SOUND_SOURCES,
      volume: 0.25, // Subtle but audible
      preload: true,
      html5: false, // Use Web Audio API for better performance
      pool: 5,
    });
    
    // Log when sound is loaded
    howlInstance.on('load', () => {
      console.log('Click sound loaded successfully');
    });
    
    howlInstance.on('loaderror', (id, err) => {
      console.error('Sound load error:', err);
    });
  }
  return howlInstance;
};

export function useClickSound() {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = initSound();
  }, []);

  const playClick = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  }, []);

  return playClick;
}

// Global click sound setup - attaches to buttons, links, and interactive elements
export function setupGlobalClickSound() {
  // Skip on mobile/touch devices for better performance
  const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) ||
                        (window.matchMedia('(pointer: coarse)').matches);
  
  if (isTouchDevice) {
    return () => {}; // Return empty cleanup function
  }

  let sound: Howl | null = null;
  
  // Initialize sound immediately
  sound = initSound();

  const playSound = () => {
    if (sound && sound.state() === 'loaded') {
      sound.play();
    }
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if clicked element is interactive
    const isInteractive = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'SELECT' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('[role="tab"]') ||
      target.closest('[role="menuitem"]') ||
      target.closest('.accenture-card') ||
      target.closest('.mini-card') ||
      target.closest('[data-clickable]') ||
      target.classList.contains('clickable') ||
      getComputedStyle(target).cursor === 'pointer';

    if (isInteractive) {
      playSound();
    }
  };

  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };
}
