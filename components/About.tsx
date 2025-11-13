import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

const partners = [
    { src: "https://i.ibb.co/kVJcsbMx/arena-cortinthians.png", alt: "Logo do parceiro Corinthians Arena", className: "h-16" },
    { src: "https://i.ibb.co/ksnSRkDK/logoporsche.png", alt: "Logo do parceiro Porsche", className: "h-20" },
    { src: "https://i.ibb.co/jPFR03Gz/logo-itau.png", alt: "Logo do parceiro Itaú", className: "h-20" },
    { src: "https://i.ibb.co/cXXxZPKK/logo-chevrolet.png", alt: "Logo do parceiro Chevrolet", className: "h-12" },
    { src: "https://i.ibb.co/00SmXXr/logo-bayer.png", alt: "Logo do parceiro Bayer", className: "h-24" },
    { src: "https://i.ibb.co/MD2kKhJM/logo-vilarossa.png", alt: "Logo do parceiro Villa Rossa", className: "h-24" },
];

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    return (
        <section ref={sectionRef} className="bg-white dark:bg-background-dark py-24">
            <div className="container mx-auto px-6 text-center">
                <div className={`max-w-3xl mx-auto mb-20 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-primary font-semibold tracking-widest text-sm mb-4">DIFERENCIAIS</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">Por que escolher a Now?</h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">Temos a solução inteligente e sob medida para a realidade de cada condomínio. Acompanhamos síndicos e gestores em todas as etapas, desde o diagnóstico até a operação, com suporte dedicado, tecnologia de ponta e foco total em segurança, eficiência e tranquilidade.</p>
                </div>
                
                <div 
                    className={`max-w-5xl mx-auto transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    <p className="text-primary font-semibold tracking-widest text-sm mb-8">NOSSOS PARCEIROS</p>
                    
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
    );
};

export default About;