/**
 * HowItWorksSection
 * 
 * CURRENTLY UNUSED
 * 
 * Purpose: Displays a step-by-step guide on how the delivery app works with animated cards
 * Future Use: Will be integrated into the HomePage3D component for a complete user journey overview
 * 
 * Note: This component was created as part of the 3D UI enhancement but is not currently
 * integrated into the application flow. It includes animations and responsive design.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const StepCard = ({ number, title, description, delay }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div 
        className="w-16 h-16 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-4"
        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
      >
        {number}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const { isArabic } = useLanguage();
  
  // Texts based on language
  const texts = {
    howItWorks: isArabic ? 'كيف يعمل التطبيق' : 'How It Works',
    step1: isArabic ? 'اختر المنتج' : 'Choose Product',
    step2: isArabic ? 'أدخل العنوان' : 'Enter Address',
    step3: isArabic ? 'ادفع بسهولة' : 'Easy Payment',
    step4: isArabic ? 'استلم طلبك' : 'Receive Order',
    step1Desc: isArabic 
      ? 'تصفح منتجاتنا واختر ما تحتاجه'
      : 'Browse our products and choose what you need',
    step2Desc: isArabic 
      ? 'حدد موقعك أو أدخل عنوانك'
      : 'Set your location or enter your address',
    step3Desc: isArabic 
      ? 'ادفع بسهولة عبر بطاقة الائتمان أو عند الاستلام'
      : 'Pay easily via credit card or cash on delivery',
    step4Desc: isArabic 
      ? 'استلم طلبك في أسرع وقت ممكن'
      : 'Receive your order as quickly as possible',
  };

  const steps = [
    { number: 1, title: texts.step1, description: texts.step1Desc },
    { number: 2, title: texts.step2, description: texts.step2Desc },
    { number: 3, title: texts.step3, description: texts.step3Desc },
    { number: 4, title: texts.step4, description: texts.step4Desc }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary-dark/10 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-secondary/5 dark:bg-secondary-dark/10 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {texts.howItWorks}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              delay={index * 0.1 + 0.2}
            />
          ))}
        </div>
        
        {/* Connecting lines between steps (visible on larger screens) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-12 z-0">
          <div className="absolute left-1/4 right-3/4 h-0.5 bg-primary dark:bg-primary-dark transform -translate-x-1/2"></div>
          <div className="absolute left-1/2 right-1/2 h-0.5 bg-primary dark:bg-primary-dark transform -translate-x-1/2"></div>
          <div className="absolute left-3/4 right-1/4 h-0.5 bg-primary dark:bg-primary-dark transform -translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
