import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Page } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { WHATSAPP_LINK } from '../constants/links';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const dropdownTimeoutRef = useRef<number | null>(null); // Ref para o timeout do dropdown

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { page: 'home', label: t('nav.home') },
        { page: 'condominio-inteligente', label: t('nav.smartCondo') },
        { page: 'solucoes', label: t('nav.solutions'), icon: 'expand_more' },
        { page: 'quem-somos', label: t('nav.about') },
        { page: 'contato', label: t('nav.contact') },
    ];
    
    const solutionsSubMenu = [
        { page: 'area-acesso', label: t('solutionsSub.access') },
        { page: 'area-externa', label: t('solutionsSub.external') },
        { page: 'area-interna', label: t('solutionsSub.internal') },
        { page: 'facilities', label: t('solutionsSub.facilities') },
        { page: 'solucoes-sob-medida', label: t('solutionsSub.custom') },
    ];

    const handleNavClick = (e: React.MouseEvent, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMenuOpen(false);
        setIsSolutionsOpen(false);
        setIsMobileSolutionsOpen(false);
        window.scrollTo(0, 0);
    };

    const handleMobileSolutionsToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileSolutionsOpen(!isMobileSolutionsOpen);
    };
    
    const navLinkClasses = (page: Page, isSubmenuParent: boolean = false) => {
        let isActive = currentPage === page;
        if (isSubmenuParent) {
            const solutionPages = solutionsSubMenu.map(p => p.page);
            isActive = isActive || solutionPages.includes(currentPage);
        }
        return `hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`;
    }

    const renderDesktopNav = () => (
        <nav className="hidden lg:flex items-center space-x-10 text-base font-medium">
            {navLinks.map((link) => {
                if (link.label === t('nav.solutions')) {
                    return (
                        <div 
                            key={link.label}
                            className="relative py-2 -my-2"
                            onMouseEnter={() => {
                                if (dropdownTimeoutRef.current) {
                                    clearTimeout(dropdownTimeoutRef.current);
                                }
                                setIsSolutionsOpen(true);
                            }}
                            onMouseLeave={() => {
                                dropdownTimeoutRef.current = window.setTimeout(() => {
                                    setIsSolutionsOpen(false);
                                }, 200); // Pequeno atraso de 200ms
                            }}
                        >
                            <div 
                                className={`flex items-center cursor-default ${navLinkClasses(link.page as Page, true)}`}
                            >
                                {link.label}
                                <span className={`material-icons-outlined text-base ml-1 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`}>{link.icon}</span>
                            </div>
                            {isSolutionsOpen && (
                                <div className="absolute top-full mt-2 w-56 bg-white dark:bg-surface-dark rounded-md shadow-lg py-2 text-left animate-fade-in-down" style={{animationDuration: '300ms'}}>
                                    {solutionsSubMenu.map(subLink => (
                                        <button 
                                            key={subLink.label} 
                                            onClick={(e) => handleNavClick(e, subLink.page as Page)}
                                            className="block w-full text-left px-4 py-2 text-sm text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {subLink.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                }
                return (
                    <button key={link.label} className={`flex items-center ${navLinkClasses(link.page as Page)}`} onClick={(e) => handleNavClick(e, link.page as Page)}>
                        {link.label}
                    </button>
                );
            })}
        </nav>
    );

    const renderMobileNav = () => (
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <nav className="flex flex-col items-center space-y-6 text-white text-lg pt-24 pb-8">
                {navLinks.map((link) => {
                    if (link.label === t('nav.solutions')) {
                        return (
                            <div key={link.label} className="flex flex-col items-center w-full">
                                <button className="flex items-center hover:text-primary transition-colors" onClick={handleMobileSolutionsToggle}>
                                    {link.label}
                                    <span className={`material-icons-outlined text-base ml-1 transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`}>{link.icon}</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileSolutionsOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                                    <div className="flex flex-col items-center space-y-4 text-base bg-white/5 rounded-lg py-4 px-8">
                                         {solutionsSubMenu.map(subLink => (
                                            <button 
                                                key={subLink.label} 
                                                onClick={(e) => handleNavClick(e, subLink.page as Page)}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {subLink.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return (
                         <button key={link.label} className="flex items-center hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, link.page as Page)}>
                            {link.label}
                        </button>
                    );
                })}
                <a className="bg-primary text-white px-8 py-3 rounded-full font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>{t('header.cta')}</a>
            </nav>
        </div>
    );

    const headerClasses = `
        top-0 left-0 right-0 z-20 transition-all duration-300
        ${isSticky 
            ? 'fixed bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-md text-text-light-primary dark:text-text-dark-primary' 
            : 'absolute bg-transparent text-white'
        }
    `;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={(e) => handleNavClick(e, 'home')}><Logo /></button>
                </div>
                
                {renderDesktopNav()}
                
                <div className="hidden lg:flex items-center space-x-4">
                    <ThemeToggle />
                    <a className="bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{t('header.cta')}</a>
                </div>
                <div className="lg:hidden flex items-center space-x-2">
                    <ThemeToggle />
                    <button className="z-30" onClick={() => { setIsMenuOpen(!isMenuOpen); if (isMenuOpen) setIsMobileSolutionsOpen(false);}}>
                        <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-background-dark/95 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto px-6">
                     {renderMobileNav()}
                </div>
            </div>
        </header>
    );
};

export default Header;