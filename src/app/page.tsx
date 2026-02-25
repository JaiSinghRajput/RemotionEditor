import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Video Editor</h1>
            <p className="text-sm opacity-70 mt-1">
              Create Remotion based video templates and render MP4.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Projects</h2>
          <div className="mt-6">
            <Link
              href={`/editor/new`}
              className="inline-flex px-4 py-2 rounded border text-sm"
            >
              + Create New Project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
