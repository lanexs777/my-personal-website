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
            <nav className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <div className="flex items-center gap-6">
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
                        className="hidden md:flex gap-6"
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
                    <div className="hidden md:block">
                        <AuthButton />
                    </div>
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
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden border-b bg-background"
                    id="mobile-menu"
                    role="navigation"
                    aria-label="Mobile navigation"
                >
                    <div className="container mx-auto max-w-5xl px-4 py-4 space-y-4">
                        <nav className="space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "block py-2 text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2",
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
                        <div className="pt-2 border-t">
                            <div className="md:hidden">
                                <AuthButton />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}