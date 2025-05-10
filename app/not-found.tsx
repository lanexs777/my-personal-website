import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-10 px-4 md:px-6 text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-4 text-muted-foreground max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}