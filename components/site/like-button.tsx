'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
    slug: string;
    initialLikes: number;
}

interface Triangle {
    id: number;
    angle: number;
    size: 'small' | 'large';
    color: string;
}

interface CountIndicator {
    id: number;
    count: number;
}

const COLORS = ['#FF5722', '#FFC107', '#2196F3', '#4CAF50', '#9C27B0'];

const TRIANGLE_ANGLES = [
    // Large triangles
    0, 72, 144, 216, 288,
    // Small triangles
    36, 108, 180, 252, 324
];

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLoading, setIsLoading] = useState(false);
    const [triangles, setTriangles] = useState<Triangle[]>([]);
    const [nextTriangleId, setNextTriangleId] = useState(0);
    const [countIndicators, setCountIndicators] = useState<CountIndicator[]>([]);
    const [nextCountId, setNextCountId] = useState(0);

    useEffect(() => {
        const channel = supabase
            .channel('likes')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'likes',
                filter: `note_slug=eq.${slug}`,
            }, () => {
                setLikes((prev) => prev + 1);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [slug]);

    const createTriangles = () => {
        const newTriangles: Triangle[] = TRIANGLE_ANGLES.map((angle, i) => ({
            id: nextTriangleId + i,
            angle,
            size: i < 5 ? 'large' : 'small',
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));
        
        setTriangles(prev => [...prev, ...newTriangles]);
        setNextTriangleId(prev => prev + newTriangles.length);
        
        setTimeout(() => {
            setTriangles(prev => prev.filter(t => !newTriangles.includes(t)));
        }, 1000);
    };

    const createCountIndicator = () => {
        const newIndicator = { id: nextCountId, count: 1 };
        setCountIndicators(prev => [...prev, newIndicator]);
        setNextCountId(prev => prev + 1);
        
        // Remove the count indicator after a longer delay
        setTimeout(() => {
            setCountIndicators(prev => prev.filter(c => c.id !== newIndicator.id));
        }, 2000);
    };

    const handleLike = async (event: React.MouseEvent) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            createTriangles();
            createCountIndicator();
            
            const { error } = await supabase
                .from('likes')
                .insert({ note_slug: slug });

            if (error) throw error;
        } catch (error) {
            console.error('Error liking note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "flex items-center gap-2 relative",
                    isLoading && "cursor-not-allowed"
                )}
                onClick={handleLike}
                disabled={isLoading}
            >
                <Heart className="h-4 w-4" />
                <span>{likes}</span>
            </Button>
            
            {triangles.map((triangle) => (
                <div
                    key={triangle.id}
                    className="absolute left-1/2 top-1/2 pointer-events-none"
                    style={{
                        width: triangle.size === 'large' ? '8px' : '6px',
                        height: triangle.size === 'large' ? '8px' : '6px',
                        backgroundColor: triangle.color,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        transform: `translate(-50%, -50%) rotate(${triangle.angle}deg) translateY(-20px)`,
                        animation: 'triangleFade 1s forwards',
                        '--angle': `${triangle.angle}deg`,
                    } as any}
                />
            ))}
            
            {countIndicators.map((indicator) => (
                <div
                    key={indicator.id}
                    className="absolute left-1/2 -top-2 bg-black text-white rounded-full px-2 py-1 text-xs pointer-events-none"
                    style={{
                        animation: 'countFloat 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                    }}
                >
                    +{indicator.count}
                </div>
            ))}
        </div>
    );
}