import { Button } from "@/components/ui/button";
import { getNote, getNotes } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NotePageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const notes = await getNotes();
    const validNotes = notes.filter(
        (note): note is NonNullable<typeof note> => note !== null
    );
    return validNotes.map((note) => ({
        slug: note.slug,
    }));
}

export async function generateMetadata({
    params,
}: NotePageProps): Promise<Metadata> {
    const note = await getNote(params.slug);

    if (!note) {
        return {
            title: "Note Not Found",
        };
    }

    return {
        title: `${note.title} | Personal Website`,
        description: note.excerpt,
    };
}

export default async function NotePage({ params }: NotePageProps) {
    const note = await getNote(params.slug);

    if (!note) {
        notFound();
    }

    return (
        <div className="container px-4 md:px-6 py-10 max-w-3xl mx-auto">
            <Button
                variant="ghost"
                className="mb-8 -ml-4 flex items-center gap-1"
                asChild
            >
                <Link href="/notes">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Notes
                </Link>
            </Button>

            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl !mb-2">
                        {note.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <time dateTime={note.date}>
                            {formatDate(note.date)}
                        </time>
                        <span>•</span>
                        <span className="bg-secondary px-2 py-1 rounded-md text-xs">
                            #{note.category}
                        </span>
                    </div>
                </div>

                {/* ✅ This is now JSX from compileMDX */}
                {note.content}
            </article>
        </div>
    );
}
