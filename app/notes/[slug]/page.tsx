import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

// Mock notes data (in a real app, this would come from a CMS or database)
const notes = [
  {
    slug: "first-note",
    title: "My First Note",
    content: `
      <p>This is the beginning of my journey into sharing my thoughts online. I'll be documenting my experiences and learnings here.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>A Subheading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-01-15",
    category: "personal"
  },
  {
    slug: "productivity-tips",
    title: "Productivity Tips That Actually Work",
    content: `
      <p>After years of trying different productivity systems, I've found a few approaches that consistently help me stay focused and get things done.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Tip #1: Start Small</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Tip #2: Use Time Blocking</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-02-22",
    category: "productivity"
  },
  // Include similar content for other notes
  {
    slug: "book-recommendations",
    title: "Books That Changed My Perspective",
    content: `
      <p>A curated list of books that have significantly impacted my thinking and worldview over the past few years.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Fiction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Non-Fiction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-03-10",
    category: "books"
  },
  {
    slug: "travel-experiences",
    title: "Memorable Travel Experiences",
    content: `
      <p>Reflecting on some of the most impactful travel experiences I've had and what I learned from each of them.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Japan, 2019</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Peru, 2021</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-04-05",
    category: "travel"
  },
  {
    slug: "future-thoughts",
    title: "Thoughts on the Future",
    content: `
      <p>Exploring some ideas about where technology and society might be headed in the coming decades.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>AI and Automation</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Climate Change Solutions</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-05-20",
    category: "technology"
  },
  {
    slug: "creative-process",
    title: "My Creative Process",
    content: `
      <p>A behind-the-scenes look at how I approach creative projects, from ideation to execution.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Finding Inspiration</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
      <h2>Execution and Refinement</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, euismod aliquam nisl nunc egestas nisi.</p>
    `,
    date: "2023-06-15",
    category: "creativity"
  }
];

interface NotePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: NotePageProps): Metadata {
  const note = notes.find((note) => note.slug === params.slug);
  
  if (!note) {
    return {
      title: "Note Not Found",
    };
  }
  
  return {
    title: `${note.title} | Personal Website`,
    description: note.content.substring(0, 160),
  };
}

export default function NotePage({ params }: NotePageProps) {
  const note = notes.find((note) => note.slug === params.slug);
  
  if (!note) {
    notFound();
  }
  
  return (
    <div className="container px-4 md:px-6 py-10 max-w-3xl mx-auto">
      <Button variant="ghost" className="mb-8 -ml-4 flex items-center gap-1" asChild>
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
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            <span>•</span>
            <span className="bg-secondary px-2 py-1 rounded-md text-xs">#{note.category}</span>
          </div>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: note.content }} />
      </article>
    </div>
  );
}