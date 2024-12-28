import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          English: "English",
          Russian: "Russian",
          Navbar: {
            Books: "Books",
            Authors: "Authors",
            MyCollection: "My Collection",
            AddBook: "Add Book",
            AddAuthor: "Add Author",
            Register: "Register",
            Login: "Login"
          },
          Books: {
            AddToCollection: "To Collection"
          }
        },
      },
      ru: {
        translation: {
          English: "Английский",
          Russian: "Русский",
          Navbar: {
            Books: "Книги",
            Authors: "Авторы",
            MyCollection: "Моя коллекция",
            AddBook: "Добавить книгу",
            AddAuthor: "Добавить автора",
            Register: "Регистрация",
            Login: "Логин"
          },
          Books: {
            AddToCollection: "В коллекцию"
          }
        },
      },
    },
  });

export default i18n;
