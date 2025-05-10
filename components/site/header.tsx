"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

const links = [
    { href: "/", label: "Home" },
    { href: "/notes", label: "Notes" },
    { href: "/links", label: "Links" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between py-4">
                <div className="mr-4 flex">
                    <Link
                        href="/"
                        className="mr-6 flex items-center space-x-2"
                        aria-label="Go to homepage"
                    >
                        <span className="font-bold text-xl sm:text-2xl">
                            Portfolio
                        </span>
                    </Link>

                    <nav
                        className="hidden md:flex gap-6"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                                aria-current={
                                    pathname === link.href ? "page" : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <ThemeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden border-b pb-4"
                    id="mobile-menu"
                    role="navigation"
                    aria-label="Mobile navigation"
                >
                    <nav className="container max-w-5xl mx-auto flex flex-col space-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={
                                    pathname === link.href ? "page" : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
