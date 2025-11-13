import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import HomePage from './components/pages/HomePage';
import QuemSomos from './components/pages/QuemSomos';
import Contato from './components/pages/Contato';
import SolucoesPage from './components/pages/SolucoesPage';

export type Page = 'home' | 'quem-somos' | 'contato' | 'solucoes';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'quem-somos':
        return <QuemSomos />;
      case 'contato':
        return <Contato />;
      case 'solucoes':
        return <SolucoesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-display text-text-light-primary dark:text-text-dark-primary">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;