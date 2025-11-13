import React, { useState } from 'react';

const ThemeToggle: React.FC = () => {
    // Determine initial theme from the class on the <html> element, which is set by the inline script.
    const [theme, setTheme] = useState(() => 
        typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
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
