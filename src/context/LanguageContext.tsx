"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TranslationKey, getTranslation } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

const STORAGE_KEY = "app_language";

export function LanguageProvider({ children, initialLanguage = "fr" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // 1. Charger la langue sauvegardée au montage (Client Side)
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // 2. Mettre à jour la langue et la persister dans localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "fr" ? "en" : "fr";
    setLanguage(nextLang);
  };

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}