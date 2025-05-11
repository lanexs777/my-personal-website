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
    distance: number;
    color: string;
}

interface CountIndicator {
    id: number;
    count: number;
}

const COLORS = ['#FFC107', '#FF5722', '#2196F3', '#4CAF50', '#9C27B0'];

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
        const newTriangles: Triangle[] = [];
        const numTriangles = 8;
        
        for (let i = 0; i < numTriangles; i++) {
            const angle = (i * 360) / numTriangles + Math.random() * 30 - 15;
            newTriangles.push({
                id: nextTriangleId + i,
                angle,
                distance: 0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
        }
        
        setTriangles(prev => [...prev, ...newTriangles]);
        setNextTriangleId(prev => prev + numTriangles);
        
        setTimeout(() => {
            setTriangles(prev => prev.filter(t => !newTriangles.includes(t)));
        }, 1000);
    };

    const createCountIndicator = () => {
        setCountIndicators(prev => [...prev, { id: nextCountId, count: 1 }]);
        setNextCountId(prev => prev + 1);
        
        setTimeout(() => {
            setCountIndicators(prev => prev.filter(c => c.id !== nextCountId));
        }, 1000);
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
                    className="absolute left-1/2 top-1/2 w-2 h-2 pointer-events-none"
                    style={{
                        transform: `rotate(${triangle.angle}deg) translateY(${triangle.distance}px)`,
                        transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: triangle.color,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        animation: 'triangleFade 1s forwards',
                    }}
                />
            ))}
            
            {countIndicators.map((indicator) => (
                <div
                    key={indicator.id}
                    className="absolute left-1/2 top-0 -translate-x-1/2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs pointer-events-none"
                    style={{
                        animation: 'countFloat 1s forwards',
                    }}
                >
                    +{indicator.count}
                </div>
            ))}
        </div>
    );
}