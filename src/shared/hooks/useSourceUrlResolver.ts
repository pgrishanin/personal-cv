import { useCallback } from 'react';

const basename = import.meta.env.VITE_BASENAME;

export const useSourceUrlResolver = () => {
    const resolveUrl = useCallback((url: string) => {
        return `${basename}${url}`;
    }, []);
    return {
        resolveUrl,
    };
};
