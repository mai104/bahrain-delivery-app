import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';

const BackgroundBubbles = () => {
  const bubblesRef = useRef(null);
  const { darkMode } = useTheme();
  
  // Create floating bubbles effect
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const createBubbles = () => {
      const container = bubblesRef.current;
      
      for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 80 + 20;
        const startPositionX = Math.random() * 100;
        
        // Adjust bubble styling based on dark/light mode
        bubble.className = `absolute rounded-full ${
          darkMode 
            ? 'bg-gradient-to-br from-primary/5 to-blue-500/10'
            : 'bg-gradient-to-br from-primary/15 to-blue-500/20'
        } backdrop-blur-3xl`;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${startPositionX}%`;
        bubble.style.bottom = '-20%';
        bubble.style.opacity = '0';
        
        container.appendChild(bubble);
        
        gsap.to(bubble, {
          y: `-${Math.random() * 100 + 100}%`,
          x: (Math.random() - 0.5) * 50,
          opacity: darkMode ? Math.random() * 0.4 + 0.1 : Math.random() * 0.3 + 0.2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          repeat: -1,
          repeatRefresh: true,
          ease: 'power1.out',
        });
      }
    };
    
    createBubbles();
    
    return () => {
      if (bubblesRef.current) {
        bubblesRef.current.innerHTML = '';
      }
    };
  }, [darkMode]);
  
  return <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />;
};

export default BackgroundBubbles;
