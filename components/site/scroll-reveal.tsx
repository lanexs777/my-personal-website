'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
}

export function ScrollReveal({ children }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = ref.current?.children;
    if (elements) {
      Array.from(elements).forEach((element) => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}