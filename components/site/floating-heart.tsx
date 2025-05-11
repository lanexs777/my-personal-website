'use client';

import { useEffect, useState } from 'react';

interface FloatingHeartProps {
    x: number;
    y: number;
    onComplete: () => void;
}

export function FloatingHeart({ x, y, onComplete }: FloatingHeartProps) {
    const [style, setStyle] = useState({
        position: 'fixed',
        left: `${x - 8}px`, // Center the heart (16px width)
        top: `${y - 8}px`, // Center the heart (16px height)
        transform: 'scale(1)',
        opacity: 1,
        pointerEvents: 'none',
        zIndex: 50,
    } as const);

    useEffect(() => {
        // Generate random curve direction (left or right)
        const curveDirection = Math.random() > 0.5 ? 1 : -1;
        const curveAmount = 40 + Math.random() * 20; // Random curve amount

        // Start animation after a delay
        const timeout = setTimeout(() => {
            setStyle(prev => ({
                ...prev,
                transform: `scale(1.2) translate(${curveDirection * curveAmount}px, -120px)`,
                opacity: 0,
                transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }));
        }, 100);

        const cleanup = setTimeout(() => {
            onComplete();
        }, 1600);

        return () => {
            clearTimeout(timeout);
            clearTimeout(cleanup);
        };
    }, [onComplete]);

    return (
        <div style={style}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: '#ff4444' }}
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>
    );
}