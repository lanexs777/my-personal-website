'use client';

import { Note } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useNoteLikes } from "@/hooks/use-note-likes";

interface NoteCardProps {
    note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
    const likes = useNoteLikes(note.slug);
    
    return (
        <Link
            href={`/notes/${note.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            tabIndex={0}
        >
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <time className="text-sm text-muted-foreground">
                        {formatDate(note.date)}
                    </time>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{likes}</span>
                    </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {note.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3 flex-grow">
                    {note.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {note.category.map((cat) => (
                        <span
                            key={cat}
                            className="bg-secondary px-2 py-1 rounded-md text-sm text-muted-foreground"
                        >
                            #{cat}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}