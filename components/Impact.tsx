import React, { useState, useEffect, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

const StatCounter: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value.match(/\d+/)?.[0] || '0', 10);
    const suffix = value.match(/[^\d.]+/)?.[0] || '';
    
    useEffect(() => {
        if (isVisible) {
            let startTimestamp: number | null = null;
            const duration = 1500;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentVal = Math.floor(progress * target);
                setCount(currentVal);
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setCount(target);
                }
            };
            requestAnimationFrame(step);
        }
    }, [isVisible, target]);

    return (
        <p className="text-5xl font-bold text-primary">{count}{suffix}</p>
    );
};


const Impact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    const stats = [
        { value: "80+", label: "Condomínios atendidos" },
        { value: "15+", label: "anos de experiência" },
        { value: "15+", label: "mil moradores impactados" },
        { value: "98%", label: "de satisfação entre síndicos e administradoras" }
    ];

    return (
        <section className="py-20 lg:py-0">
            <div className="container mx-auto px-6 -mt-20 relative z-10">
                <div 
                    ref={sectionRef}
                    className={`bg-background-light dark:bg-background-dark shadow-xl rounded-lg p-12 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center">
                        <div className="text-center md:text-left col-span-1 md:col-span-2 lg:col-span-1">
                            <h2 className="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">Nosso Impacto</h2>
                        </div>
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <StatCounter value={stat.value} isVisible={isVisible} />
                                <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
