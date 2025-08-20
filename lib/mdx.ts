import fs from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { supabase } from "./supabase-client";

const notesDirectory = path.join(process.cwd(), "content/notes");

export interface Note {
    slug: string;
    title: string;
    date: string;
    category: string[];
    excerpt: string;
    content: JSX.Element;
    likeCount?: number;
    featured?: boolean;
}

export async function getNotes(): Promise<(Note | null)[]> {
    const fileNames = fs.readdirSync(notesDirectory);
    const notes = await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            return await getNote(slug);
        })
    );

    // Get all likes
    const { data: likes } = await supabase
        .from('likes')
        .select('note_slug');

    // Count likes for each note
    const likeCounts = new Map();
    likes?.forEach(like => {
        const currentCount = likeCounts.get(like.note_slug) || 0;
        likeCounts.set(like.note_slug, currentCount + 1);
    });

    // Add like counts to notes
    const notesWithLikes = notes.map(note => {
        if (!note) return null;
        return {
            ...note,
            likeCount: likeCounts.get(note.slug) || 0
        };
    });

    // Sort by like count (descending) and then by date (descending)
    return notesWithLikes.sort((a, b) => {
        if (!a || !b) return 0;
        if (a.likeCount !== b.likeCount) {
            return (b.likeCount || 0) - (a.likeCount || 0);
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function getNote(slug: string): Promise<Note | null> {
    const fullPath = path.join(notesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Compile MDX to JSX
    const compiled = await compileMDX({
        source: content,
        options: { parseFrontmatter: false },
    });

    // Get like count for this note
    const { count } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('note_slug', slug);

    // Convert category to array if it's a string
    const categories = Array.isArray(data.category) ? data.category : [data.category];

    return {
        slug,
        content: compiled.content,
        title: data.title,
        date: data.date,
        category: categories,
        excerpt: data.excerpt,
        likeCount: count || 0,
        featured: data.featured || false
    };
}