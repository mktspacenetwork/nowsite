import React, { useState } from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#', label: 'Home' },
        { href: '#', label: 'Condomínio inteligente' },
        { href: '#', label: 'Nossas Soluções', icon: 'expand_more' },
        { href: '#', label: 'Quem Somos' },
        { href: '#', label: 'Contato' },
    ];

    return (
        <header className="absolute top-0 left-0 right-0 z-20 bg-transparent text-white">
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Logo />
                </div>
                <nav className="hidden lg:flex items-center space-x-10 text-base font-medium">
                    {navLinks.map((link) => (
                        <a key={link.label} className="flex items-center hover:text-primary transition-colors" href={link.href}>
                            {link.label}
                            {link.icon && <span className="material-icons-outlined text-base ml-1">{link.icon}</span>}
                        </a>
                    ))}
                </nav>
                <div className="hidden lg:block">
                    <a className="bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href="#">Pedir Orçamento</a>
                </div>
                <button className="lg:hidden text-white z-30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>
            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-background-dark/95 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto px-6 pt-24 flex flex-col items-center text-center">
                     <nav className="flex flex-col items-center space-y-6 text-white text-lg">
                        {navLinks.map((link) => (
                             <a key={link.label} href={link.href} className="flex items-center hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                {link.label}
                                {link.icon && <span className="material-icons-outlined text-base ml-1">{link.icon}</span>}
                            </a>
                        ))}
                    </nav>
                    <a className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105" href="#" onClick={() => setIsMenuOpen(false)}>Pedir Orçamento</a>
                </div>
            </div>
        </header>
    );
};

export default Header;