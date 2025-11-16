import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { useProgress } from '@react-three/drei';
import { motion, Variants } from 'motion/react';
import { FC, PropsWithChildren } from 'react';

export const PageLoadingOverlay: FC<PropsWithChildren> = ({ children }) => {
    const { active, progress } = useProgress();
    const isLoading = active || progress !== 100;

    const overlayVariants: Variants = {
        show: {
            opacity: 1,
        },
        hide: {
            opacity: 0,
            display: 'none',
            transition: {
                duration: 0.5,
                display: { delay: 0.5 },
            },
        },
    };

    return (
        <>
            <Center
                asChild
                position="fixed"
                inset={0}
                backgroundColor="#000"
                zIndex={1000}>
                <motion.div
                    variants={overlayVariants}
                    animate={isLoading ? 'show' : 'hide'}>
                    <VStack>
                        <Spinner color="gray.50" />
                        <Text color="gray.50">Loading...</Text>
                    </VStack>
                </motion.div>
            </Center>
            {!isLoading && children}
        </>
    );
};
