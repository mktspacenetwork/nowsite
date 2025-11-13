import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

const solutions = [
    {
        icon: 'key',
        title: 'Área de Acesso',
        description: 'Soluções completas para controle de entrada e saída, incluindo reconhecimento facial, QR Code, convites digitais e integração com portaria remota para máxima segurança e conveniência.',
        imgSrc: 'https://i.ibb.co/39MF8P7G/freepik-imagem-realista-e-profissional-mostrando-um-morado-86018.png'
    },
    {
        icon: 'public',
        title: 'Área Externa',
        description: 'Monitoramento perimetral com câmeras de alta definição, cercas virtuais com inteligência artificial, alarmes sonoros e sensores de movimento para proteger o condomínio de ponta a ponta.',
        imgSrc: 'https://i.ibb.co/67MBK6JC/freepik-cena-realista-em-alta-definio-mostrando-a-fachada-86017.jpg'
    },
    {
        icon: 'meeting_room',
        title: 'Área Interna',
        description: 'Controle de acesso para áreas comuns como academias, salões de festas e piscinas. Garanta que apenas moradores autorizados utilizem os espaços, com relatórios de uso e agendamento via app.',
        imgSrc: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?auto=format&fit=crop&q=80'
    },
    {
        icon: 'engineering',
        title: 'Facilities',
        description: 'Otimização da gestão de facilities com sistemas de automação para iluminação, controle de bombas de água e gerenciamento de manutenções preventivas, reduzindo custos e aumentando a eficiência.',
        imgSrc: 'https://images.unsplash.com/photo-1542621334-a254cf47763b?auto=format&fit=crop&q=80'
    },
    {
        icon: 'design_services',
        title: 'Soluções sob medida',
        description: 'Entendemos que cada condomínio é único. Desenvolvemos projetos personalizados que integram diferentes tecnologias para atender às suas necessidades específicas de segurança e gestão.',
        imgSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'
    }
];

const SolucoesPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    // Fix: Removed invalid 'triggerOnce' property from IntersectionObserverInit options.
    const isVisible = useOnScreen(pageRef, { threshold: 0.05 });

    return (
        <div ref={pageRef}>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">Nossas Soluções</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Tecnologia e inovação para transformar a segurança e a gestão do seu condomínio.</p>
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
