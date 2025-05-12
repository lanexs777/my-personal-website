'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface LikeButtonProps {
    slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
    const [likes, setLikes] = useState(0);
    const [showCount, setShowCount] = useState(false);
    const [userClicks, setUserClicks] = useState(0);
    const { theme, systemTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Fetch initial like count
        const fetchLikes = async () => {
            const { count } = await supabase
                .from('likes')
                .select('*', { count: 'exact' })
                .eq('note_slug', slug);
            
            setLikes(count || 0);
        };

        fetchLikes();

        // Set up realtime subscription
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

    const handleLike = async (event: React.MouseEvent | React.KeyboardEvent) => {
        event.preventDefault();
        
        // Reset animation by removing and re-adding the element
        setShowCount(false);
        setUserClicks(prev => prev + 1);
        
        // Force a reflow to ensure the animation restarts
        requestAnimationFrame(() => {
            setShowCount(true);
        });
        
        try {
            const { error } = await supabase
                .from('likes')
                .insert({ note_slug: slug });

            if (error) throw error;

            // Refocus the button after the like action
            buttonRef.current?.focus();
        } catch (error) {
            console.error('Error liking note:', error);
        }
    };

    // Determine the current effective theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    return (
        <div className="relative">
            <Button
                ref={buttonRef}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 relative"
                onClick={handleLike}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleLike(e);
                    }
                }}
            >
                <Heart className="h-4 w-4" />
                <span>{likes}</span>
            </Button>
            
            {showCount && (
                <div
                    className={cn(
                        "absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full",
                        "w-6 h-6 flex items-center justify-center text-xs pointer-events-none rounded-full",
                        isDark ? 'bg-white text-black' : 'bg-black text-white'
                    )}
                    style={{
                        animation: 'countBounce 2000ms forwards',
                    }}
                >
                    +{userClicks}
                </div>
            )}
        </div>
    );
}