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

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLoading, setIsLoading] = useState(false);
    const [showCount, setShowCount] = useState(false);
    const [countValue, setCountValue] = useState(2);
    const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout | null>(null);

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

    const showCountIndicator = () => {
        // Clear existing timeout if it exists
        if (animationTimeout) {
            clearTimeout(animationTimeout);
        }

        setShowCount(true);
        setCountValue(prev => prev + 1);
        
        // Set new timeout
        const timeout = setTimeout(() => {
            setShowCount(false);
        }, 2000);
        
        setAnimationTimeout(timeout);
    };

    const handleLike = async (event: React.MouseEvent) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
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
            
            {showCount && (
                <div
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full 
                             bg-black text-white rounded-full w-6 h-6 flex items-center justify-center 
                             text-xs pointer-events-none"
                    style={{
                        animation: 'countBounce 2000ms forwards',
                    }}
                >
                    +{countValue}
                </div>
            )}
        </div>
    );
}