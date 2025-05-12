'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Font = 'inter' | 'jetbrains' | 'consolas' | 'comic';

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<Font>('inter');

  useEffect(() => {
    // Load saved font preference
    const savedFont = localStorage.getItem('font') as Font;
    if (savedFont) {
      setFont(savedFont);
    }
  }, []);

  useEffect(() => {
    // Save font preference and update document
    localStorage.setItem('font', font);
    document.body.dataset.font = font;
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}