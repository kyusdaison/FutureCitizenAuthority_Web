import { useEffect } from 'react';
import { buildRouteJsonLd, getSeoForView, siteName } from '../lib/seo';

type SeoMetaProps = {
  currentView: string;
};

const getHeadElement = <T extends HTMLElement>(selector: string, createElement: () => T): T => {
  const existing = document.head.querySelector<T>(selector);
  if (existing) return existing;

  const element = createElement();
  document.head.appendChild(element);
  return element;
};

const setMetaByName = (name: string, content: string) => {
  const meta = getHeadElement(`meta[name="${name}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute('name', name);
    return element;
  });
  meta.setAttribute('content', content);
};

const setMetaByProperty = (property: string, content: string) => {
  const meta = getHeadElement(`meta[property="${property}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute('property', property);
    return element;
  });
  meta.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  const link = getHeadElement('link[rel="canonical"]', () => {
    const element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    return element;
  });
  link.setAttribute('href', href);
};

const setJsonLd = (currentView: string) => {
  const script = getHeadElement('script[data-route-json-ld="true"]', () => {
    const element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.routeJsonLd = 'true';
    return element;
  });
  script.textContent = JSON.stringify(buildRouteJsonLd(currentView));
};

export const SeoMeta = ({ currentView }: SeoMetaProps) => {
  useEffect(() => {
    const seo = getSeoForView(currentView);

    document.title = seo.title;
    setMetaByName('description', seo.description);
    setMetaByName('keywords', seo.keywords);
    setMetaByName('robots', seo.robots);
    setMetaByName('theme-color', '#0b1220');
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:image', seo.image);
    setMetaByProperty('og:url', seo.canonicalUrl);
    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:site_name', siteName);
    setMetaByProperty('og:locale', 'en_US');
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', seo.image);
    setMetaByName('twitter:url', seo.canonicalUrl);
    setMetaByName('twitter:site', '@futurecitizen');
    setCanonical(seo.canonicalUrl);
    setJsonLd(currentView);
  }, [currentView]);

  return null;
};
