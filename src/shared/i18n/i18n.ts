import { LanguagesEnum } from '@shared/i18n/constants';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

const resources = {
    en,
    ru,
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: LanguagesEnum.EN, // default language to use.
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

export default i18n;
