import { create } from 'zustand';

type Position = { x: number; y: number };

type LogoStore = {
    position: Position;
    startPosition: Position;
    endPosition: Position;
    setStartPosition: (position: Position) => void;
    setEndPosition: (position: Position) => void;
};

const useLogoStore = create<LogoStore>(set => ({
    position: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
    endPosition: { x: 0, y: 0 },
    setStartPosition: (position: Position) =>
        set(() => ({ startPosition: position })),
    setEndPosition: (position: Position) =>
        set(() => ({ endPosition: position })),
}));
