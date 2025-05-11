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
        left: `${x}px`,
        top: `${y}px`,
        transform: 'scale(1)',
        opacity: 1,
        pointerEvents: 'none',
        zIndex: 50,
    } as const);

    useEffect(() => {
        // Generate random curve direction (left or right)
        const curveDirection = Math.random() > 0.5 ? 1 : -1;
        const curveAmount = 50 + Math.random() * 30; // Random curve amount between 50-80px

        // Start animation after a small delay
        const timeout = setTimeout(() => {
            setStyle(prev => ({
                ...prev,
                transform: `scale(1.5) translate(${curveDirection * curveAmount}px, -100px)`,
                opacity: 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }));
        }, 50);

        // Remove component after animation
        const cleanup = setTimeout(() => {
            onComplete();
        }, 850);

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