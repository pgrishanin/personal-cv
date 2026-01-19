import { Text } from '@chakra-ui/react';
import { motion, useInView } from 'motion/react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

('use client');

type EncryptedTextProps = {
    text: string;
    className?: string;
    revealDelayMs?: number;
    flipDelayMs?: number;
    encryptedClassName?: string;
    revealedClassName?: string;
};

const CHARSET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?';

function generateRandomCharacter(): string {
    const index = Math.floor(Math.random() * CHARSET.length);
    return CHARSET.charAt(index);
}

function generateGibberishPreservingSpaces(original: string): string {
    if (!original) return '';
    let result = '';
    for (let i = 0; i < original.length; i += 1) {
        const ch = original[i];
        result += ch === ' ' ? ' ' : generateRandomCharacter();
    }
    return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
    text,
    revealDelayMs = 50,
    flipDelayMs = 50,
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    const [revealCount, setRevealCount] = useState<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const lastFlipTimeRef = useRef<number>(0);
    const scrambleCharsRef = useRef<string[]>(
        text ? generateGibberishPreservingSpaces(text).split('') : [],
    );

    useEffect(() => {
        if (!isInView) return;

        // Reset state for a fresh animation whenever dependencies change
        const initial = text ? generateGibberishPreservingSpaces(text) : '';
        scrambleCharsRef.current = initial.split('');
        startTimeRef.current = performance.now();
        lastFlipTimeRef.current = startTimeRef.current;
        setRevealCount(0);

        let isCancelled = false;

        const update = (now: number) => {
            if (isCancelled) return;

            const elapsedMs = now - startTimeRef.current;
            const totalLength = text.length;
            const currentRevealCount = Math.min(
                totalLength,
                Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
            );

            setRevealCount(currentRevealCount);

            if (currentRevealCount >= totalLength) {
                return;
            }

            // Re-randomize unrevealed scramble characters on an interval
            const timeSinceLastFlip = now - lastFlipTimeRef.current;
            if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
                for (let index = 0; index < totalLength; index += 1) {
                    if (index >= currentRevealCount) {
                        if (text[index] !== ' ') {
                            scrambleCharsRef.current[index] =
                                generateRandomCharacter();
                        } else {
                            scrambleCharsRef.current[index] = ' ';
                        }
                    }
                }
                lastFlipTimeRef.current = now;
            }

            animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);

        return () => {
            isCancelled = true;
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isInView, text, revealDelayMs, flipDelayMs]);

    if (!text) return null;

    return (
        <motion.span ref={ref} aria-label={text} role="text">
            {text.split('').map((char, index) => {
                const isRevealed = index < revealCount;
                const displayChar = isRevealed
                    ? char
                    : char === ' '
                      ? ' '
                      : (scrambleCharsRef.current[index] ??
                        generateRandomCharacter());

                return <span key={index}>{displayChar}</span>;
            })}
        </motion.span>
    );
};

export const TranslatedText: FC<{ text: string }> = ({ text }) => {
    const runsCounterRef = useRef(0);
    const { t } = useTranslation();

    console.log(runsCounterRef.current);

    // Skip initial text animation (in dev mode should skip twice)
    if (!runsCounterRef.current) {
        runsCounterRef.current++;
        return <Text>{t(text)}</Text>;
    }
    runsCounterRef.current++;

    return <EncryptedText text={t(text)}></EncryptedText>;
};
