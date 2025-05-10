import { Metadata } from "next";
import { NoteCard } from "@/components/site/note-card";

export const metadata: Metadata = {
  title: "Notes | Personal Website",
  description: "Browse my collection of personal notes and thoughts.",
};

// Mock notes data (in a real app, this would come from a CMS or database)
const notes = [
  {
    slug: "first-note",
    title: "My First Note",
    excerpt: "This is the beginning of my journey into sharing my thoughts online. I'll be documenting my experiences and learnings here.",
    date: "2023-01-15",
    category: "personal"
  },
  {
    slug: "productivity-tips",
    title: "Productivity Tips That Actually Work",
    excerpt: "After years of trying different productivity systems, I've found a few approaches that consistently help me stay focused and get things done.",
    date: "2023-02-22",
    category: "productivity"
  },
  {
    slug: "book-recommendations",
    title: "Books That Changed My Perspective",
    excerpt: "A curated list of books that have significantly impacted my thinking and worldview over the past few years.",
    date: "2023-03-10",
    category: "books"
  },
  {
    slug: "travel-experiences",
    title: "Memorable Travel Experiences",
    excerpt: "Reflecting on some of the most impactful travel experiences I've had and what I learned from each of them.",
    date: "2023-04-05",
    category: "travel"
  },
  {
    slug: "future-thoughts",
    title: "Thoughts on the Future",
    excerpt: "Exploring some ideas about where technology and society might be headed in the coming decades.",
    date: "2023-05-20",
    category: "technology"
  },
  {
    slug: "creative-process",
    title: "My Creative Process",
    excerpt: "A behind-the-scenes look at how I approach creative projects, from ideation to execution.",
    date: "2023-06-15",
    category: "creativity"
  }
];

export default function NotesPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Notes</h1>
          <p className="text-muted-foreground text-lg">
            A collection of my thoughts, ideas, and learnings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}