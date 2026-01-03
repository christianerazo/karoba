import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface LanguageSwitchProps {
  isScrolled?: boolean;
}

export default function LanguageSwitch({ isScrolled = false }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = (newLang: 'es' | 'en') => {
    if (newLang !== language) {
      setIsAnimating(true);
      setTimeout(() => {
        setLanguage(newLang);
        setIsAnimating(false);
      }, 150);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Switch Container */}
      <div className={`relative flex items-center rounded-full p-1 border transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-100 border-gray-300' 
          : 'bg-white/10 backdrop-blur-sm border-white/20'
      }`}>
        {/* Background Slider */}
        <div 
          className={`absolute top-1 bottom-1 w-12 rounded-full transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'bg-gradient-to-r from-gold-500 to-gold-600'
              : 'bg-gradient-to-r from-gold-500 to-gold-600'
          } ${
            language === 'es' ? 'left-1' : 'left-[52px]'
          }`}
        />
        
        {/* Spanish Button */}
        <button
          onClick={() => handleLanguageChange('es')}
          className={`relative z-10 flex items-center justify-center w-12 h-8 rounded-full transition-all duration-300 ${
            language === 'es' 
              ? 'text-white font-semibold' 
              : isScrolled
                ? 'text-gray-600 hover:text-gray-800'
                : 'text-white/70 hover:text-white/90'
          } ${isAnimating ? 'scale-95' : 'scale-100'}`}
        >
          <span className="text-sm font-medium">ES</span>
        </button>
        
        {/* English Button */}
        <button
          onClick={() => handleLanguageChange('en')}
          className={`relative z-10 flex items-center justify-center w-12 h-8 rounded-full transition-all duration-300 ${
            language === 'en' 
              ? 'text-white font-semibold' 
              : isScrolled
                ? 'text-gray-600 hover:text-gray-800'
                : 'text-white/70 hover:text-white/90'
          } ${isAnimating ? 'scale-95' : 'scale-100'}`}
        >
          <span className="text-sm font-medium">EN</span>
        </button>
      </div>
      
      {/* Flag Icons */}
      <div className="flex items-center space-x-1">
        <span className={`text-lg transition-all duration-300 ${
          language === 'es' ? 'scale-110' : 'scale-90 opacity-60'
        }`}>
          🇨🇴
        </span>
        <span className={`text-lg transition-all duration-300 ${
          language === 'en' ? 'scale-110' : 'scale-90 opacity-60'
        }`}>
          🇺🇸
        </span>
      </div>
    </div>
  );
}