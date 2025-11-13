import React from 'react';
import Hero from '../Hero';
import Impact from '../Impact';
import Solutions from '../Solutions';
import About from '../About';
import CTA from '../CTA';
import Testimonials from '../Testimonials';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Impact />
      <Solutions />
      <About />
      <CTA />
      <Testimonials />
    </>
  );
};

export default HomePage;
