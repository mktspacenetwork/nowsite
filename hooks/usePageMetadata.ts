import { useEffect } from 'react';
import { Page } from '../App';

const metadata: Record<Page, { title: string; description: string; keywords: string }> = {
    home: {
        title: 'Now Soluções - Tecnologia para Condomínios Inteligentes',
        description: 'Now Soluções: Especialistas em tecnologia para condomínios inteligentes. Oferecemos controle de acesso, monitoramento com IA, armários inteligentes e mais.',
        keywords: 'condomínio inteligente, segurança condominial, controle de acesso, portaria remota, now soluções',
    },
    'quem-somos': {
        title: 'Sobre Nós | Now Soluções',
        description: 'Conheça a história e os valores da Now Soluções, a empresa que está revolucionando a gestão de condomínios com tecnologia de ponta e foco no cliente.',
        keywords: 'sobre now soluções, história, valores, equipe, gestão condominial',
    },
    contato: {
        title: 'Contato | Now Soluções',
        description: 'Entre em contato com a Now Soluções. Tire suas dúvidas, solicite um orçamento ou fale com nossa equipe de especialistas em segurança e tecnologia para condomínios.',
        keywords: 'contato now soluções, telefone, email, endereço, orçamento condomínio',
    },
    solucoes: {
        title: 'Nossas Soluções | Now Soluções',
        description: 'Descubra as soluções da Now para áreas de acesso, áreas externas, internas, facilities e projetos sob medida para o seu condomínio.',
        keywords: 'soluções condominiais, área de acesso, monitoramento ia, facilities, projetos personalizados',
    }
};

const usePageMetadata = (page: Page) => {
    useEffect(() => {
        const pageMeta = metadata[page] || metadata.home;

        document.title = pageMeta.title;

        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', pageMeta.description);
        }

        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            keywordsTag.setAttribute('content', pageMeta.keywords);
        }

    }, [page]);
};

export default usePageMetadata;
