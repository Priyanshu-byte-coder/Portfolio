import { useEffect } from 'react';

const SITE = 'https://priyanshudoshi.netlify.app';
const DEFAULT_TITLE = 'Priyanshu Doshi — AI & Machine Learning Engineer';
const DEFAULT_DESC =
  'Priyanshu Doshi is an AI/ML Engineer and IEEE-published researcher building industrial computer vision, edge AI, voice agents, and open-source developer tools. Creator of contextrot and founder of devtrack.';

interface SeoOptions {
  title?: string;
  description?: string;
  /** path beginning with "/" — becomes the canonical + og:url */
  path?: string;
  /** optional JSON-LD object(s) injected for this route, replacing the last route-level graph */
  jsonLd?: object | object[];
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

const ROUTE_LD_ID = 'route-jsonld';

/**
 * Client-side SEO for SPA routes. Updates title, description, canonical, and
 * Open Graph / Twitter tags on navigation, and can inject route-scoped JSON-LD.
 * The static index.html head remains the crawl baseline; this keeps the tags
 * correct for JS-capable crawlers and social scrapers that render the SPA.
 */
export function useSeo({ title, description, path, jsonLd }: SeoOptions) {
  const fullTitle = title ?? DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESC;
  const url = SITE + (path ?? '/');

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', desc);
    setCanonical(url);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);

    let ld: HTMLScriptElement | null = null;
    if (jsonLd) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = ROUTE_LD_ID;
      ld.text = JSON.stringify(jsonLd);
      document.head.appendChild(ld);
    }

    return () => {
      if (ld && ld.parentNode) ld.parentNode.removeChild(ld);
    };
  }, [fullTitle, desc, url, jsonLd]);
}

export { SITE };
