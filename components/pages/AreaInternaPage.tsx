import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';
import CTA from '../CTA';

const AreaInternaPage: React.FC = () => {
    const { t } = useLanguage();
    const introRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(introRef, { threshold: 0.1 });

    const products = [
        { icon: 'videocam', title: t('areaInternaPage.products.p1.title'), description: t('areaInternaPage.products.p1.description'), imgSrc: 'https://raw.githubusercontent.com/mktspacenetwork/nowsite/main/public/images/analisedecomportamento.jpeg' },
        { icon: 'psychology', title: t('areaInternaPage.products.p2.title'), description: t('areaInternaPage.products.p2.description'), imgSrc: 'https://i.ibb.co/yQ5ZzJg/analise-comportamento.jpg' },
        { icon: 'event_available', title: t('areaInternaPage.products.p3.title'), description: t('areaInternaPage.products.p3.description'), imgSrc: 'https://raw.githubusercontent.com/mktspacenetwork/nowsite/main/public/images/cameradealtaresolucao.jpeg' },
        { icon: 'sensors', title: t('areaInternaPage.products.p4.title'), description: t('areaInternaPage.products.p4.description'), imgSrc: 'https://raw.githubusercontent.com/mktspacenetwork/nowsite/main/public/images/gassensor.jpg' },
    ];

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/zThc9bhk/app-now.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('areaInternaPage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('areaInternaPage.hero.subtitle')}</p>
                </div>
            </section>

            <section ref={introRef} className="py-24 bg-background-light dark:bg-background-dark">
                <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">{t('areaInternaPage.intro.title')}</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">{t('areaInternaPage.intro.description')}</p>
                    </div>
                </div>
            </section>

            <section className="pb-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div 
                                key={index} 
                                className={`relative rounded-lg overflow-hidden group h-96 md:h-auto md:aspect-square transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                            >
                                <img alt={product.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" src={product.imgSrc} />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white text-left">
                                    <div className="w-14 h-14 bg-primary/80 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                        <span className="material-icons-outlined text-4xl">{product.icon}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">{product.title}</h3>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CTA />
        </>
    );
};

export default AreaInternaPage;