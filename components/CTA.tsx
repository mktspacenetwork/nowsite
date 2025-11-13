import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { useLanguage } from '../contexts/LanguageContext';

const CTA: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.3 });

    return (
        <section className="cta-bg py-24">
            <div className="container mx-auto px-6 flex justify-center lg:justify-start">
                <div 
                    ref={sectionRef}
                    className={`bg-background-light dark:bg-background-dark p-12 rounded-lg max-w-xl text-left transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">{t('cta.title')}</h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">{t('cta.description')}</p>
                    <a 
                        className={`inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:brightness-95 transition-all duration-700 ease-out transform hover:scale-105 active:scale-95 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        href="https://wa.me/551152835040"
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ transitionDelay: '300ms' }}
                    >
                        {t('cta.button')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;