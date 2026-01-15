import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorValue, useColorScheme } from 'react-native';
import { rootStore } from '@/components/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
  theme: {
    primary: ColorValue | undefined;
    background: string;
    text: string;
    card: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem('app_theme');
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          setThemeModeState(saved as ThemeMode);
          rootStore.setTheme(saved as ThemeMode);
        }
      } catch (e) {
        console.log('Theme load error:', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('app_theme', mode);
      setThemeModeState(mode);
      rootStore.setTheme(mode);
    } catch (e) {
      console.log('Theme save error:', e);
    }
  };

  // Determine if dark mode is active
  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

  const theme = {
    background: isDark ? '#1a1313' : '#fff',
    text: isDark ? '#fff' : '#000',
    primary: isDark ? '#828990' : '#828990',
    card: isDark ? '#1b1919' : '#f5f5f5',
  };

  // Don't render until theme is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};