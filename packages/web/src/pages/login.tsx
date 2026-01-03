import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Verificar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // Redirigir al home si ya está logueado
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t('login.form.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('login.form.email.invalid');
    }

    if (!formData.password.trim()) {
      newErrors.password = t('login.form.password.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSuccessMessage(t('login.success'));
        
        // Redirigir después de un breve delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setErrors({ general: result.message || t('login.error') });
      }
    } catch (error) {
      setErrors({ general: t('login.error.connection') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('login.title')} - Karoba Wellness Travel</title>
        <meta name="description" content={t('login.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50 py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl text-white">🏝️</span>
                </div>
                <h1 className="text-3xl font-bold text-dark-900 mb-2">
                  {t('login.title')}
                </h1>
                <p className="text-gray-600">
                  {t('login.subtitle')}
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8">
              
              {/* Mensaje de éxito */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-medium">{successMessage}</p>
                </div>
              )}

              {/* Error general */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    {t('login.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t('login.form.email.placeholder')}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    {t('login.form.password')} *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`input pr-12 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder={t('login.form.password.placeholder')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Recordar sesión y recuperar contraseña */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {t('login.form.remember')}
                    </span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-gold-600 hover:text-gold-700 font-medium">
                    {t('login.form.forgot')}
                  </Link>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full btn-gold py-4 text-lg font-semibold ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('login.form.signing')}</span>
                    </div>
                  ) : (
                    t('login.form.submit')
                  )}
                </button>

                {/* Enlace a registro */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    {t('login.form.no.account')}{' '}
                    <Link href="/register" className="text-gold-600 hover:text-gold-700 font-semibold">
                      {t('login.form.register')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Información adicional */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4">
                {t('login.secure.connection')}
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-400">
                <Link href="/privacy" className="hover:text-gray-600">
                  {t('login.privacy')}
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-gray-600">
                  {t('login.terms')}
                </Link>
                <span>•</span>
                <Link href="/help" className="hover:text-gray-600">
                  {t('login.help')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}