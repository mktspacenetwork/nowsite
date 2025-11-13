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
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<SubmissionStatus>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/mblqlygv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
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
                                    <label htmlFor="name" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.name')}</label>
                                    <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.email')}</label>
                                    <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.subject')}</label>
                                    <input type="text" name="subject" id="subject" required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.subject} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-2">{t('contato.form.message')}</label>
                                    <textarea name="message" id="message" rows={5} required className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.message} onChange={handleInputChange}></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary text-white px-8 py-3 rounded-full text-base font-medium transition-all active:scale-95 hover:brightness-95 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed" disabled={status === 'loading'}>
                                        {status === 'loading' ? t('contato.form.loading') : t('contato.form.submit')}
                                    </button>
                                </div>
                                {status === 'success' && (
                                    <p className="text-green-600 dark:text-green-500 font-medium text-center">{t('contato.form.success')}</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-600 dark:text-red-500 font-medium text-center">{t('contato.form.error')}</p>
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