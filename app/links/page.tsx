import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Headphones, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Links | Personal Website",
  description: "Connect with me through various platforms.",
};

// Mock social links and podcast episodes
const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/username",
    icon: Instagram,
    color: "bg-pink-500",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/username",
    icon: Twitter,
    color: "bg-blue-500",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: Linkedin,
    color: "bg-blue-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/username",
    icon: Github,
    color: "bg-neutral-800",
  },
];

const podcastEpisodes = [
  {
    title: "The Creative Process",
    description: "Discussing how creativity works and how to improve your creative output.",
    date: "2023-06-10",
    duration: "42 min",
    image: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "https://podcasters.spotify.com",
  },
  {
    title: "Future of Technology",
    description: "Exploring emerging technologies and their potential impact on society.",
    date: "2023-05-15",
    duration: "38 min",
    image: "https://images.pexels.com/photos/5696008/pexels-photo-5696008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "https://podcasters.spotify.com",
  },
  {
    title: "Mindfulness and Productivity",
    description: "How mindfulness practices can enhance your productivity and well-being.",
    date: "2023-04-22",
    duration: "45 min",
    image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "https://podcasters.spotify.com",
  },
];

export default function LinksPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
      <div className="space-y-12">
        {/* Social Links Section */}
        <section className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Connect with Me</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex flex-col items-center border rounded-lg p-6 hover:border-primary transition-colors">
                  <div className={`${link.color} p-4 rounded-full text-white mb-4`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{link.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Podcast Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">My Podcast</h2>
            <Button variant="outline" asChild>
              <a 
                href="https://podcasters.spotify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                All Episodes <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcastEpisodes.map((episode, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-video">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Listen Now</Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{episode.title}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>{episode.date}</span>
                    <span>{episode.duration}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 py-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{episode.description}</p>
                </CardContent>
                <CardFooter className="p-4">
                  <Button variant="ghost" asChild className="w-full">
                    <a 
                      href={episode.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      <Headphones className="h-4 w-4 mr-1" /> Listen to Episode
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}