import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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
  'Yoga y Meditación',
  'Terapias Naturales',
  'Medicina Ancestral',
  'Retiros Espirituales',
  'Gastronomía Wellness',
  'Aventuras Naturales',
  'Spas y Relajación',
  'Cultura Caribeña'
];

export default function Register() {
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

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es requerida';
    if (!formData.country.trim()) newErrors.country = 'El país es requerido';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.terms) newErrors.terms = 'Debes aceptar los términos y condiciones';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('¡Registro exitoso! Bienvenido a la familia Karoba. Te hemos enviado un email de confirmación.');
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
        setErrors({ email: data.message || 'Error en el registro' });
      }
    } catch (error) {
      setErrors({ email: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Únete a Karoba - Registro Wellness Travel Colombia</title>
        <meta name="description" content="Únete a la comunidad exclusiva de Karoba Wellness Travel Colombia. Accede a experiencias únicas de bienestar en el Caribe colombiano." />
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
                Únete a nuestra comunidad exclusiva y accede a experiencias transformadoras 
                de wellness en los destinos más auténticos del Caribe colombiano
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
                
                {/* Información Personal */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input ${errors.firstName ? 'border-dark-500' : ''}`}
                        placeholder="Tu nombre"
                      />
                      {errors.firstName && <p className="text-dark-700 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input ${errors.lastName ? 'border-dark-500' : ''}`}
                        placeholder="Tu apellido"
                      />
                      {errors.lastName && <p className="text-dark-700 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input ${errors.email ? 'border-dark-500' : ''}`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-dark-700 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input ${errors.phone ? 'border-dark-500' : ''}`}
                        placeholder="+57 300 123 4567"
                      />
                      {errors.phone && <p className="text-dark-700 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Fecha de Nacimiento *
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
                        País *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`input ${errors.country ? 'border-dark-500' : ''}`}
                        placeholder="Colombia"
                      />
                      {errors.country && <p className="text-dark-700 text-sm mt-1">{errors.country}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`input ${errors.city ? 'border-dark-500' : ''}`}
                        placeholder="Bogotá"
                      />
                      {errors.city && <p className="text-dark-700 text-sm mt-1">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Seguridad</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark-800 mb-2">
                        Contraseña *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`input pr-12 ${errors.password ? 'border-dark-500' : ''}`}
                          placeholder="Mínimo 6 caracteres"
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
                        Confirmar Contraseña *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`input pr-12 ${errors.confirmPassword ? 'border-dark-500' : ''}`}
                          placeholder="Repite tu contraseña"
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
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Intereses Wellness</h2>
                  <p className="text-gray-600 mb-4">Selecciona las experiencias que más te interesan:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferencias */}
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Preferencias</h2>
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
                        Quiero recibir ofertas exclusivas y noticias de wellness por email
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
                        Acepto los{' '}
                        <Link href="/terms" className="text-gold-600 hover:text-gold-700 font-medium">
                          términos y condiciones
                        </Link>{' '}
                        y la{' '}
                        <Link href="/privacy" className="text-gold-600 hover:text-gold-700 font-medium">
                          política de privacidad
                        </Link>{' '}
                        de Karoba *
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
                        <span>Creando tu cuenta...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>Únete a Karoba</span>
                        <span>✨</span>
                      </span>
                    )}
                  </button>
                  
                  <p className="text-center text-gray-600 mt-4">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="text-gold-600 hover:text-gold-700 font-medium">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}