'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useNoteLikes(slug: string) {
    const [likes, setLikes] = useState(0);

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

    return likes;
}