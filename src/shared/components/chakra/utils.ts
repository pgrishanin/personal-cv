import { chakra, defaultSystem, type HTMLChakraProps } from '@chakra-ui/react';
import { isValidMotionProp, motion, type HTMLMotionProps } from 'framer-motion';
import type { ElementType } from 'react';

const { isValidProperty } = defaultSystem;

/**
 * shouldForwardProp для v3:
 *  - пропускаем все framer-motion пропсы
 *  - пропускаем валидные DOM-атрибуты
 *  - НЕ пропускаем chakra-стайл/вариант пропсы в DOM (их съест Chakra)
 */
const forwardMotionProp = (prop: string, variantKeys: string[] = []) =>
    isValidMotionProp(prop) ||
    (!variantKeys.includes(prop) && !isValidProperty(prop));

/** Фабрика motion+chakra */
export function chakraMotion<T extends ElementType>(el: T) {
    return chakra(
        motion(el as any),
        {},
        { shouldForwardProp: forwardMotionProp },
    ) as React.FC<HTMLChakraProps<T> & HTMLMotionProps<T>>;
}
