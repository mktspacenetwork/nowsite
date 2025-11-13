import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

const partners = [
    { src: "https://i.ibb.co/kVJcsbMx/arena-cortinthians.png", alt: "Logo do parceiro Corinthians Arena", className: "h-16" },
    { src: "https://i.ibb.co/ksnSRkDK/logoporsche.png", alt: "Logo do parceiro Porsche", className: "h-20" },
    { src: "https://i.ibb.co/jPFR03Gz/logo-itau.png", alt: "Logo do parceiro Itaú", className: "h-20" },
    { src: "https://i.ibb.co/cXXxZPKK/logo-chevrolet.png", alt: "Logo do parceiro Chevrolet", className: "h-12" },
    { src: "https://i.ibb.co/00SmXXr/logo-bayer.png", alt: "Logo do parceiro Bayer", className: "h-24" },
    { src: "https://i.ibb.co/MD2kKhJM/logo-vilarossa.png", alt: "Logo do parceiro Villa Rossa", className: "h-24" },
];

const QuemSomos: React.FC = () => {
    const { t } = useLanguage();
    const storyRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const partnersRef = useRef<HTMLDivElement>(null);

    const isStoryVisible = useOnScreen(storyRef, { threshold: 0.1 });
    const isValuesVisible = useOnScreen(valuesRef, { threshold: 0.1 });
    const isPartnersVisible = useOnScreen(partnersRef, { threshold: 0.1 });

    const values = [
      { icon: 'emoji_objects', title: t('quemSomos.values.v1.title'), description: t('quemSomos.values.v1.description') },
      { icon: 'verified_user', title: t('quemSomos.values.v2.title'), description: t('quemSomos.values.v2.description') },
      { icon: 'groups', title: t('quemSomos.values.v3.title'), description: t('quemSomos.values.v3.description') },
    ];

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/TDWhWRWP/freepik-skyline-da-cidade-de-so-paulo-ao-anoitecer-captura-86021.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('quemSomos.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('quemSomos.hero.subtitle')}</p>
                </div>
            </section>

            <section ref={storyRef} className="py-24 bg-background-light dark:bg-background-dark">
                <div className={`container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${isStoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="order-2 md:order-1">
                        <p className="text-primary font-semibold tracking-widest text-sm mb-4">{t('quemSomos.story.tagline')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">{t('quemSomos.story.title')}</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">{t('quemSomos.story.p1')}</p>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('quemSomos.story.p2')}</p>
                    </div>
                    <div className="order-1 md:order-2">
                         <img src="https://i.ibb.co/Qv4BxXn0/freepik-crie-a-imagem-dos-dois-homens-que-esto-na-img2eles-86013.jpg" alt="Equipe da Now Soluções em uma reunião de planejamento estratégico" className="rounded-lg shadow-2xl w-full h-full object-cover aspect-[4/3]" />
                    </div>
                </div>
            </section>

            <section ref={valuesRef} className="py-24 bg-white dark:bg-background-darker">
                <div className="container mx-auto px-6 text-center">
                    <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${isValuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">{t('quemSomos.values.title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className={`transition-all duration-700 ease-out ${isValuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${150 * (index + 1)}ms` }}>
                                <div className="inline-block p-5 bg-primary/10 rounded-lg mb-6">
                                    <span className="material-icons-outlined text-4xl text-primary">{value.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                                <p className="text-text-light-secondary dark:text-text-dark-secondary">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={partnersRef} className="py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6 text-center">
                    <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${isPartnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">{t('quemSomos.partners.title')}</h2>
                    </div>
                    <div 
                        className={`max-w-5xl mx-auto transition-all duration-700 ease-out transform ${isPartnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                            <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                                {[...partners, ...partners].map((partner, index) => (
                                    <div key={index} className="flex-shrink-0 w-48 h-28 flex items-center justify-center mx-2">
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
                </div>
            </section>
        </>
    );
};

export default QuemSomos;