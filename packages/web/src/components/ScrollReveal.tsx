import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  cascade?: boolean;
  damping?: number;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600, // Reducido para mejor rendimiento
  distance = 40, // Reducido para menos cálculos
  className = '',
  threshold = 0.1,
  rootMargin = '-30px', // Reducido para activar antes
  once = true,
  cascade = false,
  damping = 0.9 // Aumentado para menos movimiento
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && (!once || !hasAnimated)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        if (once) setHasAnimated(true);
      }, delay);
    } else if (!once && !entry.isIntersecting) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }
  }, [delay, once, hasAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  const getTransform = useCallback(() => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(${damping})`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(${damping})`;
      case 'left':
        return `translate3d(${distance}px, 0, 0) scale(${damping})`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0) scale(${damping})`;
      case 'scale':
        return `translate3d(0, 0, 0) scale(${damping})`;
      case 'rotate':
        return `translate3d(0, ${distance}px, 0) scale(${damping}) rotate(5deg)`; // Reducido
      case 'fade':
        return `translate3d(0, 0, 0) scale(${damping})`;
      default:
        return `translate3d(0, ${distance}px, 0) scale(${damping})`;
    }
  }, [isVisible, direction, distance, damping]);

  const getFilter = useCallback(() => {
    return isVisible ? 'blur(0px)' : 'blur(2px)'; // Reducido para mejor rendimiento
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`${className} ${cascade ? 'scroll-reveal-cascade' : ''} zero-lag`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        filter: direction === 'fade' ? getFilter() : 'none',
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`, // Easing más suave
        willChange: isVisible ? 'auto' : 'transform, opacity, filter',
        contain: 'layout style',
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
}

// Componente para animaciones en cascada optimizado
export function ScrollRevealCascade({ 
  children, 
  delay = 80, // Reducido para mejor rendimiento
  ...props 
}: ScrollRevealProps & { children: ReactNode[] }) {
  return (
    <>
      {Array.isArray(children) ? children.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={delay * index}
          {...props}
        >
          {child}
        </ScrollReveal>
      )) : (
        <ScrollReveal {...props}>
          {children}
        </ScrollReveal>
      )}
    </>
  );
}

// Componente para efectos de parallax ultra-optimizado
export function ParallaxElement({ 
  children, 
  speed = 0.3, // Reducido para mejor rendimiento
  className = '',
  direction = 'vertical'
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const lastUpdate = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      const now = Date.now();
      // Throttle a 30fps para mejor rendimiento
      if (now - lastUpdate.current >= 33) {
        if (ref.current) {
          const scrolled = window.scrollY;
          const rate = scrolled * speed;
          
          if (direction === 'vertical') {
            setOffset(rate);
          } else {
            setOffset(rate * 0.3); // Horizontal parallax más sutil
          }
          
          lastUpdate.current = now;
        }
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        frameRef.current = requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={`${className} parallax-zero-lag`}
      style={{
        transform: direction === 'vertical' 
          ? `translate3d(0, ${offset}px, 0)` 
          : `translate3d(${offset}px, 0, 0)`,
        willChange: 'transform',
        contain: 'layout style',
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
}