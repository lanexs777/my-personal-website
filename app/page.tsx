import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="container px-4 md:px-6 py-10 md:py-16 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                <div className="order-2 md:order-1 flex-1 space-y-6">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                        Hi, I'm <span className="text-primary">Your Name</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Welcome to my personal corner of the internet, where I
                        share my thoughts, notes, and discoveries.
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
                            className="object-contain transition-transform duration-500 hover:scale-105"
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
                    {[1, 2, 3].map((i) => (
                        <Link
                            key={i}
                            href={`/notes/note-${i}`}
                            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                            tabIndex={0}
                        >
                            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
                                <div className="mb-4 text-sm text-muted-foreground">
                                    {new Date().toLocaleDateString()}
                                </div>
                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    Example Note Title {i}
                                </h3>
                                <p className="mt-2 text-muted-foreground line-clamp-3">
                                    This is a brief description of what this
                                    note contains. It could be about technology,
                                    personal thoughts, or anything else I find
                                    interesting.
                                </p>
                                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                    <span className="bg-secondary px-2 py-1 rounded-md">
                                        #category
                                    </span>
                                </div>
                            </div>
                        </Link>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam euismod, nisi vel consectetur interdum, nisl nunc
                        egestas nisi, euismod aliquam nisl nunc egestas nisi.
                        Nullam euismod, nisi vel consectetur interdum, nisl nunc
                        egestas nisi, euismod.
                    </p>
                    <p>
                        Nullam euismod, nisi vel consectetur interdum, nisl nunc
                        egestas nisi, euismod aliquam nisl nunc egestas nisi.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </section>
        </div>
    );
}
