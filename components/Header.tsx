import React, { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

    const navLinks = [
        { page: 'home', label: 'Home' },
        { page: 'home', label: 'Condomínio inteligente' },
        { page: 'solucoes', label: 'Nossas Soluções', icon: 'expand_more' },
        { page: 'quem-somos', label: 'Quem Somos' },
        { page: 'contato', label: 'Contato' },
    ];
    
    const solutionsSubMenu = [
        { page: 'solucoes', label: 'Área de Acesso' },
        { page: 'solucoes', label: 'Área Externa' },
        { page: 'solucoes', label: 'Área Interna' },
        { page: 'solucoes', label: 'Facilities' },
        { page: 'solucoes', label: 'Soluções sob medida' },
    ];

    const handleNavClick = (e: React.MouseEvent, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMenuOpen(false);
        setIsMobileSolutionsOpen(false);
    };

    const handleMobileSolutionsToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileSolutionsOpen(!isMobileSolutionsOpen);
    };
    
    const renderDesktopNav = () => (
        <nav className="hidden lg:flex items-center space-x-10 text-base font-medium">
            {navLinks.map((link) => {
                if (link.label === 'Nossas Soluções') {
                    return (
                        <div 
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => setIsSolutionsOpen(true)}
                            onMouseLeave={() => setIsSolutionsOpen(false)}
                        >
                            <button className="flex items-center hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, link.page as Page)}>
                                {link.label}
                                <span className={`material-icons-outlined text-base ml-1 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`}>{link.icon}</span>
                            </button>
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
                    <button key={link.label} className="flex items-center hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, link.page as Page)}>
                        {link.label}
                        {link.icon && <span className="material-icons-outlined text-base ml-1">{link.icon}</span>}
                    </button>
                );
            })}
        </nav>
    );

    const renderMobileNav = () => (
        <nav className="flex flex-col items-center space-y-6 text-white text-lg">
            {navLinks.map((link) => {
                if (link.label === 'Nossas Soluções') {
                    return (
                        <div key={link.label} className="flex flex-col items-center">
                            <button className="flex items-center hover:text-primary transition-colors" onClick={handleMobileSolutionsToggle}>
                                {link.label}
                                <span className={`material-icons-outlined text-base ml-1 transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`}>{link.icon}</span>
                            </button>
                            {isMobileSolutionsOpen && (
                                <div className="flex flex-col items-center space-y-4 mt-4 text-base bg-white/5 rounded-lg py-4 px-8">
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
                            )}
                        </div>
                    );
                }
                return (
                     <button key={link.label} className="flex items-center hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, link.page as Page)}>
                        {link.label}
                    </button>
                );
            })}
        </nav>
    );

    return (
        <header className="absolute top-0 left-0 right-0 z-20 bg-transparent text-white">
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={(e) => handleNavClick(e, 'home')}><Logo /></button>
                </div>
                
                {renderDesktopNav()}
                
                <div className="hidden lg:flex items-center space-x-4">
                    <ThemeToggle />
                    <a className="bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href="#">Pedir Orçamento</a>
                </div>
                <div className="lg:hidden flex items-center space-x-2">
                    <ThemeToggle />
                    <button className="text-white z-30" onClick={() => { setIsMenuOpen(!isMenuOpen); if (isMenuOpen) setIsMobileSolutionsOpen(false);}}>
                        <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-background-dark/95 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto px-6 pt-24 flex flex-col items-center text-center">
                     {renderMobileNav()}
                    <a className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href="#" onClick={() => setIsMenuOpen(false)}>Pedir Orçamento</a>
                </div>
            </div>
        </header>
    );
};

export default Header;