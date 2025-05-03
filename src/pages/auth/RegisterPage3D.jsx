import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../../components/ui/Button3D';
import gsap from 'gsap';

const RegisterPage3D = () => {
  const { isArabic } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // For multi-step registration
  const formRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Texts based on language
  const texts = {
    register: isArabic ? 'إنشاء حساب' : 'Create Account',
    welcome: isArabic ? 'انضم إلينا اليوم!' : 'Join Us Today!',
    step1Title: isArabic ? 'المعلومات الشخصية' : 'Personal Information',
    step2Title: isArabic ? 'معلومات الحساب' : 'Account Information',
    name: isArabic ? 'الاسم' : 'Full Name',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    phone: isArabic ? 'رقم الهاتف' : 'Phone Number',
    password: isArabic ? 'كلمة المرور' : 'Password',
    confirmPassword: isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password',
    hasAccount: isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    namePlaceholder: isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name',
    emailPlaceholder: isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
    phonePlaceholder: isArabic ? 'أدخل رقم هاتفك' : 'Enter your phone number',
    passwordPlaceholder: isArabic ? 'أدخل كلمة المرور' : 'Create a password',
    confirmPasswordPlaceholder: isArabic ? 'أعد إدخال كلمة المرور' : 'Confirm your password',
    next: isArabic ? 'التالي' : 'Next',
    back: isArabic ? 'السابق' : 'Back',
    createAccount: isArabic ? 'إنشاء الحساب' : 'Create Account',
    termsAndConditions: isArabic ? 'أوافق على الشروط والأحكام' : 'I agree to the Terms and Conditions',
    nameRequired: isArabic ? 'يرجى إدخال الاسم' : 'Please enter your name',
    emailRequired: isArabic ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email',
    phoneRequired: isArabic ? 'يرجى إدخال رقم الهاتف' : 'Please enter your phone number',
    passwordRequired: isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter your password',
    passwordMismatch: isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
    acceptTerms: isArabic ? 'يرجى الموافقة على الشروط والأحكام' : 'Please accept the terms and conditions',
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create floating particles effect
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const createParticles = () => {
      const container = particlesRef.current;
      container.innerHTML = '';
      
      const colors = ['#1E88E5', '#26A69A', '#FF5722'];
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 15 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `${color}10`;
        particle.style.border = `1px solid ${color}30`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        
        gsap.to(particle, {
          x: `${(Math.random() - 0.5) * 200}`,
          y: `${(Math.random() - 0.5) * 200}`,
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };
    
    createParticles();
    
    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  // Form animation on mount and step change
  useEffect(() => {
    if (!formRef.current) return;
    
    const elements = formRef.current.querySelectorAll(`.step-${step}`);
    
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, [step]);

  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate step 1
    if (step === 1) {
      if (!formData.name.trim()) {
        setError(texts.nameRequired);
        return;
      }
      
      if (!formData.email.trim()) {
        setError(texts.emailRequired);
        return;
      }
      
      if (!formData.phone.trim()) {
        setError(texts.phoneRequired);
        return;
      }
      
      setStep(2);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(1);
    setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate step 2
    if (!formData.password.trim()) {
      setError(texts.passwordRequired);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(texts.passwordMismatch);
      return;
    }
    
    // Check terms
    const termsCheckbox = e.target.querySelector('input[type="checkbox"]');
    if (!termsCheckbox.checked) {
      setError(texts.acceptTerms);
      return;
    }
    
    // Show loading
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Demo registration - in a real application, you would call an API
      console.log('Registration data:', formData);
      
      // For demo, we'll simulate successful registration
      // Then we would redirect or update auth context
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      {/* Background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-sky-50 dark:from-gray-900 dark:via-blue-900/30 dark:to-teal-900/30">
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-lg mx-auto">
          {/* Registration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 shadow-xl border border-white/20 dark:border-gray-700/30"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <h1 className="text-2xl font-bold mb-1">{texts.register}</h1>
              <p className="text-white/80">{texts.welcome}</p>
              
              {/* Steps indicator */}
              <div className="flex items-center justify-center mt-6">
                <div className="relative w-40 h-1 bg-white/30 rounded-full">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-white rounded-full"
                    initial={{ width: '50%' }}
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse absolute">
                  <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'} transition-all`} />
                  <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'} transition-all`} />
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
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
              
              <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
                {/* Step 1 - Personal Info */}
                {step === 1 && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 step-1">
                      {texts.step1Title}
                    </h2>
                    
                    {/* Name Field */}
                    <div className="mb-4 step-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {texts.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                        text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={texts.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    {/* Email Field */}
                    <div className="mb-4 step-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {texts.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                        text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={texts.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    {/* Phone Field */}
                    <div className="mb-6 step-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {texts.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                        text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={texts.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    {/* Next Button */}
                    <div className="step-1">
                      <Button3D
                        type="submit"
                        variant="primary"
                        fullWidth
                        className="py-3"
                      >
                        {texts.next}
                      </Button3D>
                    </div>
                  </>
                )}
                
                {/* Step 2 - Account Info */}
                {step === 2 && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 step-2">
                      {texts.step2Title}
                    </h2>
                    
                    {/* Password Field */}
                    <div className="mb-4 step-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {texts.password}
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                        text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={texts.passwordPlaceholder}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    {/* Confirm Password Field */}
                    <div className="mb-6 step-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {texts.confirmPassword}
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 
                        focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-all
                        text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={texts.confirmPasswordPlaceholder}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="mb-6 step-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-dark"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {texts.termsAndConditions}
                        </span>
                      </label>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3 rtl:space-x-reverse step-2">
                      <Button3D
                        type="button"
                        variant="outline"
                        className="flex-1 py-3"
                        onClick={handlePrevStep}
                      >
                        {texts.back}
                      </Button3D>
                      
                      <Button3D
                        type="submit"
                        variant="primary"
                        className="flex-1 py-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {texts.createAccount}
                          </div>
                        ) : (
                          texts.createAccount
                        )}
                      </Button3D>
                    </div>
                  </>
                )}
              </form>
              
              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  {texts.hasAccount}{' '}
                  <Link to="/auth/login" className="text-primary dark:text-primary-light font-medium hover:underline">
                    {texts.login}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage3D;
