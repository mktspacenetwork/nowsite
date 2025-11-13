import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { useLanguage } from '../contexts/LanguageContext';

interface SolutionCardProps {
    imgSrc: string;
    imgAlt: string;
    icon: string;
    title: string;
    description: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ imgSrc, imgAlt, icon, title, description }) => (
    <div className="relative rounded-lg overflow-hidden group h-96 md:h-auto md:aspect-square">
        <img alt={imgAlt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" src={imgSrc} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white text-left">
            <div className="w-14 h-14 bg-primary/80 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                <span className="material-icons-outlined text-4xl">{icon}</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);


const Solutions: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    const solutionsData = [
        {
            imgSrc: "https://i.ibb.co/Gf3CrHK4/now-detetecao-facial.jpg",
            imgAlt: "Man using facial recognition for intelligent access",
            icon: "key",
            title: t('solutions.card1.title'),
            description: t('solutions.card1.description')
        },
        {
            imgSrc: "https://i.ibb.co/TDkZt1wX/Now-id-Ia.jpg",
            imgAlt: "AI monitoring identifying people in a crowd",
            icon: "shield",
            title: t('solutions.card2.title'),
            description: t('solutions.card2.description')
        },
        {
            imgSrc: "https://i.ibb.co/HTCMMhhF/now-Smartk-Lock.jpg",
            imgAlt: "Smart lockers in a condominium lobby",
            icon: "inventory_2",
            title: t('solutions.card3.title'),
            description: t('solutions.card3.description')
        }
    ];

    return (
        <section ref={sectionRef} className="bg-background-light dark:bg-background-dark py-24">
            <div className="container mx-auto px-6 text-center">
                <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">{t('solutions.title')}</h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('solutions.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutionsData.map((solution, index) => (
                        <div 
                            key={index} 
                            className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                        >
                            <SolutionCard {...solution} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;