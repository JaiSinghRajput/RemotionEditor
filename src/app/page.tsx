"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { templateStorage } from "../lib/templates/storage";

export default function HomePage() {
  const [templateCount, setTemplateCount] = useState(0);

  useEffect(() => {
    setTemplateCount(templateStorage.getAll().length);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HERO */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Create Videos Faster
          </h1>

          <p className="mt-4 text-neutral-400">
            Build, edit and render professional videos directly in your browser.
            No complex tools. Just create.
          </p>

          <Link
            href="/editor/new"
            className="inline-flex mt-8 px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-500 hover:to-indigo-500
            font-medium shadow-lg shadow-blue-600/20
            transition-all"
          >
            Start Creating →
          </Link>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">

          {/* Create Project */}
          <div className="group relative rounded-2xl border border-white/10
            bg-gradient-to-b from-neutral-900 to-neutral-950
            p-8 hover:border-blue-500/40 transition-all">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100
              bg-blue-600/5 rounded-2xl transition" />

            <h2 className="text-xl font-semibold mb-3">
              Create New Project
            </h2>

            <p className="text-sm text-neutral-400 mb-6">
              Start with a blank timeline and build your video from scratch.
            </p>

            <Link
              href="/editor/new"
              className="inline-flex px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-500 transition"
            >
              New Project
            </Link>
          </div>

          {/* Templates */}
          <div className="group relative rounded-2xl border border-white/10
            bg-gradient-to-b from-neutral-900 to-neutral-950
            p-8 hover:border-indigo-500/40 transition-all">

            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              Browse Templates
              {templateCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full
                  bg-indigo-500/20 text-indigo-300">
                  {templateCount} available
                </span>
              )}
            </h2>

            <p className="text-sm text-neutral-400 mb-6">
              Use pre-built templates to create videos in minutes.
            </p>

            <Link
              href="/templates"
              className="inline-flex px-4 py-2 rounded-lg
              border border-white/20 hover:bg-white/5 transition"
            >
              View Templates
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}