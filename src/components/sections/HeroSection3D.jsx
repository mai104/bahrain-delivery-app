/**
 * HeroSection3D
 * 
 * CURRENTLY UNUSED
 * 
 * Purpose: A highly advanced 3D hero section with water animations, particle effects,
 *          and immersive visual elements for the homepage
 * Future Use: Will be used as an alternative to the current HeroSection in the homepage
 *             when more advanced 3D features are implemented
 * 
 * Note: This component was created to provide a more immersive 3D experience with water
 * animations and particle effects. It includes GSAP animations and video backgrounds.
 * Currently, a simpler version is being used in HomePage3D.
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Button3D from '../ui/Button3D';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection3D = () => {
  const { isArabic } = useLanguage();
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const headingRef = useRef(null);
  
  // Texts based on language
  const texts = {
    title: isArabic ? 'توصيل المياه والغاز في البحرين' : 'Water & Gas Delivery in Bahrain',
    subtitle: isArabic ? 'خدمة توصيل سريعة وموثوقة' : 'Fast & Reliable Delivery Service',
    description: isArabic 
      ? 'نوصل المياه المعدنية واسطوانات الغاز إلى منزلك في أسرع وقت ممكن وبأفضل الأسعار'
      : 'We deliver mineral water and gas cylinders to your home in no time at the best prices',
    orderNow: isArabic ? 'اطلب الآن' : 'Order Now',
    learnMore: isArabic ? 'تعرف على المزيد' : 'Learn More',
  };

  // Water animation effect
  useEffect(() => {
    if (!containerRef.current) return;

    // Create water ripple effects
    const createRipples = () => {
      const rippleContainer = document.createElement('div');
      rippleContainer.className = 'absolute inset-0 overflow-hidden opacity-20';
      containerRef.current.appendChild(rippleContainer);

      for (let i = 0; i < 5; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-white/50';
        
        const size = Math.random() * 200 + 100;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${posX}%`;
        ripple.style.top = `${posY}%`;
        
        rippleContainer.appendChild(ripple);
        
        gsap.fromTo(ripple, 
          { opacity: 0, scale: 0 },
          { 
            opacity: 0.5, 
            scale: 1, 
            duration: duration,
            repeat: -1,
            onComplete: () => {
              ripple.remove();
            }
          }
        );
      }
    };
    
    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 2;
        
        particle.className = 'absolute rounded-full bg-white/20';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particlesRef.current.appendChild(particle);
        
        gsap.to(particle, {
          y: `-=${Math.random() * 200 + 100}`,
          x: `+=${(Math.random() - 0.5) * 100}`,
          opacity: 0,
          duration: Math.random() * 4 + 2,
          ease: 'power1.out',
          repeat: -1,
          delay: Math.random() * 5,
          repeatRefresh: true,
          onRepeat: () => {
            gsap.set(particle, {
              y: 0,
              opacity: 1,
              left: `${Math.random() * 100}%`,
            });
          }
        });
      }
    };
    
    // Create text animation
    const animateHeading = () => {
      if (!headingRef.current) return;
      
      const chars = [...headingRef.current.innerText];
      headingRef.current.innerHTML = '';
      
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.className = 'inline-block';
        
        headingRef.current.appendChild(span);
        
        gsap.fromTo(span,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            delay: i * 0.05,
            ease: 'power2.out'
          }
        );
      });
    };
    
    createRipples();
    createParticles();
    animateHeading();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/water-background.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Animated particles container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden z-10"
      />
      
      {/* 3D glassmorphism content card */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 shadow-glow"
        >
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
          >
            {texts.title}
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl font-medium text-white/90 text-center mb-6"
          >
            <span className="text-accent dark:text-accent-light">
              {texts.subtitle}
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-white/80 text-center mb-8 max-w-2xl mx-auto"
          >
            {texts.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/order">
              <Button3D 
                variant="accent" 
                size="xl"
                className="min-w-[200px]"
              >
                {texts.orderNow}
              </Button3D>
            </Link>
            
            <Link to="/services">
              <Button3D 
                variant="glass" 
                size="xl"
                className="min-w-[200px]"
              >
                {texts.learnMore}
              </Button3D>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection3D;
