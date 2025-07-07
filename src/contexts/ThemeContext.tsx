import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>('light');

  useEffect(() => {
    // Force light mode only
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add('light');
    
    // Remove any saved theme preference
    localStorage.removeItem('ojt_theme');
  }, []);

  const toggleTheme = () => {
    // Do nothing - theme is always light
  };

  const setTheme = () => {
    // Do nothing - theme is always light
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}