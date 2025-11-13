import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    
    const slides = [
        {
            bgImage: "https://i.ibb.co/LzKGYzNG/now-smart-lock.jpg",
            title: t('hero.slide1.title'),
            subtitle: t('hero.slide1.subtitle')
        },
        {
            bgImage: "https://i.ibb.co/ZRmPXv0y/portaria-now.jpg",
            title: t('hero.slide2.title'),
            subtitle: t('hero.slide2.subtitle')
        },
        {
            bgImage: "https://i.ibb.co/zThc9bhk/app-now.jpg",
            title: t('hero.slide3.title'),
            subtitle: t('hero.slide3.subtitle')
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isScrolling = useRef(false);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
        resetTimer();
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            // Only act on vertical scroll to change horizontal slides
            if (Math.abs(e.deltaY) < 10) return;

            e.preventDefault();
            isScrolling.current = true;
            
            if (e.deltaY > 0) { // Scrolling down
                goToSlide((currentIndex + 1) % slides.length);
            } else { // Scrolling up
                goToSlide((currentIndex - 1 + slides.length) % slides.length);
            }
            
            setTimeout(() => {
                isScrolling.current = false;
            }, 800); // Cooldown period to prevent rapid slide changes
        };

        const element = sectionRef.current;
        if (element) {
            element.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };
    }, [currentIndex]);


    return (
        <section ref={sectionRef} className="h-screen min-h-[700px] relative overflow-hidden text-white text-center bg-background-dark">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.bgImage}')` }}
                />
            ))}

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center">
                 <div className="container mx-auto px-6 pt-20 flex-grow flex flex-col items-center justify-center">
                    <div className="w-full">
                        {slides.map((slide, index) => (
                            <div key={index} className={`transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'}`}>
                                 {index === currentIndex && (
                                    <>
                                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 animate-fade-in-down" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                                        <p className="max-w-2xl mx-auto text-lg text-gray-200 mb-8 animate-fade-in-up">{slide.subtitle}</p>
                                    </>
                                 )}
                            </div>
                        ))}
                    </div>
                     <a className="bg-primary text-white px-8 py-4 rounded-full font-medium transition-all mt-4 hover:brightness-95 transform hover:scale-105 active:scale-95" href="https://wa.me/551152835040" target="_blank" rel="noopener noreferrer">{t('hero.cta')}</a>
                 </div>
                 
                 {/* Navigation Dots */}
                <div className="w-full pb-10 flex justify-center space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;