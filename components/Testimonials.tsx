import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

interface TestimonialCardProps {
    quote: string;
    imgSrc: string;
    name: string;
    title: string;
    company: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, imgSrc, name, title, company }) => (
    <div className="flex flex-col">
        <p className="text-lg italic text-gray-300 mb-6">"{quote}"</p>
        <div className="flex items-center mt-auto">
            <img alt={`Profile picture of ${name}`} className="w-14 h-14 rounded-full mr-4" src={imgSrc} />
            <div>
                <p className="font-bold text-lg">{name}</p>
                <p className="text-sm text-gray-400">{title}, {company}</p>
            </div>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    const testimonialsData = [
        {
            quote: "Com a Now conseguimos organizar toda a comunicação e controle do nosso condomínio. O aplicativo facilitou muito a vida de todos.",
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAePh9PeAAZ0TIO2wx8Jm0mprLWoZHaTqDouCDzMLJQAEigBMGIxC_KmMgPO-gm4Ii9RzBjCTVy1Pm8KoaDiQMgeYiNMIk4ZN8Eqqao2NruIwiBlGtN02O3AfvtVE9vR-K4_uifYUGBTe4XIs2k5M7VRnz4LI_vEBh5b2kEm5qdAJnbqEg4damk26rAlEQrEo4jzxfTkCsf4fj01_R2gVGvQ4w6f55gdvLGLFY1l-umKlSjSYH8Rzupam6E-bSshLkOTtzH7-Dmug",
            name: "Carlos Mendes",
            title: "síndico",
            company: "Condomínio Vila Serena"
        },
        {
            quote: "O sistema de acesso facial e os armários inteligentes mudaram completamente nossa rotina. Estamos mais seguros e organizados.",
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9FtpUbpJT8bo-XEMoF4sn5tuwpciroeRL4Mp2UQbVPxHicF_m2e4C_swI6glu2knLr-piLZXTh8woDt9gkXIdQjQ535P5N92Ib4ZFL8uFqMji30mzJBfbJgT6I9pju5CLsQ03KpvrMJ4dl_j9O_vHZpi6Re8yBsqMHLQZCrgtwnjLbUtU_uD3n0BAMzE1RibS7P9nEasvLCWeEj1G_72-w3oLiepalRtYBSVcpScVEg9zRF06aLw___NjPjGsUXzVcEKw7dTcag",
            name: "Ana Lúcia Barros",
            title: "gestora",
            company: "Smart Park Alphaville"
        },
        {
            quote: "Suporte técnico ágil e eficiente. A equipe da Now está sempre pronta para nos atender, o que faz toda a diferença na gestão diária.",
            imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUjMaVpRebClr9qiqvOSbHuYdKv0ElyrZWm88khyvhFdDekJ-8Jp4R5a4yEPUj2qHMH70WvgKECbCW7AAcnsZTMYLNhT8CZyTXVHEpHP2clMCQHOla1F_nUu4rQhWaMIC8ZU08KfLbiEUTqYxUZjaBO-eGlmuyG-Oqd-Gs_bERXZTIUBV7RRyARkIAoBJmLVy7vq-7pt9jBwZ7ITmvSHiU5O5CTsmZRoayyghNeoxwcrToFBgJj0pgZY0o5szbiZqL79GomRnyAg",
            name: "Roberto Almeida",
            title: "administrador",
            company: "Edifício Corporate Tower"
        }
    ];
    return (
        <section ref={sectionRef} className="bg-background-dark py-24 text-white">
            <div className="container mx-auto px-6 text-left">
                <h2 className={`text-4xl md:text-5xl font-bold mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>O que nossos clientes dizem</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {testimonialsData.map((testimonial, index) => (
                       <div 
                        key={index} 
                        className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                       >
                           <TestimonialCard {...testimonial} />
                       </div>
                   ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
