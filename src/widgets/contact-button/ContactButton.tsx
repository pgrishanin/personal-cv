import { Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ContactButton: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Link>
            <Button borderRadius={10}>{t('widgets.contactButton.text')}</Button>
        </Link>
    );
};
