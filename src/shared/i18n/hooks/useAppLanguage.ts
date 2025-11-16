import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useAppLanguage = () => {
    const { i18n } = useTranslation();
    return useMemo(() => {
        switch (i18n.language) {
            case 'en':
                return i18n.t('language.en');
            case 'ru':
                return i18n.t('language.ru');
            default:
                return null;
        }
    }, [i18n.language]);
};
