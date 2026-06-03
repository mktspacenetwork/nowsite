import { useEffect } from 'react';
import { Page } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

const SITE_URL = 'https://nowsolucoes.com.br';
const OG_IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;

const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
};

const usePageMetadata = (page: Page) => {
    const { t } = useLanguage();

    useEffect(() => {
        const toCamelCase = (str: string) => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
        const pageKey = toCamelCase(page);

        const title = t(`metadata.${pageKey}.title`);
        const description = t(`metadata.${pageKey}.description`);
        const keywords = t(`metadata.${pageKey}.keywords`);
        const url = page === 'home' ? SITE_URL : `${SITE_URL}/${page}`;

        // Basic SEO
        document.title = title;
        setMeta('meta[name="description"]', 'content', description);
        setMeta('meta[name="keywords"]', 'content', keywords);

        // Open Graph
        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[property="og:url"]', 'content', url);

        // Twitter Card
        setMeta('meta[name="twitter:title"]', 'content', title);
        setMeta('meta[name="twitter:description"]', 'content', description);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);

    }, [page, t]);
};

export default usePageMetadata;
