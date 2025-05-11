'use client';

import { Heart } from 'lucide-react';
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
        color: 'red',
        transition: 'all 0.5s ease-out',
        pointerEvents: 'none',
        zIndex: 50,
    } as const);

    useEffect(() => {
        // Start animation after a small delay
        const timeout = setTimeout(() => {
            setStyle(prev => ({
                ...prev,
                transform: 'scale(1.5) translateY(-100px)',
                opacity: 0,
            }));
        }, 50);

        // Remove component after animation
        const cleanup = setTimeout(() => {
            onComplete();
        }, 550);

        return () => {
            clearTimeout(timeout);
            clearTimeout(cleanup);
        };
    }, [onComplete]);

    return <Heart style={style} className="h-4 w-4" />;
}