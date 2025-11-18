import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

const CondominioInteligentePage: React.FC = () => {
    const { t } = useLanguage();
    const pageRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(pageRef, { threshold: 0.05 });

    const challenges = [
        { title: t('condominioInteligentePage.challenge.c1.title'), description: t('condominioInteligentePage.challenge.c1.description') },
        { title: t('condominioInteligentePage.challenge.c2.title'), description: t('condominioInteligentePage.challenge.c2.description') },
        { title: t('condominioInteligentePage.challenge.c3.title'), description: t('condominioInteligentePage.challenge.c3.description') },
    ];

    const pillars = [
        { icon: 'security', title: t('condominioInteligentePage.solution.p1.title'), description: t('condominioInteligentePage.solution.p1.description') },
        { icon: 'key', title: t('condominioInteligentePage.solution.p2.title'), description: t('condominioInteligentePage.solution.p2.description') },
        { icon: 'wifi', title: t('condominioInteligentePage.solution.p3.title'), description: t('condominioInteligentePage.solution.p3.description') },
        { icon: 'devices', title: t('condominioInteligentePage.solution.p4.title'), description: t('condominioInteligentePage.solution.p4.description') },
    ];

    const tableData = [
        { feature: t('condominioInteligentePage.differentiator.table.r1.feature'), traditional: t('condominioInteligentePage.differentiator.table.r1.traditional'), now: t('condominioInteligentePage.differentiator.table.r1.now') },
        { feature: t('condominioInteligentePage.differentiator.table.r2.feature'), traditional: t('condominioInteligentePage.differentiator.table.r2.traditional'), now: t('condominioInteligentePage.differentiator.table.r2.now') },
        { feature: t('condominioInteligentePage.differentiator.table.r3.feature'), traditional: t('condominioInteligentePage.differentiator.table.r3.traditional'), now: t('condominioInteligentePage.differentiator.table.r3.now') },
        { feature: t('condominioInteligentePage.differentiator.table.r4.feature'), traditional: t('condominioInteligentePage.differentiator.table.r4.traditional'), now: t('condominioInteligentePage.differentiator.table.r4.now') },
    ];

    return (
        <div ref={pageRef}>
            {/* 1. Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/TDWhWRWP/freepik-skyline-da-cidade-de-so-paulo-ao-anoitecer-captura-86021.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">{t('condominioInteligentePage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }} dangerouslySetInnerHTML={{ __html: t('condominioInteligentePage.hero.subtitle') }}></p>
                    <a href="#contato" className="mt-8 inline-block bg-primary text-white px-8 py-4 rounded-full font-medium transition-all hover:brightness-95 transform hover:scale-105 active:scale-95 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        {t('condominioInteligentePage.hero.cta')}
                    </a>
                </div>
            </section>

            {/* 2. The Challenge Section */}
            <section className={`py-24 bg-background-light dark:bg-background-dark transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-12">{t('condominioInteligentePage.challenge.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {challenges.map((challenge, index) => (
                            <div key={index} className="bg-white dark:bg-surface-dark p-8 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold text-primary mb-3">{challenge.title}</h3>
                                <p className="text-text-light-secondary dark:text-text-dark-secondary">{challenge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. The Solution Section */}
            <section className={`py-24 bg-white dark:bg-background-darker transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-12">{t('condominioInteligentePage.solution.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pillars.map((pillar, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-block p-5 bg-primary/10 rounded-lg mb-6">
                                    <span className="material-icons-outlined text-4xl text-primary">{pillar.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">{pillar.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Social Proof Section */}
            <section className={`py-24 bg-background-light dark:bg-background-dark text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">{t('condominioInteligentePage.socialProof.title')}</h2>
                    <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mt-4 mb-8 max-w-2xl mx-auto">{t('condominioInteligentePage.socialProof.subtitle')}</p>
                    <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg max-w-4xl mx-auto flex items-center justify-center">
                        <span className="material-icons-outlined text-6xl text-gray-500">play_circle_outline</span>
                    </div>
                    <a href="#contato" className="mt-8 inline-block bg-primary/80 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-primary active:scale-95">
                        {t('condominioInteligentePage.socialProof.cta')}
                    </a>
                </div>
            </section>

            {/* 5. Detailed Solutions Section */}
            <section className={`py-24 bg-white dark:bg-background-darker transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '450ms' }}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{t('condominioInteligentePage.detailedSolutions.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s1.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('condominioInteligentePage.detailedSolutions.s1.description')}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s2.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('condominioInteligentePage.detailedSolutions.s2.description')}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s3.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('condominioInteligentePage.detailedSolutions.s3.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Differentiator Section */}
            <section className={`py-24 bg-background-light dark:bg-background-dark transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{t('condominioInteligentePage.differentiator.title')}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-5xl mx-auto border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-300 dark:border-gray-600">
                                    <th className="p-4 text-lg font-bold">{t('condominioInteligentePage.differentiator.table.h1')}</th>
                                    <th className="p-4 text-lg font-bold">{t('condominioInteligentePage.differentiator.table.h2')}</th>
                                    <th className="p-4 text-lg font-bold bg-primary/10 text-primary rounded-t-lg">{t('condominioInteligentePage.differentiator.table.h3')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-4 font-semibold" dangerouslySetInnerHTML={{ __html: row.feature }}></td>
                                        <td className="p-4 text-text-light-secondary dark:text-text-dark-secondary">{row.traditional}</td>
                                        <td className="p-4 bg-primary/10 text-text-light-primary dark:text-text-dark-primary font-bold" dangerouslySetInnerHTML={{ __html: row.now }}></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 7. Final CTA Section */}
            <section id="contato" className={`py-24 bg-primary text-white text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '750ms' }}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold">{t('condominioInteligentePage.finalCta.title')}</h2>
                    <p className="text-lg mt-4 mb-8 max-w-3xl mx-auto">{t('condominioInteligentePage.finalCta.subtitle')}</p>
                    <a href="https://wa.me/551152835040" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg transition-all hover:brightness-95 transform hover:scale-105 active:scale-95">
                        {t('condominioInteligentePage.finalCta.cta')}
                    </a>
                </div>
            </section>
        </div>
    );
};

export default CondominioInteligentePage;