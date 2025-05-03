import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher3D from '../ui/ThemeSwitcher3D';
import LanguageSwitcher3D from '../ui/LanguageSwitcher3D';
import Button3D from '../ui/Button3D';

const Navbar3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will be replaced with real auth state
  const { isArabic } = useLanguage();
  const { darkMode } = useTheme();
  const location = useLocation();
  
  // Texts based on language
  const texts = {
    logo: isArabic ? 'توصيل البحرين' : 'Bahrain Delivery',
    home: isArabic ? 'الرئيسية' : 'Home',
    services: isArabic ? 'الخدمات' : 'Services',
    products: isArabic ? 'المنتجات' : 'Products',
    aboutUs: isArabic ? 'من نحن' : 'About Us',
    contactUs: isArabic ? 'اتصل بنا' : 'Contact Us',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    signup: isArabic ? 'إنشاء حساب' : 'Sign Up',
    profile: isArabic ? 'الملف الشخصي' : 'Profile',
    orders: isArabic ? 'طلباتي' : 'My Orders',
    logout: isArabic ? 'تسجيل الخروج' : 'Logout',
    darkMode: isArabic ? 'الوضع المظلم' : 'Dark Mode',
    lightMode: isArabic ? 'الوضع المضيء' : 'Light Mode',
    arabic: 'اللغة العربية',
    english: 'English',
  };
  
  // Handle scroll style changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Navigation options
  const navItems = [
    { name: texts.home, path: '/' },
    { name: texts.services, path: '/services' },
    { name: texts.products, path: '/products' },
    { name: texts.aboutUs, path: '/about' },
    { name: texts.contactUs, path: '/contact' },
  ];
  
  // Check if a route is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };
  
  // Animations
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: isArabic ? "100%" : "-100%" },
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Calculate navbar background based on scroll state and theme
  const getNavbarBackground = () => {
    if (scrolled) {
      return darkMode 
        ? 'bg-gray-900/10 backdrop-blur-md shadow-lg border-b border-gray-800/30' 
        : 'bg-white/70 backdrop-blur-md shadow-lg border-b border-gray-300/30';
    } else {
      return 'bg-transparent';
    }
  };

  // Calculate text color based on scroll state and theme
  const getTextColor = (isActive = false) => {
    if (isActive) {
      return 'text-primary dark:text-primary-light';
    }
    
    if (scrolled) {
      return 'text-gray-700 dark:text-gray-200';
    } else {
      return darkMode ? 'text-white' : 'text-gray-700';
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Background particles animation */}
      {scrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5 dark:bg-primary-dark/5"
              style={{
                width: Math.random() * 50 + 20,
                height: Math.random() * 50 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2 rtl:space-x-reverse"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative w-10 h-10 bg-primary dark:bg-primary-dark rounded-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute w-full h-full bg-gradient-to-tr from-blue-500 to-teal-400 animate-spin-slow" />
                </div>
                <span className="text-white text-xl font-bold z-10">
                  {isArabic ? 'ب' : 'B'}
                </span>
              </div>
              <span className={`font-bold text-xl ${getTextColor()}`}>
                {texts.logo}
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {/* Menu Items */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse mr-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="relative px-3 py-2 rounded-lg group"
                >
                  {/* Background hover effect */}
                  <span className={`absolute inset-0 rounded-lg ${
                    isActive(item.path)
                      ? 'bg-primary/10 dark:bg-primary-dark/20' 
                      : 'bg-transparent group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/30'
                  } transition-all duration-300`}></span>
                  
                  {/* Text */}
                  <span className={`relative z-10 font-medium ${
                    isActive(item.path)
                      ? getTextColor(true)
                      : `${getTextColor()} group-hover:text-primary dark:group-hover:text-primary-light`
                  } transition-colors duration-300`}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator line */}
                  {isActive(item.path) && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Theme and Language Switchers */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse mr-4">
              <ThemeSwitcher3D />
              <LanguageSwitcher3D />
            </div>
            
            {/* Authentication Buttons */}
            {isLoggedIn ? (
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-2 rounded-lg bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-gray-300/50 dark:border-white/10 cursor-pointer flex items-center space-x-1 rtl:space-x-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <img src="/images/avatar-placeholder.jpg" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <span className={getTextColor()}>
                    {texts.profile}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 z-50 origin-top-right invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                  <div className="rounded-lg shadow-lg py-1 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-gray-300/20 dark:border-gray-700/50">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary-dark/10">
                      {texts.profile}
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary-dark/10">
                      {texts.orders}
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary-dark/10">
                      {texts.logout}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link to="/login">
                  <Button3D 
                    variant="glass" 
                    className="border border-gray-300/50 dark:border-white/20"
                  >
                    {texts.login}
                  </Button3D>
                </Link>
                
                <Link to="/register">
                  <Button3D variant="primary">
                    {texts.signup}
                  </Button3D>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${getTextColor()}`}
              aria-label="Menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={`absolute top-20 ${isArabic ? 'right-0' : 'left-0'} h-[calc(100vh-5rem)] w-4/5 max-w-xs bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-8">
                {/* Menu Items */}
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-3 rounded-lg ${
                        isActive(item.path)
                          ? 'bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/30'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Theme and Language Switchers */}
                <div className="flex flex-col space-y-4 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-200">
                      {darkMode ? texts.darkMode : texts.lightMode}
                    </span>
                    <ThemeSwitcher3D />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-200">
                      {isArabic ? texts.arabic : texts.english}
                    </span>
                    <LanguageSwitcher3D />
                  </div>
                </div>
                
                {/* Authentication */}
                <div className="flex flex-col space-y-3">
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/profile"
                        className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                          <img src="/images/avatar-placeholder.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <span>{texts.profile}</span>
                      </Link>
                      
                      <Link 
                        to="/orders"
                        className="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                      >
                        {texts.orders}
                      </Link>
                      
                      <button 
                        className="px-4 py-3 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                      >
                        {texts.logout}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="w-full">
                        <Button3D 
                          variant="outline" 
                          fullWidth
                        >
                          {texts.login}
                        </Button3D>
                      </Link>
                      
                      <Link to="/register" className="w-full">
                        <Button3D 
                          variant="primary" 
                          fullWidth
                        >
                          {texts.signup}
                        </Button3D>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar3D;
