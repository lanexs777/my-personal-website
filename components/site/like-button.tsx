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

const COLORS = ['#FF5722', '#FFC107', '#2196F3', '#4CAF50', '#9C27B0'];

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLoading, setIsLoading] = useState(false);
    const [triangles, setTriangles] = useState<Triangle[]>([]);
    const [nextTriangleId, setNextTriangleId] = useState(0);
    const [showCount, setShowCount] = useState(false);
    const [countValue, setCountValue] = useState(1);

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
        // Create 5 large triangles
        for (let i = 0; i < 5; i++) {
            newTriangles.push({
                id: nextTriangleId + i,
                angle: (i * 72) + Math.random() * 10 - 5, // Add slight randomness
                size: 'large',
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
        }
        // Create 5 small triangles
        for (let i = 0; i < 5; i++) {
            newTriangles.push({
                id: nextTriangleId + i + 5,
                angle: (i * 72 + 36) + Math.random() * 10 - 5, // Offset by 36 degrees
                size: 'small',
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
        }
        
        setTriangles(prev => [...prev, ...newTriangles]);
        setNextTriangleId(prev => prev + newTriangles.length);
        
        setTimeout(() => {
            setTriangles(prev => prev.filter(t => !newTriangles.includes(t)));
        }, 600);
    };

    const showCountIndicator = () => {
        setShowCount(true);
        setCountValue(prev => prev + 1);
        
        // Reset after animation
        setTimeout(() => {
            setShowCount(false);
            setCountValue(1);
        }, 1000);
    };

    const handleLike = async (event: React.MouseEvent) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            createTriangles();
            showCountIndicator();
            
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
                        width: triangle.size === 'large' ? '12px' : '8px',
                        height: triangle.size === 'large' ? '12px' : '8px',
                        backgroundColor: triangle.color,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        transform: `translate(-50%, -50%) rotate(${triangle.angle}deg)`,
                        animation: 'trianglePop 600ms forwards',
                        opacity: 0,
                    }}
                />
            ))}
            
            {showCount && (
                <div
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full 
                             bg-black text-white rounded-full px-2 py-1 text-xs pointer-events-none"
                    style={{
                        animation: 'countBounce 1000ms forwards',
                    }}
                >
                    +{countValue}
                </div>
            )}
        </div>
    );
}