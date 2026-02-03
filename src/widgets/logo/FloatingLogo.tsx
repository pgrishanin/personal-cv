import { Box } from '@chakra-ui/react';
import { useWindowDimensions } from '@shared/hooks';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'motion/react';

export const FloatingLogo = () => {
    const { height: windowHeight } = useWindowDimensions();
    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, {
        damping: 100,
        stiffness: 500,
    });
    const y = useTransform(smoothY, [0, 500], [0, windowHeight / 3]);
    const scrollVelocity = useVelocity(scrollY);

    const tailScale = useTransform(scrollVelocity, [-500, 500], [-1, 1]);
    const smoothTailScale = useSpring(tailScale, {
        damping: 50,
        stiffness: 400,
    });

    // TODO: replace hardcoded initial position values
    return (
        <Box
            asChild
            display="flex"
            alignItems="end"
            justifyContent="center"
            borderRadius={20}
            backgroundColor="gray.50"
            h="1.5rem"
            w="1.5rem"
            pos="fixed"
            top="28px"
            left="42px"
            zIndex={1000}>
            <motion.div style={{ y }}>
                {/* Tail box */}
                <Box
                    asChild
                    position="relative"
                    top="-50%"
                    w="full"
                    h="100px"
                    transformOrigin="bottom center"
                    background="linear-gradient(0deg,rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%)">
                    <motion.div
                        style={{
                            scaleY: smoothTailScale,
                        }}></motion.div>
                </Box>
            </motion.div>
        </Box>
    );
};
