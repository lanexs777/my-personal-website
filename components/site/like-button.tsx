'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '../ui/button';

interface LikeButtonProps {
    slug: string;
    initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const channel = supabase
            .channel('likes')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'likes',
                filter: `note_slug=eq.${slug}`,
            }, (payload) => {
                // Only update if we didn't trigger this change
                if (!hasLiked) {
                    setLikes((prev) => prev + 1);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [slug, hasLiked]);

    const handleLike = async () => {
        if (isLoading || hasLiked) return;
        
        try {
            setIsLoading(true);
            
            const { error } = await supabase
                .from('likes')
                .insert({ note_slug: slug });

            if (error) throw error;

            // Mark as liked and update count locally
            setHasLiked(true);
            setLikes((prev) => prev + 1);
        } catch (error) {
            console.error('Error liking note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleLike}
            disabled={isLoading || hasLiked}
        >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
        </Button>
    );
}