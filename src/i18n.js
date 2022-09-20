import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    lng: document.querySelector("html").lang,

    resources: {
      en: {
        translation: {
          notifications: {
            header: "Notifications",
            clearNotifications: "Clear All",
            nonewnotifications: "No new notifications",
          },
        },
      },
      th: {
        translation: {
          notifications: {
            header: "การแจ้งเตือน",
            clearNotifications: "การแจ้งเตือนที่ชัดเจน",
            nonewnotifications: "ไม่มีการแจ้งเตือนใหม่",
          },
        },
      },
    },
  });

export default i18n;
