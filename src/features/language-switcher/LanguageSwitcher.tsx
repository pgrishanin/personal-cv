import { SegmentGroup } from '@chakra-ui/react';
import { LanguagesEnum } from '@shared/i18n';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <SegmentGroup.Root
            value={i18n.language}
            onValueChange={e => i18n.changeLanguage(e.value ?? 'en')}
            background="transparent">
            <SegmentGroup.Indicator
                background="transparent"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.50"
            />
            {Object.values(LanguagesEnum).map(language => (
                <SegmentGroup.Item
                    background="transparent"
                    color="gray.50"
                    cursor="pointer"
                    key={language}
                    value={language}>
                    <SegmentGroup.ItemText>{language}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
            ))}
        </SegmentGroup.Root>
    );
};
