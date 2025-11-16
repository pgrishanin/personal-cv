import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@shared/components/chakra';
import { ChakraStyleProps } from '@shared/types';

export const AppFooter: React.FC = () => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.900');

    return (
        <Box
            as="footer"
            bg={bg}
            borderTopColor={borderColor}
            {...styles.container}></Box>
    );
};

const styles: ChakraStyleProps = {
    container: {
        w: 'full',
        h: 20,
        borderTopWidth: 2,
        overflowY: 'hidden',
    },
};
