import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import { motion, stagger, useAnimate, useInView } from 'motion/react';
import { useEffect } from 'react';

export const TypewriterEffect = ({
    words,
    textProps,
    cursorProps,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    textProps?: TextProps;
    cursorProps?: BoxProps;
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map(word => {
        return {
            ...word,
            text: word.text.split(''),
        };
    });

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                animate(
                    'span',
                    {
                        display: 'inline-block',
                        opacity: 1,
                        width: 'fit-content',
                        visibility: 'visible',
                    },
                    {
                        duration: 0,
                        delay: stagger(0.3),
                        ease: 'easeInOut',
                    },
                );
            }, 3000);
        }
    }, [isInView]);

    const renderWords = () => {
        return (
            <Box asChild display="inline-flex">
                <motion.div ref={scope}>
                    {wordsArray.map((word, idx) => {
                        return (
                            <Box key={`word-${idx}`} display="inline-block">
                                {word.text.map((char, index) => (
                                    <Text
                                        asChild
                                        color="gray.50"
                                        opacity={0}
                                        visibility={'hidden'}
                                        display={'none'}
                                        key={`char-${index}`}
                                        {...textProps}>
                                        <motion.span initial={{}}>
                                            {char}
                                        </motion.span>
                                    </Text>
                                ))}

                                <Text
                                    asChild
                                    opacity={0}
                                    visibility={'hidden'}
                                    display={'none'}
                                    wordSpacing="1rem">
                                    <motion.span initial={{}}>
                                        {'\u00A0'}
                                    </motion.span>
                                </Text>
                            </Box>
                        );
                    })}
                </motion.div>
            </Box>
        );
    };
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            fontWeight="bold"
            textAlign="center">
            {renderWords()}
            <Text
                asChild
                display={'inline-block'}
                w="10px"
                h={4}
                bg="gray.50"
                {...cursorProps}>
                <motion.span
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}></motion.span>
            </Text>
        </Box>
    );
};
