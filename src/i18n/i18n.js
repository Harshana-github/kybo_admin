import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enProduct from './locales/en/product.json';
import enOrder from './locales/en/order.json';
import enGeneral from './locales/en/general.json';

import jpProduct from './locales/jp/product.json';
import jpOrder from './locales/jp/order.json';
import jpGeneral from './locales/jp/general.json';

import siProduct from './locales/si/product.json';
import siOrder from './locales/si/order.json';
import siGeneral from './locales/si/general.json';

const resources = {
  en: {
    product: enProduct,
    order: enOrder,
    general: enGeneral
  },
  jp: {
    product: jpProduct,
    order: jpOrder,
    general: jpGeneral
  },
  si: {
    product: siProduct,
    order: siOrder,
    general: siGeneral
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['product', 'order', 'general'], // Define namespaces
    defaultNS: 'general',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
