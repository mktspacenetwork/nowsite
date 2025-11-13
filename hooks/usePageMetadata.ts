import { useEffect } from 'react';
import { Page } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

const usePageMetadata = (page: Page) => {
    const { t } = useLanguage();

    useEffect(() => {
        const toCamelCase = (str: string) => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
        const pageKey = toCamelCase(page);

        document.title = t(`metadata.${pageKey}.title`);

        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', t(`metadata.${pageKey}.description`));
        }

        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            keywordsTag.setAttribute('content', t(`metadata.${pageKey}.keywords`));
        }

    }, [page, t]);
};

export default usePageMetadata;
