import React, { useRef, useState } from 'react';
import Logo from './Logo';
import useOnScreen from '../hooks/useOnScreen';
import { Page } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}

type LanguageCode = 'pt-BR' | 'en-US' | 'es-ES' | 'zh-CN';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: Record<LanguageCode, string> = {
        'pt-BR': 'Português (BR)',
        'en-US': 'English (US)',
        'es-ES': 'Español (ES)',
        'zh-CN': '中文 (简体)',
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                <span className="material-icons-outlined text-lg">language</span>
                <span>{languages[language as LanguageCode]}</span>
                <span className={`material-icons-outlined text-base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isOpen && (
                 <div className="absolute bottom-full mb-2 w-40 bg-background-darker rounded-md shadow-lg py-1 text-left ring-1 ring-white/10" onMouseLeave={() => setIsOpen(false)}>
                    {Object.entries(languages).map(([code, name]) => (
                        <button 
                            key={code}
                            onClick={() => {
                                setLanguage(code as LanguageCode);
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    const { t } = useLanguage();
    const footerRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(footerRef, { threshold: 0.1 });

    const handleNavClick = (e: React.MouseEvent, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const socialLinks = [
        { 
            href: "https://www.instagram.com/now.solucoes/", 
            label: "Instagram",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
        },
        {
            href: "https://wa.me/551152835040",
            label: "WhatsApp",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        }
    ];

    return (
        <footer ref={footerRef} className="bg-background-dark dark:bg-background-darker text-gray-400 pt-20 pb-8">
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                    <div className="col-span-1 xl:col-span-2">
                       <Logo />
                        <p className="text-sm mt-4">{t('footer.description')}</p>
                    </div>
                    <div className="space-y-3 text-sm">
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'home')}>{t('footer.nav.home')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'quem-somos')}>{t('footer.nav.about')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'contato')}>{t('footer.nav.contact')}</button>
                    </div>
                    <div className="space-y-3 text-sm">
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'solucoes')}>{t('footer.solutions.smartCondo')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'area-acesso')}>{t('footer.solutions.access')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'area-externa')}>{t('footer.solutions.external')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'area-interna')}>{t('footer.solutions.internal')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'facilities')}>{t('footer.solutions.facilities')}</button>
                        <button className="block hover:text-white" onClick={(e) => handleNavClick(e, 'solucoes-sob-medida')}>{t('footer.solutions.custom')}</button>
                    </div>
                    <div className="space-y-4 text-sm col-span-1 md:col-span-2 lg:col-span-1">
                         <div className="flex items-center space-x-4">
                            {socialLinks.map(link => (
                                <a 
                                    key={link.label}
                                    href={link.href} 
                                    aria-label={link.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-400 hover:bg-primary hover:text-white transition-colors"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <div className="pt-2">
                           <LanguageSwitcher />
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="material-icons-outlined text-lg mt-0.5">call</span>
                            <p>{t('footer.contact.phone')}</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="material-icons-outlined text-lg mt-0.5">location_on</span>
                            <p dangerouslySetInnerHTML={{ __html: t('footer.contact.address') }}></p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 flex justify-center text-center text-sm">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;