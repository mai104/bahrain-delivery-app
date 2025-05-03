import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../../components/ui/Button3D';
import gsap from 'gsap';

const NotFound3D = () => {
  const { isArabic } = useLanguage();
  const bubblesRef = useRef(null);
  const contentRef = useRef(null);
  
  // Texts based on language
  const texts = {
    title: isArabic ? '404 - الصفحة غير موجودة' : '404 - Page Not Found',
    description: isArabic 
      ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.'
      : 'Sorry, the page you are looking for does not exist, has been moved, or deleted.',
    goHome: isArabic ? 'العودة للرئيسية' : 'Go Home',
    exploreServices: isArabic ? 'استكشف خدماتنا' : 'Explore Our Services',
  };
  
  // Create floating bubbles effect
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const createBubbles = () => {
      const container = bubblesRef.current;
      
      for (let i = 0; i < 25; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 80 + 20;
        const startPositionX = Math.random() * 100;
        const startPositionY = Math.random() * 100;
        
        bubble.className = 'absolute rounded-full bg-gradient-to-br from-primary/5 to-blue-500/10 backdrop-blur-3xl';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${startPositionX}%`;
        bubble.style.top = `${startPositionY}%`;
        bubble.style.opacity = '0';
        
        container.appendChild(bubble);
        
        gsap.to(bubble, {
          y: `${(Math.random() - 0.5) * 100}%`,
          x: `${(Math.random() - 0.5) * 100}%`,
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    };
    
    createBubbles();
    
    return () => {
      if (bubblesRef.current) {
        bubblesRef.current.innerHTML = '';
      }
    };
  }, []);
  
  // Animation for content
  useEffect(() => {
    if (!contentRef.current) return;
    
    gsap.fromTo(
      contentRef.current.querySelectorAll('.animate-item'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
    
    // Animate 404 number
    gsap.fromTo(
      contentRef.current.querySelector('.number-404'),
      { 
        scale: 0.5, 
        opacity: 0,
        rotationY: -90,
      },
      { 
        scale: 1, 
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated bubbles */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-gray-900 dark:to-blue-900">
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative" ref={contentRef}>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="text-9xl font-bold mb-8 text-primary dark:text-primary-light relative number-404">
            <span className="drop-shadow-2xl">404</span>
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary-dark/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Text */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 animate-item">
            {texts.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-item">
            {texts.description}
          </p>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-item">
            <Link to="/">
              <Button3D 
                variant="primary" 
                size="lg"
                className="shadow-lg"
              >
                {texts.goHome}
              </Button3D>
            </Link>
            
            <Link to="/services">
              <Button3D 
                variant="glass" 
                size="lg"
                className="border border-white/20 backdrop-blur-sm"
              >
                {texts.exploreServices}
              </Button3D>
            </Link>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -bottom-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 dark:via-primary-dark/30 to-transparent mt-16 animate-item"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
      
      {/* 3D Objects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Water drop */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating cube */}
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-lg bg-primary/10 dark:bg-primary-dark/10 border border-primary/20 dark:border-primary-dark/20 backdrop-blur-sm"
          animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 45, 0],
            rotateY: [0, 45, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default NotFound3D;
