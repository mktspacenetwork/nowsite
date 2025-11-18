import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';
import { Page } from '../../App';

interface CondominioInteligentePageProps {
    setCurrentPage: (page: Page) => void;
}

const partners = [
    { src: "https://i.ibb.co/kVJcsbMx/arena-cortinthians.png", alt: "Logo do parceiro Corinthians Arena", className: "h-16" },
    { src: "https://i.ibb.co/ksnSRkDK/logoporsche.png", alt: "Logo do parceiro Porsche", className: "h-20" },
    { src: "https://i.ibb.co/jPFR03Gz/logo-itau.png", alt: "Logo do parceiro Itaú", className: "h-20" },
    { src: "https://i.ibb.co/cXXxZPKK/logo-chevrolet.png", alt: "Logo do parceiro Chevrolet", className: "h-12" },
    { src: "https://i.ibb.co/00SmXXr/logo-bayer.png", alt: "Logo do parceiro Bayer", className: "h-24" },
    { src: "https://i.ibb.co/MD2kKhJM/logo-vilarossa.png", alt: "Logo do parceiro Villa Rossa", className: "h-24" },
];

const CondominioInteligentePage: React.FC<CondominioInteligentePageProps> = ({ setCurrentPage }) => {
    const { t } = useLanguage();
    const pageRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(pageRef, { threshold: 0.05 });

    const challenges = [
        { title: t('condominioInteligentePage.challenge.c1.title'), description: t('condominioInteligentePage.challenge.c1.description') },
        { title: t('condominioInteligentePage.challenge.c2.title'), description: t('condominioInteligentePage.challenge.c2.description') },
        { title: t('condominioInteligentePage.challenge.c3.title'), description: t('condominioInteligentePage.challenge.c3.description') },
    ];

    // URLs de imagem fornecidas pelo usuário
    const pillarImages = {
        'Segurança Inteligente com IA': 'https://github.com/mktspacenetwork/nowsite/blob/main/public/images/portaria_inteligente.jpg?raw=true',
        'Conectividade de Alta Performance': 'https://github.com/mktspacenetwork/nowsite/blob/main/public/images/portaria_inteligente.jpg?raw=true',
        'Gestão Digital e Automação': 'https://github.com/mktspacenetwork/nowsite/blob/main/public/images/gestaodigital.jpg?raw=true',
        'Controle de Acesso Avançado': 'https://github.com/mktspacenetwork/nowsite/blob/main/public/images/controle_facial.jpg?raw=true',
    };

    // Reordenado para melhor fluxo visual (Segurança, Conectividade, Gestão, Acesso)
    const pillars = [
        { icon: t('condominioInteligentePage.solution.p1.icon'), title: t('condominioInteligentePage.solution.p1.title'), description: t('condominioInteligentePage.solution.p1.description') },
        { icon: t('condominioInteligentePage.solution.p2.icon'), title: t('condominioInteligentePage.solution.p2.title'), description: t('condominioInteligentePage.solution.p2.description') },
        { icon: 'devices', title: t('condominioInteligentePage.solution.p3.title'), description: t('condominioInteligentePage.solution.p3.description') },
        { icon: t('condominioInteligentePage.solution.p4.icon'), title: t('condominioInteligentePage.solution.p4.title'), description: t('condominioInteligentePage.solution.p4.description') },
    ];

    const tableData = [
        t('condominioInteligentePage.differentiator.table.r1'),
        t('condominioInteligentePage.differentiator.table.r2'),
        t('condominioInteligentePage.differentiator.table.r3'),
        t('condominioInteligentePage.differentiator.table.r4'),
        t('condominioInteligentePage.differentiator.table.r5'),
        t('condominioInteligentePage.differentiator.table.r6'),
    ];

    // Nova URL de imagem para o Hero
    const heroImageUrl = 'https://github.com/mktspacenetwork/nowsite/blob/main/public/images/98438.jpg?raw=true';

    const handleFinalCtaClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage('contato');
        window.scrollTo(0, 0);
    };

    return (
        <div ref={pageRef}>
            {/* 1. Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: `linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('${heroImageUrl}')` }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    {/* H1 ajustado para text-4xl md:text-5xl (redução de ~20%) */}
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">{t('condominioInteligentePage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }} dangerouslySetInnerHTML={{ __html: t('condominioInteligentePage.hero.subtitle') }}></p>
                    <a href="#contato" className="mt-8 inline-block bg-white text-primary px-8 py-4 rounded-full font-medium transition-all hover:brightness-95 transform hover:scale-105 active:scale-95 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        {t('condominioInteligentePage.hero.cta')}
                    </a>
                </div>
            </section>

            {/* 1.5. New Social Proof Section: Quem Confia na NOW */}
            <section className={`py-12 bg-white dark:bg-background-darker transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="container mx-auto px-6 text-center">
                    <p className="text-primary font-semibold tracking-widest text-sm mb-8">{t('condominioInteligentePage.socialProof1.title')}</p>
                    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                            {[...partners, ...partners].map((partner, index) => (
                                <div key={index} className="flex-shrink-0 w-48 h-28 flex items-center justify-center mx-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                    <img 
                                        alt={partner.alt} 
                                        className={`${partner.className} max-h-24 w-auto`} 
                                        src={partner.src} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. The Challenge Section */}
            <section className={`py-24 bg-background-light dark:bg-background-dark transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="container mx-auto px-6 text-center">
                    {/* H2 ajustado para text-3xl md:text-4xl (redução de ~20%) */}
                    <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-12">{t('condominioInteligentePage.challenge.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {challenges.map((challenge, index) => (
                            <div key={index} className="bg-white dark:bg-surface-dark p-8 rounded-lg shadow-lg problem-card">
                                <h3 className="text-2xl font-bold text-primary mb-3">{challenge.title}</h3>
                                <p className="text-text-light-secondary dark:text-text-dark-secondary">{challenge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. The Solution Section (4 Pillars) */}
            <section className={`py-24 bg-white dark:bg-background-darker transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
                <div className="container mx-auto px-6 text-center">
                    {/* H2 ajustado para text-3xl md:text-4xl (redução de ~20%) */}
                    <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-12">{t('condominioInteligentePage.solution.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pillars.map((pillar, index) => (
                            <div 
                                key={index} 
                                className="relative h-72 rounded-lg overflow-hidden group shadow-xl transition-all duration-300 hover:shadow-2xl"
                                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${pillarImages[pillar.title as keyof typeof pillarImages]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white text-left">
                                    <div className="w-12 h-12 bg-primary/80 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                        <span className="material-icons-outlined text-3xl">{pillar.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                                    <p className="text-gray-200 text-sm line-clamp-2">{pillar.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Social Proof Section (Video Case) */}
            <section className={`py-24 bg-background-light dark:bg-background-dark text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="container mx-auto px-6">
                    {/* H2 ajustado para text-3xl md:text-4xl (redução de ~20%) */}
                    <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">{t('condominioInteligentePage.socialProof.title')}</h2>
                    <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mt-4 mb-8 max-w-2xl mx-auto font-semibold">{t('condominioInteligentePage.socialProof.subtitle')}</p>
                    <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg max-w-4xl mx-auto flex items-center justify-center video-container">
                        <span className="material-icons-outlined text-6xl text-gray-500">play_circle_outline</span>
                    </div>
                    <a href="#diferencial" className="mt-8 inline-block bg-primary/80 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-primary active:scale-95 cta-button-secondary">
                        {t('condominioInteligentePage.socialProof.cta')}
                    </a>
                </div>
            </section>

            {/* 5. Detailed Solutions Section */}
            <section className={`py-24 bg-white dark:bg-background-darker transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '450ms' }}>
                <div className="container mx-auto px-6">
                    {/* H2 ajustado para text-3xl md:text-4xl (redução de ~20%) */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('condominioInteligentePage.detailedSolutions.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="solution-category">
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s1.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary solution-item">{t('condominioInteligentePage.detailedSolutions.s1.description')}</p>
                        </div>
                        <div className="solution-category">
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s2.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary solution-item">{t('condominioInteligentePage.detailedSolutions.s2.description')}</p>
                        </div>
                        <div className="solution-category">
                            <h3 className="text-2xl font-bold text-primary mb-4">{t('condominioInteligentePage.detailedSolutions.s3.title')}</h3>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary solution-item">{t('condominioInteligentePage.detailedSolutions.s3.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Differentiator Section (Financial Comparison) */}
            <section id="diferencial" className={`py-24 bg-background-light dark:bg-background-dark transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
                <div className="container mx-auto px-6">
                    {/* H2 ajustado para text-3xl md:text-4xl (redução de ~20%) */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" dangerouslySetInnerHTML={{ __html: t('condominioInteligentePage.differentiator.title') }}></h2>
                    <div className="overflow-x-auto comparison-table">
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
                    {/* H2 ajustado para text-3xl md:text-5xl (mantido o tamanho para alto impacto) */}
                    <h2 className="text-3xl md:text-5xl font-bold">{t('condominioInteligentePage.finalCta.title')}</h2>
                    <p className="text-lg mt-4 mb-8 max-w-3xl mx-auto">{t('condominioInteligentePage.finalCta.subtitle')}</p>
                    <button onClick={handleFinalCtaClick} className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg transition-all hover:brightness-95 transform hover:scale-105 active:scale-95 cta-button-final">
                        {t('condominioInteligentePage.finalCta.cta')}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CondominioInteligentePage;