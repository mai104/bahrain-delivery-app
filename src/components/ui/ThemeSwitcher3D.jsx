import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const ThemeSwitcher3D = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { isArabic } = useLanguage();
  
  // Sun and moon animations
  const sunVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: darkMode ? 45 : 0 },
    whileHover: { scale: 1.1, rotate: darkMode ? 45 : 15 }
  };
  
  const moonVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: darkMode ? 0 : -45 },
    whileHover: { scale: 1.1, rotate: darkMode ? -15 : -45 }
  };
  
  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-12 h-8 rounded-full flex items-center
        ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}
        transition-colors duration-300
        focus:outline-none
        shadow-inner
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track for the handle */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars in dark mode */}
        {darkMode && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}
        
        {/* Clouds in light mode */}
        {!darkMode && (
          <>
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1.5 bg-white/60 rounded-full"
                style={{
                  width: 6 + Math.random() * 6,
                  top: `${30 + Math.random() * 40}%`,
                  left: `${20 + i * 30 + Math.random() * 20}%`,
                }}
                animate={{
                  x: [0, 8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Handle with sun/moon icons */}
      <motion.div 
        className={`
          absolute w-6 h-6 rounded-full flex items-center justify-center
          ${darkMode ? 'bg-gray-800 right-1' : 'bg-yellow-400 left-1'}
          transition-colors duration-300
          shadow-md
        `}
        animate={{ x: darkMode ? (isArabic ? 'calc(-100% + 8px)' : 'calc(100% - 8px)') : 0 }}
        transition={springTransition}
      >
        {/* Sun icon for light mode */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-yellow-100"
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          variants={sunVariants}
          transition={springTransition}
          style={{ opacity: darkMode ? 0 : 1 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </motion.div>
        
        {/* Moon icon for dark mode */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-blue-200"
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          variants={moonVariants}
          transition={springTransition}
          style={{ opacity: darkMode ? 1 : 0 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher3D;
