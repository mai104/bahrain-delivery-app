import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../../components/ui/Button3D';
import gsap from 'gsap';

const LoginPage3D = () => {
  const { isArabic } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const bubblesRef = useRef(null);
  
  // Texts based on language
  const texts = {
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    welcome: isArabic ? 'مرحبًا بعودتك!' : 'Welcome Back!',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    forgotPassword: isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?',
    noAccount: isArabic ? 'ليس لديك حساب؟' : 'Don\'t have an account?',
    register: isArabic ? 'سجل الآن' : 'Register now',
    emailRequired: isArabic ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email',
    passwordRequired: isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter your password',
    invalidCredentials: isArabic ? 'بيانات الدخول غير صحيحة' : 'Invalid login credentials',
    emailPlaceholder: isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
    passwordPlaceholder: isArabic ? 'أدخل كلمة المرور' : 'Enter your password',
    rememberMe: isArabic ? 'تذكرني' : 'Remember me',
  };

  // Create floating bubbles effect
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const createBubbles = () => {
      const container = bubblesRef.current;
      
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 60 + 20;
        const startPositionX = Math.random() * 100;
        
        bubble.className = 'absolute rounded-full bg-gradient-to-br from-primary/5 to-primary-dark/10';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${startPositionX}%`;
        bubble.style.bottom = '-20%';
        bubble.style.opacity = '0';
        
        container.appendChild(bubble);
        
        gsap.to(bubble, {
          y: `-${Math.random() * 100 + 100}%`,
          x: (Math.random() - 0.5) * 50,
          opacity: Math.random() * 0.5 + 0.1,
          duration: Math.random() * 10 + 10,
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
  }, []);

  // Form animation on mount
  useEffect(() => {
    if (!formRef.current) return;
    
    gsap.fromTo(
      formRef.current.querySelectorAll('.form-element'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate
    if (!email.trim()) {
      setError(texts.emailRequired);
      return;
    }
    
    if (!password.trim()) {
      setError(texts.passwordRequired);
      return;
    }
    
    // Show loading
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Demo login - in a real application, you would call an API
      console.log('Login attempt:', { email, password });
      
      // Example error - in real app this would come from API
      // setError(texts.invalidCredentials);
      
      // For demo, we'll simulate successful login
      // Then we would redirect or update auth context
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with animated bubbles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-100 dark:from-gray-900 dark:to-blue-900">
        <div ref={bubblesRef} className="absolute inset-0 overflow-hidden" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 shadow-xl border border-white/20 dark:border-gray-700/30"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <h1 className="text-2xl font-bold mb-1 form-element">{texts.login}</h1>
              <p className="text-white/80 form-element">{texts.welcome}</p>
            </div>
            
            {/* Login Form */}
            <div className="p-6" ref={formRef}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="mb-4 form-element">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {texts.email}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                      focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                      text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={texts.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="mb-6 form-element">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {texts.password}
                    </label>
                    <Link 
                      to="/auth/forgot-password"
                      className="text-xs text-primary dark:text-primary-light hover:underline"
                    >
                      {texts.forgotPassword}
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                      focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                      text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={texts.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6zm-1.67-10a.83.83 0 100-1.66.83.83 0 000 1.66zm10.34 0a.83.83 0 100-1.66.83.83 0 000 1.66zm0 10a.83.83 0 100-1.66.83.83 0 000 1.66z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Remember Me */}
                <div className="mb-6 form-element">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-dark"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {texts.rememberMe}
                    </span>
                  </label>
                </div>
                
                {/* Login Button */}
                <div className="form-element">
                  <Button3D
                    type="submit"
                    variant="primary"
                    fullWidth
                    className="py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {texts.login}
                      </div>
                    ) : (
                      texts.login
                    )}
                  </Button3D>
                </div>
              </form>
              
              {/* Registration Link */}
              <div className="text-center mt-6 form-element">
                <p className="text-gray-600 dark:text-gray-400">
                  {texts.noAccount}{' '}
                  <Link to="/auth/register" className="text-primary dark:text-primary-light font-medium hover:underline">
                    {texts.register}
                  </Link>
                </p>
              </div>
              
              {/* Social Login Options (Optional) */}
              <div className="mt-6 flex flex-col space-y-2 form-element">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/70 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400">
                      {isArabic ? 'أو' : 'OR'}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </div>
                  </button>
                  
                  <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                      </svg>
                      Facebook
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage3D;
