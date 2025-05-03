import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../../components/ui/Button3D';
import gsap from 'gsap';

const Maintenance3D = () => {
  const { isArabic } = useLanguage();
  const bubblesRef = useRef(null);
  const contentRef = useRef(null);
  
  // Texts based on language
  const texts = {
    title: isArabic ? 'الموقع تحت الصيانة' : 'Site Under Maintenance',
    description: isArabic 
      ? 'نحن نعمل على تحسين تجربتك. سنعود قريباً بميزات جديدة رائعة!'
      : 'We are working to improve your experience. We will be back soon with awesome new features!',
    estimatedTime: isArabic ? 'الوقت المقدر للعودة:' : 'Estimated time to completion:',
    hours: isArabic ? 'ساعات' : 'hours',
    checkStatus: isArabic ? 'تحقق من الحالة' : 'Check Status',
    notification: isArabic ? 'أبلغني عند الانتهاء' : 'Notify Me When Ready',
  };
  
  // Create floating gear & tool animations
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const createTools = () => {
      const container = bubblesRef.current;
      const tools = [
        { icon: '⚙️', size: 40 },
        { icon: '🔧', size: 36 },
        { icon: '🔨', size: 32 },
        { icon: '⚙️', size: 30 },
        { icon: '🛠️', size: 38 },
        { icon: '⚙️', size: 28 },
        { icon: '🔧', size: 34 },
        { icon: '⚙️', size: 42 },
      ];
      
      tools.forEach((tool, index) => {
        const element = document.createElement('div');
        element.className = 'absolute select-none';
        element.style.fontSize = `${tool.size}px`;
        element.textContent = tool.icon;
        element.style.opacity = '0';
        
        const posX = 30 + Math.random() * 40; // Keep in middle 40% of screen
        const posY = 20 + Math.random() * 60; // Keep in middle 60% of screen
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        
        container.appendChild(element);
        
        // Different animation for gears (spinning) vs tools (bobbing)
        if (tool.icon === '⚙️') {
          gsap.to(element, {
            opacity: 0.7,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1), // Clockwise or counter-clockwise
            duration: Math.random() * 10 + 15,
            repeat: -1,
            ease: 'linear',
            delay: index * 0.3,
          });
        } else {
          gsap.to(element, {
            opacity: 0.7,
            y: Math.random() * 30 - 15,
            x: Math.random() * 30 - 15,
            rotation: Math.random() * 30 - 15,
            duration: Math.random() * 4 + 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.3,
          });
        }
      });
    };
    
    createTools();
    
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
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power2.out',
      }
    );
    
    // Countdown animation
    const timerElement = contentRef.current.querySelector('.timer');
    if (timerElement) {
      gsap.fromTo(
        timerElement,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        }
      );
      
      // Simulate countdown
      const hours = 2;
      const minutes = 30;
      let timeLeft = (hours * 60 + minutes) * 60; // in seconds
      
      const updateTimer = () => {
        if (timeLeft <= 0) return;
        
        const hoursLeft = Math.floor(timeLeft / 3600);
        const minutesLeft = Math.floor((timeLeft % 3600) / 60);
        const secondsLeft = timeLeft % 60;
        
        const hoursStr = String(hoursLeft).padStart(2, '0');
        const minutesStr = String(minutesLeft).padStart(2, '0');
        const secondsStr = String(secondsLeft).padStart(2, '0');
        
        if (timerElement) {
          timerElement.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
        }
        
        timeLeft--;
        setTimeout(updateTimer, 1000);
      };
      
      updateTimer();
    }
    
    // Progress bar animation
    const progressBar = contentRef.current.querySelector('.progress-bar-fill');
    if (progressBar) {
      gsap.fromTo(
        progressBar,
        { width: '15%' },
        { 
          width: '85%',
          duration: 20,
          ease: 'power1.inOut',
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated tools */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative" ref={contentRef}>
        <div className="max-w-2xl mx-auto">
          {/* Maintenance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-6 animate-item">
                <svg className="w-14 h-14 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 animate-item">
                {texts.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 animate-item">
                {texts.description}
              </p>
            </div>
            
            {/* Countdown Timer */}
            <div className="mb-8 text-center animate-item">
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {texts.estimatedTime}
              </p>
              <div className="timer bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 text-4xl font-mono font-bold py-4 px-6 rounded-lg inline-block">
                02:30:00
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8 animate-item">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="progress-bar-fill h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-500 rounded-full"></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 animate-item">
              <a href="https://status.bahraindelivery.com" target="_blank" rel="noopener noreferrer">
                <Button3D 
                  variant="outline" 
                  className="shadow-sm"
                >
                  {texts.checkStatus}
                </Button3D>
              </a>
              
              <Button3D 
                variant="primary" 
                className="shadow-lg"
              >
                {texts.notification}
              </Button3D>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-8 text-center animate-item">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {isArabic ? 'تابعنا للحصول على التحديثات:' : 'Follow us for updates:'}
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance3D;
