/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState<boolean>(mediaMatch.matches);

    useEffect(() => {
        const handler = (e: any) => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });
    return matches;
};
