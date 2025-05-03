import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const RegisterPage = () => {
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

  // النصوص حسب اللغة
  const texts = {
    register: isArabic ? 'إنشاء حساب جديد' : 'Create New Account',
    name: isArabic ? 'الاسم' : 'Name',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    phone: isArabic ? 'رقم الهاتف' : 'Phone Number',
    password: isArabic ? 'كلمة المرور' : 'Password',
    confirmPassword: isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password',
    hasAccount: isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?',
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    nameRequired: isArabic ? 'يرجى إدخال الاسم' : 'Please enter your name',
    emailRequired: isArabic ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email',
    phoneRequired: isArabic ? 'يرجى إدخال رقم الهاتف' : 'Please enter your phone number',
    passwordRequired: isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter your password',
    passwordMismatch: isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
    termsAndConditions: isArabic ? 'أوافق على الشروط والأحكام' : 'I agree to the Terms and Conditions',
    acceptTerms: isArabic ? 'يرجى الموافقة على الشروط والأحكام' : 'Please accept the terms and conditions',
  };

  // معالجة تغيير قيم الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // معالجة إنشاء حساب
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    
    // التحقق من الحقول
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
    
    if (!formData.password.trim()) {
      setError(texts.passwordRequired);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError(texts.passwordMismatch);
      return;
    }
    
    // محاكاة لعملية التسجيل - سيتم تنفيذها لاحقًا مع API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // هنا سيتم التعامل مع الاستجابة من API
      console.log('إنشاء حساب:', formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {texts.register}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 rounded bg-danger/10 text-danger dark:bg-danger-dark/10 dark:text-danger-dark">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          <Input
            label={texts.name}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            label={texts.email}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            required
          />
          
          <Input
            label={texts.phone}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+973 XXXXXXXX"
            required
          />
          
          <Input
            label={texts.password}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <Input
            label={texts.confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary-dark dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                {texts.termsAndConditions}
              </span>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={loading}
          >
            {texts.register}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {texts.hasAccount}{' '}
          <Link
            to="/auth/login"
            className="text-primary dark:text-primary-dark hover:underline"
          >
            {texts.login}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
