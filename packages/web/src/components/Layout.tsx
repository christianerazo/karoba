import { ReactNode, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, []);

  useEffect(() => {
    // Configuración básica de scroll - SIN bloqueos
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overscrollBehavior = 'auto'; // Permitir scroll normal
    
    // Intersection Observer básico
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '-20px',
    });

    // Observar elementos de animación
    const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1" style={{ paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}