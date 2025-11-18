import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import HomePage from './components/pages/HomePage';
import QuemSomos from './components/pages/QuemSomos';
import Contato from './components/pages/Contato';
import SolucoesPage from './components/pages/SolucoesPage';
import usePageMetadata from './hooks/usePageMetadata';
import WhatsAppButton from './components/WhatsAppButton';
import AreaAcessoPage from './components/pages/AreaAcessoPage';
import AreaExternaPage from './components/pages/AreaExternaPage';
import AreaInternaPage from './components/pages/AreaInternaPage';
import FacilitiesPage from './components/pages/FacilitiesPage';
import SolucoesSobMedidaPage from './components/pages/SolucoesSobMedidaPage';
import CondominioInteligentePage from './components/pages/CondominioInteligentePage';

export type Page = 'home' | 'quem-somos' | 'contato' | 'solucoes' | 'area-acesso' | 'area-externa' | 'area-interna' | 'facilities' | 'solucoes-sob-medida' | 'condominio-inteligente';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  usePageMetadata(currentPage);

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
      case 'area-acesso':
        return <AreaAcessoPage />;
      case 'area-externa':
        return <AreaExternaPage />;
      case 'area-interna':
        return <AreaInternaPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'solucoes-sob-medida':
        return <SolucoesSobMedidaPage />;
      case 'condominio-inteligente':
        return <CondominioInteligentePage setCurrentPage={setCurrentPage} />;
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
      <Footer setCurrentPage={setCurrentPage}/>
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;