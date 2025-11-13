import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

const Contato: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(formRef, { threshold: 0.1 });

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">Fale Conosco</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Tem alguma dúvida ou quer solicitar um orçamento? Nossa equipe está pronta para ajudar.</p>
                </div>
            </section>

            <section className="py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        
                        <div ref={formRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">Envie uma mensagem</h2>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">Preencha o formulário e entraremos em contato o mais breve possível.</p>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Nome</label>
                                    <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Email</label>
                                    <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Assunto</label>
                                    <input type="text" name="subject" id="subject" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Mensagem</label>
                                    <textarea name="message" id="message" rows={5} required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105">
                                        Enviar Mensagem
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div ref={infoRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                            <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-8">Nossas Informações</h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Endereço</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">Rua Antônio Nápoli, 229<br/>Parada São Paulo - SP, 02987-030</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">call</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Telefone</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">(11) 5283-5040</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                     <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">email</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Email</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">contato@nowsolucoes.com.br</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.865910125816!2d-46.70295882467269!3d-23.4651152788661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef9c148df5665%3A0x6b1bb4a6c321151a!2sR.%20Ant%C3%B4nio%20N%C3%A1poli%2C%20229%20-%20Parada%20de%20Taipas%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002987-030%2C%20Brazil!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                                    width="100%" 
                                    height="350" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={false} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contato;
