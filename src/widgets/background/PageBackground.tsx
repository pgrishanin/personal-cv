import { Box } from '@chakra-ui/react';
import { MoonScene } from '@features/moon-scene';
import { Canvas } from '@react-three/fiber';

export const PageBackground = () => {
    return (
        <Box
            as="figure"
            pos="fixed"
            inset={0}
            w="vw"
            h="vh"
            bg="#000"
            zIndex={-1}>
            <Canvas
                shadows
                camera={{
                    position: [1, 0, 1.8],
                    fov: 50,
                    rotation: [0.4, -0.4, 0],
                }}>
                <MoonScene />
            </Canvas>
        </Box>
    );
};
