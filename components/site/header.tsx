"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { FontToggle } from "./font-toggle";
import { AuthButton } from "../auth/auth-button";

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
            <div className="container max-w-5xl mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2"
                            tabIndex={0}
                        >
                            <span className="font-bold text-xl sm:text-2xl">
                                khyler5
                            </span>
                        </Link>

                        <nav
                            className="hidden md:flex ml-6 gap-6"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1",
                                        pathname === link.href
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                    aria-current={
                                        pathname === link.href ? "page" : undefined
                                    }
                                    tabIndex={0}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <AuthButton />
                        <FontToggle />
                        <ThemeToggle />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            tabIndex={0}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
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
                    <nav className="container max-w-5xl mx-auto flex flex-col space-y-4 px-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1",
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={
                                    pathname === link.href ? "page" : undefined
                                }
                                tabIndex={0}
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