'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface LikeButtonProps {
    slug: string;
    initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLoading, setIsLoading] = useState(false);
    const [showCount, setShowCount] = useState(false);
    const { theme } = useTheme();

    // Reset likes when slug changes
    useEffect(() => {
        setLikes(initialLikes);
    }, [initialLikes, slug]);

    // Subscribe to real-time updates
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

    const handleLike = async (event: React.MouseEvent) => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            setShowCount(false);
            
            const { error } = await supabase
                .from('likes')
                .insert({ note_slug: slug });

            if (error) throw error;
            
            // Show animation after successful insert
            requestAnimationFrame(() => {
                setShowCount(true);
            });
            
        } catch (error) {
            console.error('Error liking note:', error);
        } finally {
            setIsLoading(false);
            // Reset animation after 2 seconds
            setTimeout(() => {
                setShowCount(false);
            }, 2000);
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
                    className={cn(
                        "absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full",
                        "w-6 h-6 flex items-center justify-center text-xs pointer-events-none rounded-full",
                        theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                    )}
                    style={{
                        animation: 'countBounce 2000ms forwards',
                    }}
                >
                    +1
                </div>
            )}
        </div>
    );
}