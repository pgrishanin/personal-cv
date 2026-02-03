import { Box, HStack, Link } from '@chakra-ui/react';
import { LanguageSwitcher } from '@features/language-switcher';
import { TranslatedText } from '@shared/components';
import { motion, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';

export const AppHeader: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollYProgress.on('change', () => {
            setIsScrolled(scrollYProgress.get() > 0);
        });
    }, [scrollYProgress]);

    return (
        <Box
            position="fixed"
            top={0}
            w="full"
            overflowY="hidden"
            color="gray.50"
            zIndex={100}>
            {/* Separate background colored box */}
            <Box
                asChild
                w="full"
                h="full"
                position="absolute"
                background="gray.950"
                maskImage="linear-gradient(0deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 30%)"
                zIndex={-1}>
                <motion.div
                    animate={{
                        opacity: isScrolled ? 0.9 : 0,
                        transition: { duration: 1.5 },
                    }}></motion.div>
            </Box>

            <Box
                h="5rem"
                mx="2rem"
                px={1.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <Link borderRadius={10} overflow="hidden" href="/">
                    <Box
                        borderRadius={20}
                        borderWidth={1}
                        borderColor="gray.50"
                        h="2rem"
                        w="2rem"></Box>
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
