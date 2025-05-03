import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LoginPage = () => {
  const { isArabic } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // النصوص حسب اللغة
  const texts = {
    login: isArabic ? 'تسجيل الدخول' : 'Login',
    email: isArabic ? 'البريد الإلكتروني' : 'Email',
    password: isArabic ? 'كلمة المرور' : 'Password',
    forgotPassword: isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?',
    noAccount: isArabic ? 'ليس لديك حساب؟' : 'Don\'t have an account?',
    register: isArabic ? 'سجل الآن' : 'Register now',
    emailRequired: isArabic ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email',
    passwordRequired: isArabic ? 'يرجى إدخال كلمة المرور' : 'Please enter your password',
    invalidCredentials: isArabic ? 'بيانات الدخول غير صحيحة' : 'Invalid login credentials',
  };

  // معالجة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // التحقق من الحقول
    if (!email.trim()) {
      setError(texts.emailRequired);
      return;
    }
    
    if (!password.trim()) {
      setError(texts.passwordRequired);
      return;
    }
    
    // محاكاة لعملية تسجيل الدخول - سيتم تنفيذها لاحقًا مع API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // هنا سيتم التعامل مع الاستجابة من API
      console.log('تسجيل دخول:', { email, password });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {texts.login}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 rounded bg-danger/10 text-danger dark:bg-danger-dark/10 dark:text-danger-dark">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <Input
            label={texts.email}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            required
          />
          
          <Input
            label={texts.password}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex justify-end mb-6">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary dark:text-primary-dark hover:underline"
            >
              {texts.forgotPassword}
            </Link>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={loading}
          >
            {texts.login}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {texts.noAccount}{' '}
          <Link
            to="/auth/register"
            className="text-primary dark:text-primary-dark hover:underline"
          >
            {texts.register}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
