import { Headphones, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background/80 backdrop-blur">
            <div className="container max-w-5xl mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Personal Website. All
                        rights reserved.
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full p-2"
                        aria-label="Visit our Instagram"
                        tabIndex={0}
                    >
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://podcasters.spotify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full p-2"
                        aria-label="Listen to our podcast"
                        tabIndex={0}
                    >
                        <Headphones className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}