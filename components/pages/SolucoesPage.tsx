import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

const SolucoesPage: React.FC = () => {
    const { t } = useLanguage();
    const pageRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(pageRef, { threshold: 0.05 });

    const solutions = [
        {
            icon: 'key',
            title: t('solucoesPage.s1.title'),
            description: t('solucoesPage.s1.description'),
            imgSrc: 'https://i.ibb.co/wr7JMf8N/freepik-crie-a-imagem-dos-dois-homens-que-esto-na-img2eles-86011.png'
        },
        {
            icon: 'public',
            title: t('solucoesPage.s2.title'),
            description: t('solucoesPage.s2.description'),
            imgSrc: 'https://i.ibb.co/SwX34ZgQ/freepik-crie-a-imagem-dos-dois-homens-que-esto-na-img2eles-86008.png'
        },
        {
            icon: 'meeting_room',
            title: t('solucoesPage.s3.title'),
            description: t('solucoesPage.s3.description'),
            imgSrc: 'https://i.ibb.co/39MF8P7G/freepik-imagem-realista-e-profissional-mostrando-um-morado-86018.png'
        },
        {
            icon: 'engineering',
            title: t('solucoesPage.s4.title'),
            description: t('solucoesPage.s4.description'),
            imgSrc: 'https://i.ibb.co/67MBK6JC/freepik-cena-realista-em-alta-definio-mostrando-a-fachada-86017.jpg'
        },
        {
            icon: 'design_services',
            title: t('solucoesPage.s5.title'),
            description: t('solucoesPage.s5.description'),
            imgSrc: 'https://i.ibb.co/Qv4BxXn0/freepik-crie-a-imagem-dos-dois-homens-que-esto-na-img2eles-86013.jpg'
        }
    ];

    return (
        <div ref={pageRef}>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/TDWhWRWP/freepik-skyline-da-cidade-de-so-paulo-ao-anoitecer-captura-86021.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('solucoesPage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('solucoesPage.hero.subtitle')}</p>
                </div>
            </section>

            <section className="py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6">
                    <div className="space-y-20">
                        {solutions.map((solution, index) => (
                            <div
                                key={index}
                                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${100 * index}ms` }}
                            >
                                <div className={`text-left ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                                        <span className="material-icons-outlined text-3xl text-primary">{solution.icon}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">{solution.title}</h2>
                                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">{solution.description}</p>
                                </div>
                                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <img src={solution.imgSrc} alt={solution.title} className="rounded-lg shadow-2xl w-full h-full object-cover aspect-video" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolucoesPage;