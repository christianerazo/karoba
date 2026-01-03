import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppNotification from '../components/WhatsAppNotification';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  country: string;
  city: string;
  interests: string[];
  newsletter: boolean;
  terms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  terms?: string;
}

const interestOptions = [
  'register.interest.yoga',
  'register.interest.therapies',
  'register.interest.ancestral',
  'register.interest.retreats',
  'register.interest.gastronomy',
  'register.interest.adventures',
  'register.interest.spa',
  'Cultura Caribeña'
];

export default function Register() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    country: '',
    city: '',
    interests: [],
    newsletter: true,
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estado para la notificación de WhatsApp
  const [showWhatsAppNotification, setShowWhatsAppNotification] = useState(false);
  const [registeredUserData, setRegisteredUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Campos requeridos por el backend
    if (!formData.firstName.trim()) newErrors.firstName = t('register.error.first.name.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('register.error.last.name.required');
    if (!formData.email.trim()) {
      newErrors.email = t('register.error.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('register.error.email.invalid');
    }
    if (!formData.phone.trim()) newErrors.phone = t('register.error.phone.required');
    if (!formData.password) {
      newErrors.password = t('register.error.password.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('register.error.password.length');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.error.password.mismatch');
    }
    
    // Campos opcionales - solo validar si están llenos
    if (formData.birthDate && !formData.birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      newErrors.birthDate = 'Formato de fecha inválido';
    }
    
    // Términos y condiciones - requerido
    if (!formData.terms) newErrors.terms = t('register.error.terms.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 Iniciando envío del formulario...');
    console.log('📝 Datos del formulario:', formData);
    
    if (!validateForm()) {
      console.log('❌ Validación falló, errores:', errors);
      return;
    }

    console.log('✅ Validación exitosa, enviando al servidor...');
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Usar el contexto de autenticación para el registro
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        interests: formData.interests
      });

      console.log('📄 Resultado del registro:', result);

      if (result.success) {
        console.log('🎉 Registro exitoso!');
        // Mostrar mensaje de éxito
        setSuccessMessage('¡Registro exitoso! Bienvenido a la familia Karoba. Te hemos enviado un email de confirmación.');
        
        // Preparar datos para la notificación de WhatsApp
        setRegisteredUserData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        });
        
        // Mostrar notificación de WhatsApp después de un breve delay
        setTimeout(() => {
          setShowWhatsAppNotification(true);
        }, 1500);
        
        // Redirigir después del registro exitoso
        setTimeout(() => {
          router.push('/');
        }, 3000);
        
        // Limpiar formulario
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          birthDate: '',
          country: '',
          city: '',
          interests: [],
          newsletter: true,
          terms: false
        });
      } else {
        console.log('❌ Error del servidor:', result.message);
        setErrors({ email: result.message || t('register.error.general') });
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      setErrors({ email: t('register.error.connection') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('register.meta.title')}</title>
        <meta name="description" content={t('register.meta.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-gold-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12 fade-in-up">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-700 rounded-full text-sm font-semibold tracking-wide border border-gold-200">
                  🏝️ ÚNETE A LA EXPERIENCIA KAROBA
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
                Comienza tu Viaje de
                <span className="block text-gradient-luxury">Bienestar Caribeño</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t('register.hero.description')}
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-8 p-4 bg-gold-50 border border-gold-200 rounded-xl text-gold-800 text-center fade-in-up">
                {successMessage}
              </div>
            )}

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gold-200/50 p-8 md:p-12 fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Resumen de errores */}
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-red-500 text-xl">⚠️</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Por favor corrige los siguientes errores:</h3>
                        <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mensaje de éxito */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-green-500 text-xl">✅</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-800">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Información Personal */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">{t('register.personal.info')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.first.name')}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input ${errors.firstName ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.first.name')}
                      />
                      {errors.firstName && <p className="text-dark-700 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.last.name')}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input ${errors.lastName ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.last.name')}
                      />
                      {errors.lastName && <p className="text-dark-700 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.email.label')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input ${errors.email ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.email')}
                      />
                      {errors.email && <p className="text-dark-700 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.phone.label')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input ${errors.phone ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.phone')}
                      />
                      {errors.phone && <p className="text-dark-700 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.birth.date')}
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className={`input ${errors.birthDate ? 'border-dark-500' : ''}`}
                      />
                      {errors.birthDate && <p className="text-dark-700 text-sm mt-1">{errors.birthDate}</p>}
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Ubicación</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.country')}
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`input ${errors.country ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.country')}
                      />
                      {errors.country && <p className="text-dark-700 text-sm mt-1">{errors.country}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.city')}
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`input ${errors.city ? 'border-dark-500' : ''}`}
                        placeholder={t('register.placeholder.city')}
                      />
                      {errors.city && <p className="text-dark-700 text-sm mt-1">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">{t('register.security')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.password.label')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`input pr-12 ${errors.password ? 'border-dark-500' : ''}`}
                          placeholder={t('register.placeholder.password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-dark-700 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        {t('register.form.confirm.password.label')}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`input pr-12 ${errors.confirmPassword ? 'border-dark-500' : ''}`}
                          placeholder={t('register.form.confirm.password.placeholder')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-dark-700 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                {/* Intereses */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">{t('register.interests.title')}</h2>
                  <p className="text-gray-600 mb-4">{t('register.interests.description')}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
                        />
                        <span className="text-sm text-gray-700">{t(interest)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferencias */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">{t('register.preferences.title')}</h2>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
                      />
                      <span className="text-gray-700">
                        {t('register.newsletter.text')}
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500 mt-1"
                      />
                      <span className="text-gray-700">
                        {t('register.terms.text')}{' '}
                        <Link href="/terms" className="text-gold-600 hover:text-gold-700 font-medium">
                          {t('register.terms.link')}
                        </Link>{' '}
                        {t('register.terms.and')}{' '}
                        <Link href="/privacy" className="text-gold-600 hover:text-gold-700 font-medium">
                          {t('register.privacy.policy')}
                        </Link>{' '}
                        {t('register.karoba.text')}
                      </span>
                    </label>
                    {errors.terms && <p className="text-dark-700 text-sm">{errors.terms}</p>}
                  </div>
                </div>

                {/* Botón de Envío */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn-gold text-lg py-4 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('register.creating.account')}</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>{t('register.form.submit.text')}</span>
                        <span>✨</span>
                      </span>
                    )}
                  </button>
                  
                  <p className="text-center text-gray-600 mt-4">
                    {t('register.form.already.account')}{' '}
                    <Link href="/login" className="text-gold-600 hover:text-gold-700 font-medium">
                      {t('register.form.login.here')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
      
      {/* Notificación de WhatsApp */}
      <WhatsAppNotification
        show={showWhatsAppNotification}
        userData={registeredUserData}
        onClose={() => setShowWhatsAppNotification(false)}
      />
    </>
  );
}