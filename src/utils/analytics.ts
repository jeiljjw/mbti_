type EventParams = Record<string, string | number | boolean | undefined>;

const GA_ID = (import.meta as unknown as { env?: Record<string, string> }).env
  ?.VITE_GA_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const initAnalytics = () => {
  if (!GA_ID || typeof document === 'undefined') return;
  if (document.querySelector(`script[data-ga="${GA_ID}"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.dataset.ga = GA_ID;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    (window.dataLayer as unknown[]).push(args);
  };
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
};

export const trackEvent = (name: string, params: EventParams = {}) => {
  try {
    window.gtag?.('event', name, params);
  } catch {
    // no-op: analytics must never break the app
  }
};

export const trackPageview = (path: string, lang?: string) => {
  trackEvent('page_view', { page_path: path, language: lang });
};
