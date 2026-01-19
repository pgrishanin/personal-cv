import { Box } from '@chakra-ui/react';
import { TypewriterEffect } from '@shared/components';
import { PageBackground } from '@widgets/background';
import { AppHeader } from '@widgets/header';
import { PageLoadingOverlay } from '@widgets/page-loader';
import { cancelFrame, frame } from 'framer-motion';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { memo, useEffect, useRef } from 'react';

export const HomePage = memo(() => {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        const update = (data: { timestamp: number }) => {
            const time = data.timestamp;
            lenisRef.current?.lenis?.raf(time);
        };

        frame.update(update, true);

        return () => cancelFrame(update);
    }, []);

    return (
        <>
            <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

            <PageBackground />
            <PageLoadingOverlay>
                <AppHeader />

                <Box w="full" minH="100vh" position="relative">
                    <Box
                        position="absolute"
                        inset={0}
                        display={'flex'}
                        h="100vh"
                        justifyContent={'center'}>
                        <TypewriterEffect
                            text="Nothing is impossible"
                            textProps={{
                                fontSize: '3rem',
                                wordSpacing: '1.5rem',
                            }}
                            cursorProps={{
                                width: '2rem',
                                height: '3rem',
                            }}></TypewriterEffect>
                    </Box>

                    <Box h="100vh"></Box>
                    <Box h="100vh"></Box>
                    <Box h="100vh"></Box>
                    <Box h="100vh"></Box>

                    {/* </Box> */}
                </Box>
            </PageLoadingOverlay>
        </>
    );
});
