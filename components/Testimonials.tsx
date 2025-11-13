import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { useLanguage } from '../contexts/LanguageContext';

interface TestimonialCardProps {
    quote: string;
    imgSrc: string;
    name: string;
    title: string;
    company: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, imgSrc, name, title, company }) => (
    <div className="flex flex-col h-full bg-white/5 p-8 rounded-lg">
        <p className="text-lg italic text-gray-300 mb-6 flex-grow">"{quote}"</p>
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
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

    const testimonialsData = [
        {
            quote: t('testimonials.t1.quote'),
            imgSrc: "https://i.ibb.co/VWnqw3rV/depo1.jpg",
            name: t('testimonials.t1.name'),
            title: t('testimonials.t1.title'),
            company: t('testimonials.t1.company')
        },
        {
            quote: t('testimonials.t2.quote'),
            imgSrc: "https://i.ibb.co/Zpf7QPdg/depo2.jpg",
            name: t('testimonials.t2.name'),
            title: t('testimonials.t2.title'),
            company: t('testimonials.t2.company')
        },
        {
            quote: t('testimonials.t3.quote'),
            imgSrc: "https://i.ibb.co/KpsVYw8X/depo3.jpg",
            name: t('testimonials.t3.name'),
            title: t('testimonials.t3.title'),
            company: t('testimonials.t3.company')
        }
    ];
    return (
        <section ref={sectionRef} className="bg-background-dark py-24 text-white">
            <div className="container mx-auto px-6 text-left">
                <h2 className={`text-4xl md:text-5xl font-bold mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t('testimonials.title')}</h2>
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-4 snap-x snap-mandatory">
                   {testimonialsData.map((testimonial, index) => (
                       <div 
                        key={index} 
                        className={`flex-none w-[90%] md:w-auto snap-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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