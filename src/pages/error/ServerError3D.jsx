import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../../components/ui/Button3D';
import gsap from 'gsap';

const ServerError3D = () => {
  const { isArabic } = useLanguage();
  const bubblesRef = useRef(null);
  const contentRef = useRef(null);
  
  // Texts based on language
  const texts = {
    title: isArabic ? '500 - خطأ في الخادم' : '500 - Server Error',
    description: isArabic 
      ? 'عذراً، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى في وقت لاحق أو الاتصال بفريق الدعم.'
      : 'Sorry, something went wrong on our server. Please try again later or contact our support team.',
    tryAgain: isArabic ? 'المحاولة مرة أخرى' : 'Try Again',
    goHome: isArabic ? 'العودة للرئيسية' : 'Go Home',
    contactSupport: isArabic ? 'اتصل بالدعم' : 'Contact Support',
  };
  
  // Create floating particles effect
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const createParticles = () => {
      const container = bubblesRef.current;
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 2;
        const startPositionX = Math.random() * 100;
        const startPositionY = Math.random() * 100;
        
        // Randomly choose between circular and square particles
        const isCircle = Math.random() > 0.3;
        particle.className = `absolute ${isCircle ? 'rounded-full' : 'rotate-45'} bg-gradient-to-br ${
          Math.random() > 0.5 
            ? 'from-primary/20 to-blue-500/30' 
            : 'from-accent/20 to-red-500/30'
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startPositionX}%`;
        particle.style.top = `${startPositionY}%`;
        particle.style.opacity = '0';
        
        container.appendChild(particle);
        
        gsap.to(particle, {
          y: `${(Math.random() - 0.5) * 200}%`,
          x: `${(Math.random() - 0.5) * 200}%`,
          rotate: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 30 + 20,
          delay: Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    };
    
    createParticles();
    
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
    
    // Animate 500 number
    gsap.fromTo(
      contentRef.current.querySelector('.number-500'),
      { 
        scale: 0.5, 
        opacity: 0,
        rotateX: -90,
      },
      { 
        scale: 1, 
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        ease: 'back.out(1.5)',
      }
    );
    
    // Animate glitch effect
    const glitchElem = contentRef.current.querySelector('.glitch-effect');
    if (glitchElem) {
      const glitchAnimation = () => {
        gsap.to(glitchElem, {
          x: () => (Math.random() - 0.5) * 10,
          y: () => (Math.random() - 0.5) * 10,
          skewX: () => (Math.random() - 0.5) * 5,
          duration: 0.1,
          onComplete: () => {
            gsap.to(glitchElem, {
              x: 0,
              y: 0,
              skewX: 0,
              duration: 0.1,
              onComplete: () => {
                // Random chance to trigger glitch again
                if (Math.random() > 0.8) {
                  setTimeout(glitchAnimation, Math.random() * 2000);
                } else {
                  setTimeout(glitchAnimation, Math.random() * 5000 + 3000);
                }
              }
            });
          }
        });
      };
      
      setTimeout(glitchAnimation, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated particles */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900">
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative" ref={contentRef}>
        <div className="max-w-2xl mx-auto text-center">
          {/* 500 Number */}
          <div className="text-9xl font-bold mb-8 text-red-500 dark:text-red-600 relative number-500 glitch-effect">
            <span className="drop-shadow-2xl">500</span>
            <div className="absolute inset-0 bg-red-500/10 dark:bg-red-600/20 rounded-full blur-3xl"></div>
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
            <button 
              onClick={() => window.location.reload()}
              className="relative"
            >
              <Button3D 
                variant="secondary" 
                size="lg"
                className="shadow-lg"
              >
                {texts.tryAgain}
              </Button3D>
            </button>
            
            <Link to="/">
              <Button3D 
                variant="primary" 
                size="lg"
                className="shadow-lg"
              >
                {texts.goHome}
              </Button3D>
            </Link>
            
            <Link to="/contact">
              <Button3D 
                variant="glass" 
                size="lg"
                className="border border-white/20 backdrop-blur-sm"
              >
                {texts.contactSupport}
              </Button3D>
            </Link>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -bottom-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/30 dark:via-red-600/30 to-transparent mt-16 animate-item"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
      
      {/* 3D Objects - Circuit board elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated circuit lines */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40">
          <motion.div 
            className="absolute h-full w-1 left-1/2 rounded-full bg-gradient-to-b from-red-500/0 via-red-500/40 to-red-500/0"
            animate={{ 
              height: ['0%', '100%', '0%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
          <motion.div 
            className="absolute w-full h-1 top-3/4 rounded-full bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0"
            animate={{ 
              width: ['0%', '100%', '0%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: 'linear',
              delay: 3,
            }}
          />
        </div>
        
        {/* Circuit node */}
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 backdrop-blur-sm"
          animate={{ 
            boxShadow: ['0 0 0px rgba(239,68,68,0.2)', '0 0 20px rgba(239,68,68,0.6)', '0 0 0px rgba(239,68,68,0.2)'],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
};

export default ServerError3D;
