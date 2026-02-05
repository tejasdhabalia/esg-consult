import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-20 text-center space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-neutral-600">
        The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="inline-block rounded-xl px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">
        Go back home
      </Link>
    </main>
  );
}
