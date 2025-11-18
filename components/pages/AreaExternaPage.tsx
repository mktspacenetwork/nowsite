import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

const AreaExternaPage: React.FC = () => {
    const { t } = useLanguage();
    const introRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(introRef, { threshold: 0.1 });

    const products = [
        { icon: 'fence', title: t('areaExternaPage.products.p1.title'), description: t('areaExternaPage.products.p1.description'), imgSrc: 'https://i.ibb.co/d24H0fW/cerca-virtual.jpg' },
        { icon: 'pin', title: t('areaExternaPage.products.p2.title'), description: t('areaExternaPage.products.p2.description'), imgSrc: 'https://i.ibb.co/Jc5B9yC/lpr-now.jpg' },
        { icon: 'thermostat', title: t('areaExternaPage.products.p3.title'), description: t('areaExternaPage.products.p3.description'), imgSrc: 'https://i.ibb.co/8XN3bQk/visao-termica.jpg' },
    ];

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/ZRmPXv0y/portaria-now.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('areaExternaPage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('areaExternaPage.hero.subtitle')}</p>
                </div>
            </section>

            <section ref={introRef} className="py-24 bg-background-light dark:bg-background-dark">
                <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">{t('areaExternaPage.intro.title')}</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">{t('areaExternaPage.intro.description')}</p>
                    </div>
                </div>
            </section>

            <section className="pb-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div key={index} className={`bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${150 * (index + 1)}ms` }}>
                                <img src={product.imgSrc} alt={product.title} className="w-full h-56 object-cover" />
                                <div className="p-8">
                                    <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                                        <span className="material-icons-outlined text-3xl text-primary">{product.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                                    <p className="text-text-light-secondary dark:text-text-dark-secondary">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AreaExternaPage;