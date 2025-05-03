import React, { useEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button3D from '../ui/Button3D';
import gsap from 'gsap';

const StatBadge = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-500">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
};

const HeroSection = ({ scrollYProgress }) => {
  const { isArabic } = useLanguage();
  const { darkMode } = useTheme();
  const heroRef = useRef(null);
  
  // Parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  
  // Animation for hero section
  useEffect(() => {
    if (!heroRef.current) return;
    
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-element'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      }
    );
  }, []);
  
  // Texts based on language
  const texts = {
    heroTitle: isArabic 
      ? 'توصيل المياه والغاز إلى باب منزلك'
      : 'Water & Gas Delivery to Your Doorstep',
    heroSubtitle: isArabic
      ? 'خدمة توصيل سريعة وموثوقة في جميع أنحاء البحرين'
      : 'Fast and reliable delivery service throughout the Kingdom of Bahrain',
    heroButton: isArabic ? 'اطلب الآن' : 'Order Now',
    heroButton2: isArabic ? 'تعرف على خدماتنا' : 'Discover Our Services',
    avgDeliveryTime: isArabic ? 'متوسط وقت التوصيل' : 'Avg. Delivery Time',
    happyCustomers: isArabic ? 'عملاء سعداء' : 'Happy Customers',
  };

  // Stats
  const stats = [
    { value: '30min', label: texts.avgDeliveryTime },
    { value: '+15k', label: texts.happyCustomers }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20" ref={heroRef}>
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Text */}
          <motion.div style={{ y: heroTextY }}>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 hero-element"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {texts.heroTitle}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 hero-element"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {texts.heroSubtitle}
            </motion.p>
            
            <div className="flex flex-wrap gap-4 hero-element">
              <Link to="/services">
                <Button3D 
                  variant="primary" 
                  size="lg"
                  className="shadow-lg"
                >
                  {texts.heroButton}
                </Button3D>
              </Link>
              
              <Link to="/services">
                <Button3D 
                  variant="glass" 
                  size="lg"
                  className="border border-gray-300/50 dark:border-white/20"
                >
                  {texts.heroButton2}
                </Button3D>
              </Link>
            </div>
          </motion.div>
          
          {/* Hero Image/Animation */}
          <motion.div 
            style={{ y: heroImageY }}
            className="relative hero-element"
          >
            <div className="relative z-20">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-300/50 dark:border-blue-500/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <img 
                  src="/images/water-delivery-hero.jpg" 
                  alt="
                   Delivery" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
              <div className="absolute w-72 h-72 rounded-full bg-primary/10 dark:bg-primary-dark/20 filter blur-3xl animate-blob"></div>
              <div className="absolute w-72 h-72 rounded-full bg-secondary/10 dark:bg-secondary-dark/20 filter blur-3xl animate-blob animation-delay-2000 top-24 -right-10"></div>
              <div className="absolute w-72 h-72 rounded-full bg-accent/10 dark:bg-accent-dark/20 filter blur-3xl animate-blob animation-delay-4000 bottom-24 -left-10"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Section */}
        {/* <div className="mt-16 bg-blue-50/80 dark:bg-blue-900/20 rounded-xl py-8 backdrop-blur-sm">
          <div className="flex justify-around">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2 + (index * 0.1)
                }}
              >
                <StatBadge 
                  value={stat.value} 
                  label={stat.label} 
                />
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
