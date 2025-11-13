import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

const partners = [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRo3TR85diC4NQXCfbP0PhrvOgssMt5f1a80kurGMHELfCEyLx-QPsSpO_-JkvT24oUzPvwjmnAKayCDmws8_tf-QV2-oKyXkZH6Yoj6PucgE43fHp5Cz5SKLth8ob9WhJZ-5V-vzTrErfRCxcdhS2KJEMlJwljDeRQpIQiPk48rztdUzcdRf8rdq36neGDdvDmWpqdKaCZ-2bSiy2DHR0PDvjKmRhChxFlDHPN6KQva_wtKTlre_xKiTOXRenmQUcbWFmDdNKKg", alt: "Corinthians Arena logo", className: "h-10" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPfQlGfQ2DpUCjkXok0fYNdq5-7bk-WSKGqF_66F3lTYBHkHeCd43Q7qmojDWIWFElAxXkVQt49yYS94E85qowrXFr7wuwVyxo7Fqk9bbom-Vj7rAADbkH4G_-tTAiPoiPaRPTLqOrfQalCiQfITEAWAtRs4DqhhmoJ3P-OEFiP604Kpn3ejKggF4vmNlI0QViTZfWOhi_eP1-Ga95Woffq7BhN7bt8u7sDw-PLp6yAwWVVdyE5CvAeXX8yEMyttzG21A470teKA", alt: "Porsche logo", className: "h-12" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG2LljZPCYmyhgbXa2pjvVVTqy8UP-epghgIv8c9thwr9twRWIhGbm24tF8RefD11MUOt7Kjm820RuFKDdtz6oCqUxWGa5RV_ReT0QSMQ9sSWi85NTbqydfq7i0Hk_gu9wrK22pkUtI8oCNE-H5eC9LTkSS9Bu23IJpL3BrD9pqLTb2wKdT5H5wk1uPach3C52SuXX5N0Rfr7I4SKkzgJtfaulrlhxMbFHws0G-Ct37Y79PPgs7dnik-X7jZHIabn2G7xoKoeXqQ", alt: "Itaú logo", className: "h-12 non-dark-invert" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB1KdGgNu8vxVVRR3l4YbCn49w35boiLBH660vk_mCWpnfhiTd8p_eVabxcYxAwf9oIso5OS9oC1E5MsjFzcrsPmCc3fVis42vLYmyo6RlGSMD2h0rSJl4rsC-emsnoAqhKKy40fNpFFJGgSUFEI042SGhz33MJv-4N-B3vzJaFfLRwe48-9JPfeJGG09ko9gBd3zZSLf7rJBDoMvDrCU8iCUhi6dIvhCXDyZVKeX21rzmErmniGDkbbs3Sl68XoHf3qL4g-PziA", alt: "Chevrolet logo", className: "h-8" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTny9tck8DfgJU-p9dUJBUOLKMzRTXtdmmuTromI5nZOB9o6HOy_4fhxz8LUkpfoV9ECf_jDl7KB54pGdLT-GxxD5iwM5obWXKukXrcXbJW3jLjGp_Qf0icPw-h4goHtofX0w4O5PM1j4jOWWbuxJfFCvE0_mRUpB6GQYGel9q3hMtWihMO1FpF-XTq9r3EjVHTkNPYIr83nT2DUrogwYBdFuzzHHL8xI9O3qyRAKpUDh_VhtcmbQLGMsoRQI_b1uenTLJHLPMg", alt: "Bayer logo", className: "h-14" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_at7yhnzXKo72HtXUXCTXRfYEAsh3_cYm-5WmmxwHi5dHpwhxOcNzSH25iKvKhEDhQaGTGGO0aA2Gupt9i7e5gTvtLKcNJsH-FlJFORa03CfFd-RoR-DyZPHK2iuqClkeg2rCliQ_b0LR8qSWTgE0nh9ctxDCHPQt3LuOh6syH-xEhiJag7n3qNms4V0YC4LyeSmBHCIKfP5Xn-UCo_ZwWq2vRYLhXtJzy8z5ckNCx6gB7Fng3TUbLkYCdcT_6JFNYfZHZHPGsQ", alt: "Villa Rossa logo", className: "h-14" },
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
                                <div key={index} className="flex-shrink-0 w-64 h-20 flex items-center justify-center mx-4">
                                    <img 
                                        alt={partner.alt} 
                                        className={`${partner.className} max-h-14 w-auto filter grayscale hover:grayscale-0 transition duration-300 ${partner.className.includes('non-dark-invert') ? '' : 'dark:invert dark:hover:invert-0'}`} 
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
