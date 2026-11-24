import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Inicialización del sistema de traducción
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // idioma predeterminado
    lng: 'es', // idioma inicial
    debug: true,
    interpolation: {
      escapeValue: false, // React ya se encarga del escape
    },
    backend: {
      loadPath: '/locales/{{lng}}/welcome.json', // ruta de tus archivos JSON de traducción
    },
    ns: ['welcome'], //El namespace debe coincidir con el usado en useTranslation("welcome")
    defaultNS: 'welcome',
  })
  .catch((err) => console.error('Error al inicializar i18next:', err));

export default i18n;