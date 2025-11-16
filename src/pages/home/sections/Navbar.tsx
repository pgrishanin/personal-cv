import {
    motion,
    useAnimation,
    useAnimationFrame,
    Variants,
} from 'motion/react';

import { Box } from '@chakra-ui/react';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';

const TRANSFORM_PERSPECTIVE = 1000;
const MAX_TRANSFORM_ANGLE = 10;

export const Navbar = () => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });

    const variants: Variants = {
        initial: {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: 'easeOut',
            },
            transformPerspective: TRANSFORM_PERSPECTIVE,
        },
        active: variantConfiguration => {
            return {
                transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                },
                rotateX: variantConfiguration.rotateX,
                rotateY: variantConfiguration.rotateY,
                scale: 0.95,
                transformPerspective: TRANSFORM_PERSPECTIVE,
            };
        },
    };

    useAnimationFrame(() => {});

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        event => {
            if (!navbarRef.current) {
                return;
            }

            const navbarRect = navbarRef.current.getBoundingClientRect(); // Get the size and position of the div
            const x = event.clientX - navbarRect.left;
            const y = event.clientY - navbarRect.top;

            setRotate({
                rotateX:
                    MAX_TRANSFORM_ANGLE * (1 - y / (navbarRect.height / 2)),
                rotateY:
                    -MAX_TRANSFORM_ANGLE * (1 - x / (navbarRect.width / 2)),
            });
            setTimeout(() => {
                controls.start('active');
            });

            setTimeout(() => {
                controls.start('initial');
            }, 500);
        },
        [navbarRef.current],
    );

    return (
        <Box
            asChild
            ref={navbarRef}
            position="fixed"
            w="calc(100vw - 32px)"
            top={4}
            left="16px"
            h={50}
            backgroundColor="gray.50"
            borderRadius={8}
            onClick={handleClick}>
            <motion.div
                layout={true}
                initial="initial"
                variants={variants}
                animate={controls}
                custom={rotate}></motion.div>
        </Box>
    );
};
