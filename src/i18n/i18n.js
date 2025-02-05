import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enProduct from './locales/en/product.json';
import enOrder from './locales/en/order.json';
import enGeneral from './locales/en/general.json';
import enSideBar from './locales/en/side_bar.json';
import enNavBar from './locales/en/nav_bar.json';
import enLogin from './locales/en/login.json';

import jpProduct from './locales/jp/product.json';
import jpOrder from './locales/jp/order.json';
import jpGeneral from './locales/jp/general.json';
import jpSideBar from './locales/jp/side_bar.json';
import jpNavBar from './locales/jp/nav_bar.json';
import jpLogin from './locales/jp/login.json';

import siProduct from './locales/si/product.json';
import siOrder from './locales/si/order.json';
import siGeneral from './locales/si/general.json';
import siSideBar from './locales/si/side_bar.json';
import siNavBar from './locales/si/nav_bar.json';
import siLogin from './locales/si/login.json';

const resources = {
  en: {
    product: enProduct,
    order: enOrder,
    general: enGeneral,
    side_bar: enSideBar,
    nav_bar: enNavBar,
    login: enLogin
  },
  jp: {
    product: jpProduct,
    order: jpOrder,
    general: jpGeneral,
    side_bar: jpSideBar,
    nav_bar: jpNavBar,
    login: jpLogin
  },
  si: {
    product: siProduct,
    order: siOrder,
    general: siGeneral,
    side_bar: siSideBar,
    nav_bar: siNavBar,
    login: siLogin
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
