import Link from "next/link";

export const metadata = {
  title: "Brian Newton | 404",
  description: "Page not found - Brian Newton's personal website",
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 bg-background text-foreground font-sans">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">
          Looks like you’ve wandered off the path.
        </p>
        <p className="text-muted-foreground">
          This page doesn&apos;t exist or has been moved. Let’s get you back on
          track.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
