import React, { useRef, useState } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const Contato: React.FC = () => {
    const { t } = useLanguage();
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(formRef, { threshold: 0.1 });
    
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
    });
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Máscara de telefone
    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
        return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'telefone') {
            const formatted = formatPhoneNumber(value);
            setFormData(prev => ({ ...prev, [name]: formatted }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
                
                // Resetar status após 5 segundos
                setTimeout(() => {
                    setStatus('idle');
                }, 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Erro ao enviar mensagem.');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
            setErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.');
        }
    };

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/67MBK6JC/freepik-cena-realista-em-alta-definio-mostrando-a-fachada-86017.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('contato.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('contato.hero.subtitle')}</p>
                </div>
            </section>

            <section className="py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        
                        <div ref={formRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">{t('contato.form.title')}</h2>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">{t('contato.form.subtitle')}</p>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.name')}</label>
                                    <input 
                                        type="text" 
                                        name="nome" 
                                        id="nome" 
                                        required 
                                        minLength={3}
                                        maxLength={100}
                                        className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" 
                                        value={formData.nome} 
                                        onChange={handleInputChange} 
                                        placeholder="Seu nome completo"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.email')}</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        required 
                                        maxLength={254}
                                        className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" 
                                        value={formData.email} 
                                        onChange={handleInputChange} 
                                        placeholder="seu@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefone" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">Telefone</label>
                                    <input 
                                        type="tel" 
                                        name="telefone" 
                                        id="telefone" 
                                        required 
                                        className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" 
                                        value={formData.telefone} 
                                        onChange={handleInputChange} 
                                        placeholder="(11) 98765-4321"
                                        maxLength={15}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mensagem" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.message')}</label>
                                    <textarea 
                                        name="mensagem" 
                                        id="mensagem" 
                                        rows={5} 
                                        required 
                                        minLength={10}
                                        maxLength={5000}
                                        className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" 
                                        value={formData.mensagem} 
                                        onChange={handleInputChange}
                                        placeholder="Como podemos ajudar você?"
                                    ></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed" 
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? t('contato.form.loading') : t('contato.form.submit')}
                                    </button>
                                </div>
                                {status === 'success' && (
                                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-center">
                                        <p className="font-medium">{t('contato.form.success')}</p>
                                        <p className="text-sm mt-1">Entraremos em contato em breve!</p>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-center">
                                        <p className="font-medium">{errorMessage || t('contato.form.error')}</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        <div ref={infoRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                            <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-8">{t('contato.info.title')}</h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{t('contato.info.address.title')}</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary" dangerouslySetInnerHTML={{ __html: t('contato.info.address.value') }}></p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">call</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{t('contato.info.phone.title')}</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('contato.info.phone.value')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                     <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-icons-outlined text-primary">email</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{t('contato.info.email.title')}</h3>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('contato.info.email.value')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contato;