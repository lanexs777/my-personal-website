import { Note } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface NoteCardProps {
    note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
    return (
        <Link
            href={`/notes/${note.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        >
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md h-full flex flex-col">
                <div className="mb-4 text-sm text-muted-foreground">
                    {formatDate(note.date)}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {note.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3 flex-grow">
                    {note.excerpt}
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span className="bg-secondary px-2 py-1 rounded-md">
                        #{note.category}
                    </span>
                </div>
            </div>
        </Link>
    );
}
