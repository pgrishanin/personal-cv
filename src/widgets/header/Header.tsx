import { Box, HStack, Image, Link } from '@chakra-ui/react';
import { LanguageSwitcher } from '@features/language-switcher';
import { TranslatedText } from '@shared/components';

export const AppHeader: React.FC = () => {
    return (
        <Box
            as="header"
            position="fixed"
            top={4}
            w="full"
            overflowY="hidden"
            color="gray.50"
            zIndex={1}>
            <Box
                h="3rem"
                mx="2rem"
                px={1.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <Link borderRadius={10} overflow="hidden" href="/">
                    <Image w={10} src="/star.svg"></Image>
                </Link>
                {/* Desktop Navigation */}
                <HStack
                    gap={4}
                    display={{ base: 'none', md: 'flex' }}
                    flex={1}
                    justifyContent="center">
                    <Link href="#home" color="gray.50">
                        <TranslatedText text="header.home"></TranslatedText>
                    </Link>
                    <Link href="#home" color="gray.50">
                        <TranslatedText text="header.experience"></TranslatedText>
                    </Link>
                    <Link href="#contacts" color="gray.50" boxShadow="none">
                        <TranslatedText text="header.contacts"></TranslatedText>
                    </Link>
                </HStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                    <LanguageSwitcher />
                </Box>
                {/* Mobile Navigation (e.g., a hamburger button) */}
                <Box display={{ base: 'flex', md: 'none' }}>
                    {/* <MobileNav /> */}
                </Box>
            </Box>
        </Box>
    );
};
