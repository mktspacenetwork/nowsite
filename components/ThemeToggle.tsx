import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
    // State to manage theme, initialized from localStorage or system preference.
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
        return 'light';
    });
    
    // Effect to apply the theme class to the documentElement.
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <span className="material-icons-outlined">dark_mode</span>
            ) : (
                <span className="material-icons-outlined">light_mode</span>
            )}
        </button>
    );
};

export default ThemeToggle;