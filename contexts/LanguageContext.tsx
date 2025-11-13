import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import translations from '../translations';

export type Language = 'pt-BR' | 'en-US' | 'es-ES' | 'zh-CN';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window === 'undefined') return 'pt-BR';
        const savedLanguage = localStorage.getItem('language') as Language;
        // Check if savedLanguage is a valid language, otherwise default
        if (savedLanguage && translations[savedLanguage]) {
            return savedLanguage;
        }
        return 'pt-BR';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) {
                // Fallback to Portuguese if translation is missing in the current language
                let fallbackResult: any = translations['pt-BR'];
                for (const fk of keys) {
                    fallbackResult = fallbackResult?.[fk];
                }
                // If still not found in fallback, return the key itself
                return fallbackResult || key;
            }
        }
        return result || key;
    };

    useEffect(() => {
        document.documentElement.lang = language.split('-')[0];
    }, [language]);


    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
