import fs from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

const notesDirectory = path.join(process.cwd(), "content/notes");

export interface Note {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: JSX.Element; // ⬅️ content is now JSX!
}

export async function getNotes(): Promise<(Note | null)[]> {
    const fileNames = fs.readdirSync(notesDirectory);
    const notes = await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            return await getNote(slug);
        })
    );

    return notes;
}

export async function getNote(slug: string): Promise<Note | null> {
    const fullPath = path.join(notesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Compile MDX to JSX
    const compiled = await compileMDX({
        source: content,
        options: { parseFrontmatter: false },
    });

    return {
        slug,
        content: compiled.content, // now JSX
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
    };
}
