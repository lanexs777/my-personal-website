import Link from "next/link";
import { Instagram, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Personal Website. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link 
            href="https://podcasters.spotify.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Headphones className="h-5 w-5" />
            <span className="sr-only">Podcast</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}