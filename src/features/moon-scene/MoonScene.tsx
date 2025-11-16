import { Stars, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'motion/react';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export const MoonScene = () => {
    const { camera } = useThree();
    const { scrollYProgress } = useScroll();

    useFrame(() => {
        const speedMultiplier = 3;
        const positionDelta = scrollYProgress.get() * speedMultiplier;
        camera.position.lerp(
            new Vector3(1 + positionDelta, 0, 1.8 - positionDelta),
            0.05,
        );
    });

    return (
        <>
            <Lights />
            <Stars
                radius={100}
                depth={20}
                count={3000}
                factor={4}
                saturation={10}
                speed={0}
                fade
            />

            <Moon />
        </>
    );
};

const Moon = ({ radius = 1.5, rotationSpeed = 0.02 }) => {
    const mesh = useRef<Mesh>(null);
    const colorMap = useTexture('/moonmap4k.jpg');
    const bumpMap = useTexture('/moonbump4k.jpg');
    const normalMap = useTexture('/normal.jpg');

    useFrame((_, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += rotationSpeed * delta;
        }
    });

    return (
        <mesh ref={mesh} castShadow receiveShadow>
            <sphereGeometry args={[radius, 1024, 1024]} />
            <meshStandardMaterial
                map={colorMap}
                roughness={1}
                metalness={0}
                bumpMap={bumpMap}
                bumpScale={0.24}
                normalMap={normalMap}
                normalScale={0.2}
            />
        </mesh>
    );
};

const Lights = () => {
    return (
        <directionalLight
            position={[2, 2.5, -2.5]}
            intensity={4.2}
            target-position={[0, 0, 0]}
            castShadow
        />
    );
};
