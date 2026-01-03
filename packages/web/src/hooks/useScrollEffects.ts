import { useEffect, useState, useCallback, useRef } from 'react';

// Hook ultra-optimizado para scroll sin lags - Versión final
export const useScrollEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const frameId = useRef<number>();

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Aumentar threshold para reducir aún más los renders
    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setIsScrolling(true);
      
      // Limpiar timeout anterior
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
      
      lastScrollY.current = currentScrollY;
    }
    
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      // Usar requestAnimationFrame con throttling adicional
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      frameId.current = requestAnimationFrame(updateScroll);
      ticking.current = true;
    }
  }, [updateScroll]);

  useEffect(() => {
    // Usar passive listener con throttling manual
    let lastTime = 0;
    const throttledHandler = (e: Event) => {
      const now = Date.now();
      if (now - lastTime >= 16) { // ~60fps max
        handleScroll();
        lastTime = now;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandler);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [handleScroll]);

  return { scrollY, scrollDirection, isScrolling };
};

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [ref, setRef] = useState<Element | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '-50px',
      ...options,
    });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options, hasIntersected]);

  return [setRef, isIntersecting, hasIntersected] as const;
};

// Hook simplificado para staggered animations
export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [ref, setRef] = useState<Element | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        for (let i = 0; i < itemCount; i++) {
          setTimeout(() => {
            setVisibleItems(prev => [...prev, i]);
          }, i * delay);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '-100px',
    });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, itemCount, delay]);

  return [setRef, visibleItems] as const;
};

// Hook de parallax ultra-simplificado y optimizado
export const useSimpleParallax = (speed: number = 0.3) => {
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);
  const frameId = useRef<number>();
  const lastUpdate = useRef(0);

  useEffect(() => {
    const updateOffset = () => {
      const now = Date.now();
      // Throttle a 30fps para mejor rendimiento
      if (now - lastUpdate.current >= 33) {
        setOffset(window.scrollY * speed);
        lastUpdate.current = now;
      }
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        if (frameId.current) {
          cancelAnimationFrame(frameId.current);
        }
        frameId.current = requestAnimationFrame(updateOffset);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [speed]);

  return offset;
};

// Hook para throttled scroll ultra-optimizado
export const useThrottledScroll = (delay: number = 50) => { // Reducido a ~20fps para mejor rendimiento
  const [scrollY, setScrollY] = useState(0);
  const lastUpdate = useRef(0);
  const ticking = useRef(false);
  const frameId = useRef<number>();

  const updateScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdate.current >= delay) {
      setScrollY(window.scrollY);
      lastUpdate.current = now;
    }
    ticking.current = false;
  }, [delay]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      frameId.current = requestAnimationFrame(updateScroll);
      ticking.current = true;
    }
  }, [updateScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [handleScroll]);

  return scrollY;
};