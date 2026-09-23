import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n';
import i18n, { detectInitialLang } from './i18n';

// Sync initial language from URL prefix (/ko|en|ja) or saved/detected value.
// LangLayout keeps this in sync on navigation.
try {
  const m = window.location.pathname.match(/^\/(ko|en|ja)(\/|$)/);
  const initial = m ? m[1] : detectInitialLang();
  if (i18n.language !== initial) void i18n.changeLanguage(initial);
  document.documentElement.lang = initial;
} catch {
  // ignore
}

// Register Service Worker for PWA (production only; dev has no bundle to serve)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('SW registered:', registration.scope);
      },
      (error) => {
        console.log('SW registration failed:', error);
      }
    );
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
