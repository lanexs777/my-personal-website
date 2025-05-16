import { NoteCard } from "@/components/site/note-card";
import CircularText from "@/components/ui/CircularText/CircularText";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const notes = await getNotes();
    const validNotes = notes.filter(
        (note): note is NonNullable<typeof note> => note !== null
    );

    // Get featured notes (top 3 by likes)
    const featuredNotes = validNotes.slice(0, 3);

    // Get recent notes (latest 3 by date)
    const recentNotes = [...validNotes]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <div className="container px-4 md:px-6 py-10 md:py-16 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                <div className="order-2 md:order-1 flex-1 space-y-6">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                        Hi, I'm{" "}
                        <span className="inline-flex items-center gap-3">
                            <span className="text-primary">Khyler</span>
                            <CircularText
                                text="Quack*Quack*"
                                className="w-[60px] h-[60px] text-black"
                            />
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Welcome to my personal space on the web — a place where
                        I share my thoughts, experiences, and reflections on
                        what I'm learning and building.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button asChild size="lg">
                            <Link href="/notes" tabIndex={0}>
                                Browse My Notes
                                <ArrowRight
                                    className="ml-2 h-4 w-4"
                                    aria-hidden="true"
                                />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/links" tabIndex={0}>
                                See My Links
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="order-1 md:order-2 flex-shrink-0">
                    <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full bg-muted">
                        <Image
                            src="/images/frog.png"
                            alt="Profile picture showing a pixel art frog on a rubber duck"
                            fill
                            className="object-contain transition-transform duration-500 hover:scale-105 block dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/frog_dark.png"
                            alt="Profile picture showing a pixel art frog on a rubber duck (dark version)"
                            fill
                            className="object-contain transition-transform duration-500 hover:scale-105 hidden dark:block"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Featured Notes Section */}
            <section
                className="mt-24 space-y-8"
                aria-labelledby="featured-notes-heading"
            >
                <div className="flex items-center justify-between">
                    <h2
                        id="featured-notes-heading"
                        className="text-3xl font-bold tracking-tight"
                    >
                        Featured Notes
                    </h2>
                    <Button variant="ghost" asChild>
                        <Link
                            href="/notes"
                            className="flex items-center gap-1"
                            tabIndex={0}
                        >
                            View all{" "}
                            <ArrowRight
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredNotes.map((note) => (
                        <NoteCard key={note.slug} note={note} />
                    ))}
                </div>
            </section>

            {/* Recent Notes Section */}
            <section
                className="mt-24 space-y-8"
                aria-labelledby="recent-notes-heading"
            >
                <div className="flex items-center justify-between">
                    <h2
                        id="recent-notes-heading"
                        className="text-3xl font-bold tracking-tight"
                    >
                        Recent Notes
                    </h2>
                    <Button variant="ghost" asChild>
                        <Link
                            href="/notes"
                            className="flex items-center gap-1"
                            tabIndex={0}
                        >
                            View all{" "}
                            <ArrowRight
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentNotes.map((note) => (
                        <NoteCard key={note.slug} note={note} />
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section
                className="mt-24 space-y-8"
                aria-labelledby="about-heading"
            >
                <h2
                    id="about-heading"
                    className="text-3xl font-bold tracking-tight"
                >
                    About Me
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>
                        I'm a software engineer based in Seattle, passionate
                        about building thoughtful, user-centered web
                        experiences. By day, I craft scalable, performant code —
                        and by night (and weekends), I chase powder as an avid
                        snowboarder and explore the city's ever-evolving food
                        scene as a dedicated foodie.
                    </p>
                    <br></br>
                    <p>
                        Whether it's optimizing a web app, trying a new ramen
                        spot, or shaving a few seconds off my mile time, I'm
                        always looking for ways to grow, connect, and create.
                    </p>
                </div>
            </section>
        </div>
    );
}
