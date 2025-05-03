import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

// Importamos el componente de redes sociales moderno
import SocialLinks3D from '../ui/SocialLinks3D';

const Footer3D = () => {
  const { isArabic } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const particlesRef = useRef(null);
  
  // Textos según el idioma
  const texts = {
    appName: isArabic ? 'توصيل البحرين' : 'Bahrain Delivery',
    slogan: isArabic ? 'خدمة توصيل سريعة وموثوقة' : 'Fast & Reliable Delivery Service',
    aboutUs: isArabic ? 'من نحن' : 'About Us',
    services: isArabic ? 'خدماتنا' : 'Our Services',
    terms: isArabic ? 'الشروط والأحكام' : 'Terms & Conditions',
    privacy: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
    contact: isArabic ? 'اتصل بنا' : 'Contact Us',
    water: isArabic ? 'توصيل المياه المعدنية' : 'Mineral Water Delivery',
    gas: isArabic ? 'توصيل اسطوانات الغاز' : 'Gas Cylinders Delivery',
    support: isArabic ? 'الدعم' : 'Support',
    faq: isArabic ? 'الأسئلة الشائعة' : 'FAQ',
    followUs: isArabic ? 'تابعنا' : 'Follow Us',
    copyright: isArabic 
      ? '© 2025 توصيل البحرين. جميع الحقوق محفوظة.' 
      : '© 2025 Bahrain Delivery. All rights reserved.',
    address: isArabic 
      ? 'المنامة، مملكة البحرين' 
      : 'Manama, Kingdom of Bahrain',
    phone: '+973 1234 5678',
    email: 'info@bahraindelivery.com',
    newsletter: isArabic ? 'اشترك في النشرة الإخبارية' : 'Subscribe to our newsletter',
    subscribeText: isArabic ? 'احصل على أحدث العروض والتحديثات' : 'Get the latest offers and updates',
    emailPlaceholder: isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
    subscribe: isArabic ? 'اشترك' : 'Subscribe',
  };

  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Create floating particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Create particles
    const createParticles = () => {
      const container = particlesRef.current;
      container.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        
        particle.className = 'absolute rounded-full bg-white/10';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '0';
        particle.style.opacity = '0';
        particle.style.transform = 'translateY(0)';
        
        container.appendChild(particle);
        
        // Animate with CSS
        particle.animate([
          { 
            transform: 'translateY(0)', 
            opacity: 0 
          },
          { 
            transform: `translateY(-${Math.random() * 100 + 50}px)`,
            opacity: 0.7
          },
          { 
            transform: `translateY(-${Math.random() * 200 + 100}px)`,
            opacity: 0
          }
        ], {
          duration: Math.random() * 5000 + 3000,
          delay: Math.random() * 3000,
          iterations: Infinity
        });
      }
    };
    
    createParticles();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-primary-dark to-primary">
      {/* Particles container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Glass container */}
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Column 1: About */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 h-full border border-white/10 shadow-glow">
              <h3 className="text-2xl font-bold text-white mb-4">{texts.appName}</h3>
              <p className="text-white/80 mb-4">
                {texts.slogan}
              </p>
              <p className="text-white/80 mb-4">
                {texts.address}
                <br />
                {texts.phone}
                <br />
                {texts.email}
              </p>
              <SocialLinks3D />
            </div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 h-full border border-white/10 shadow-glow">
              <h3 className="text-xl font-bold text-white mb-4">
                {isArabic ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.services}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.terms}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.privacy}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Column 3: Services */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 h-full border border-white/10 shadow-glow">
              <h3 className="text-xl font-bold text-white mb-4">
                {texts.services}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/services/water" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.water}
                  </Link>
                </li>
                <li>
                  <Link to="/services/gas" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.gas}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.faq}
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                    {texts.support}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants}>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 h-full border border-white/10 shadow-glow">
              <h3 className="text-xl font-bold text-white mb-4">
                {texts.newsletter}
              </h3>
              <p className="text-white/80 mb-4">
                {texts.subscribeText}
              </p>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder={texts.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button 
                  type="submit"
                  className="absolute top-1 right-1 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-full transition-colors"
                >
                  {texts.subscribe}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-white/10 text-center text-white/70"
        >
          <p>{texts.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer3D;
