import {
    Github,
    Instagram,
    Linkedin,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Links | Personal Website",
    description: "Connect with me through various platforms.",
};

// Social links
const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/khyler5/",
        icon: Instagram,
        color: "bg-pink-500",
        description: "Follow my personal journey and daily adventures",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/khyler-lin-373a2215b/",
        icon: Linkedin,
        color: "bg-blue-700",
        description: "Connect with me professionally and explore my career path",
    },
    {
        name: "GitHub",
        url: "https://github.com/lanexs777",
        icon: Github,
        color: "bg-neutral-800",
        description: "Check out my code and open source contributions",
    },
];


export default function LinksPage() {
    return (
        <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
            <div className="space-y-12">
                {/* Social Links Section */}
                <section className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Connect with Me
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="flex flex-col items-center border rounded-lg p-8 hover:border-primary transition-colors h-full">
                                    <div
                                        className={`${link.color} p-4 rounded-full text-white mb-4`}
                                    >
                                        <link.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors mb-2">
                                        {link.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        {link.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}