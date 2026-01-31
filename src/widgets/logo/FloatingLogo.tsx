import { Link } from '@chakra-ui/react';

export const FloatingLogo = () => {
    return (
        <Link
            borderRadius={10}
            href="/"
            backgroundColor="gray.50"
            h="2rem"
            w="2rem"
            pos="absolute"
            top="20px"
            left="20px"></Link>
    );
};
