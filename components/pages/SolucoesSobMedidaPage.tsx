import React, { useRef, useState } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
import { useLanguage } from '../../contexts/LanguageContext';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const SolucoesSobMedidaPage: React.FC = () => {
    const { t } = useLanguage();
    const introRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(introRef, { threshold: 0.1 });

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
    });
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

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
            setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setStatus('success');
                setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Erro ao enviar mensagem.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Erro de conexão. Tente novamente.');
        }
    };

    return (
        <>
            <section className="relative h-[60vh] min-h-[450px] bg-cover bg-center text-white flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(18,23,32,0.7), rgba(18,23,32,0.7)), url('https://i.ibb.co/Qv4BxXn0/freepik-crie-a-imagem-dos-dois-homens-que-esto-na-img2eles-86013.jpg')" }}>
                <div className="container mx-auto px-6 animate-fade-in-down">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{t('solucoesSobMedidaPage.hero.title')}</h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{t('solucoesSobMedidaPage.hero.subtitle')}</p>
                </div>
            </section>

            <section ref={introRef} className="py-24 bg-background-light dark:bg-background-dark">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">{t('solucoesSobMedidaPage.intro.title')}</h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">{t('solucoesSobMedidaPage.intro.description')}</p>
                    </div>
                    <div className={`bg-white dark:bg-surface-dark p-8 rounded-lg shadow-xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h3 className="text-2xl font-bold mb-2">{t('solucoesSobMedidaPage.form.title')}</h3>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 text-sm">{t('solucoesSobMedidaPage.form.subtitle')}</p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input type="text" name="nome" required minLength={3} maxLength={100} className="w-full px-4 py-3 bg-surface-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.nome} onChange={handleInputChange} placeholder={t('contato.form.name')} />
                            <input type="email" name="email" required maxLength={254} className="w-full px-4 py-3 bg-surface-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.email} onChange={handleInputChange} placeholder={t('contato.form.email')} />
                            <input type="tel" name="telefone" required className="w-full px-4 py-3 bg-surface-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.telefone} onChange={handleInputChange} placeholder="Telefone" maxLength={15} />
                            <textarea name="mensagem" rows={4} required minLength={10} maxLength={5000} className="w-full px-4 py-3 bg-surface-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary transition" value={formData.mensagem} onChange={handleInputChange} placeholder="Descreva sua necessidade..."></textarea>
                            <button type="submit" className="w-full bg-primary text-white px-8 py-3 rounded-full font-medium transition-all active:scale-95 hover:brightness-95 disabled:opacity-75" disabled={status === 'loading'}>
                                {status === 'loading' ? t('contato.form.loading') : t('contato.form.submit')}
                            </button>
                            {status === 'success' && <div className="text-green-700 dark:text-green-400 text-center text-sm">{t('contato.form.success')}</div>}
                            {status === 'error' && <div className="text-red-700 dark:text-red-400 text-center text-sm">{errorMessage}</div>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SolucoesSobMedidaPage;