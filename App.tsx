
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Solutions from './components/Solutions';
import About from './components/About';
import CTA from './components/CTA';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  return (
    <div className="font-display text-text-light-primary dark:text-text-dark-primary">
      <Header />
      <main>
        <Hero />
        <Impact />
        <Solutions />
        <About />
        <CTA />
        <Testimonials />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
