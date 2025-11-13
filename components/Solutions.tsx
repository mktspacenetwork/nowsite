import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

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
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    const solutionsData = [
        {
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB52M7znmWPk_FjXEd3_7WHHM9PUlXIvMk2DOftOOF60h_ffCTeE9yG8ApWC9sRYJqWQlAGljkh16zbbtR_UtW6mp4n327vuNCfxHEPZjnTtf-UH-STbPcyC891hVY-nYJ09lvANbuelxYnv7vn1AILdcYsDjRfoABCqCwoW-layWKyA6EiN4Q-3oLWhc50Q8jAWMiKBOZGT9gGZZ2rGi9A5cMT6nxprZThBIkB1WqR8rXmyFdKOM_ZNjqJBZi9NkkMcuU6kd0RsA",
            imgAlt: "Man using facial recognition for intelligent access",
            icon: "key",
            title: "Acesso Inteligente",
            description: "Controle facial, QR Code, convites digitais, reconhecimento veicular e liberação remota via app."
        },
        {
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKSGjnkVLkBLauWsW-UB6FCBHpsI4EWxF1K1FATxE071Q6iD9MP6O2OQOQOVIzEl63KvrlteXbOi1dA02FfQgniyKriEPc66DGXTlh30PLKgM2mJQ_KYzK-MXuu3tRdlTZzEKUMxyk9ZBEMe05kIxqILJreHJWN42Snz3993g-o35FNN0vQ2e4hAJxdGPV8zChFltic2Vhd7Yb68G796jRPtLNVdBSGiQG2ozHaeEvUqug9Ts7yCLx0EO0AANhL4xUCo7ZVotOVg",
            imgAlt: "AI monitoring identifying people in a crowd",
            icon: "shield",
            title: "Monitoramento IA",
            description: "Câmeras com inteligência artificial, cercas virtuais, alarmes sonoros e sensores com análise de comportamento."
        },
        {
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMjqXV6BtZ9urIGSaGpyhfMQdzRyM-ZEBFZqOg5Aby8hmNJQk9nRXzRWf0NqjiU4Iz5NJLnDeTWfRGVmjOzI5JXBG88kSYACb7WliYEiecjvq1c3RaOrN8EeRmQfwE0KwfZxZ55XK8GGyEVEAQPW8CGNkCIii99XrJmpBYNqclpPo7jhiqhckGssMdQyBKhK3kHcyb4C8RIhTDOPlpPfT2vbRv7TUXFYTzIX_m9nnbyimDTm6rmLqfxXviA_Gw4Xvx6m4vZLGr6Q",
            imgAlt: "Smart lockers in a condominium lobby",
            icon: "inventory_2",
            title: "Armários Inteligentes",
            description: "Recebimento de encomendas 24/7 com segurança e autonomia. Notificações via app para retirada."
        }
    ];

    return (
        <section ref={sectionRef} className="bg-background-light dark:bg-background-dark py-24">
            <div className="container mx-auto px-6 text-center">
                <div className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">Seu condomínio mais inteligente. Sua vida mais segura.</h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary">Combinamos tecnologia de ponta, atendimento próximo e soluções personalizadas para transformar a rotina de condomínios residenciais e comerciais. Cada serviço é desenvolvido para oferecer mais segurança, praticidade e tranquilidade para síndicos, moradores e administradoras.</p>
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
