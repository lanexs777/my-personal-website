import { NoteCard } from "@/components/site/note-card";
import { getNotes } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notes | Personal Website",
    description: "Browse my collection of personal notes and thoughts.",
};

export default async function NotesPage() {
    const notes = await getNotes();
    const validNotes = notes.filter(
        (note): note is NonNullable<typeof note> => note !== null
    );
    
    // Sort by date (most recent first)
    const sortedNotes = validNotes.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Notes
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        A collection of my thoughts, ideas, and learnings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedNotes.map((note) => (
                        <NoteCard key={note.slug} note={note} />
                    ))}
                </div>
            </div>
        </div>
    );
}
