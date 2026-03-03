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
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-neutral-300 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Remotion Editor v2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500 pb-2">
            Create Videos <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 animate-gradient">
              At Lightning Speed
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">
            Build, edit and render professional videos directly in your browser.
            Experience a seamless timeline editor powered by modern web standards.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor/new"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-black font-semibold overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Creating Free
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/templates"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all active:scale-95 border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10"
            >
              <span className="text-white">Browse Templates</span>
            </Link>
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-32 grid md:grid-cols-2 gap-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">

          {/* Create Project */}
          <Link href="/editor/new" className="group block">
            <div className="relative h-full rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-20px_rgba(79,70,229,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-indigo-500/30">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-200 transition-colors">
                Start from Scratch
              </h2>

              <p className="text-neutral-400 leading-relaxed font-light">
                Launch the powerful multitrack timeline editor. Drop your assets, sequence your layers, and compose your masterpiece.
              </p>
            </div>
          </Link>

          {/* Templates */}
          <Link href="/templates" className="group block">
            <div className="relative h-full rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-20px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/30">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white flex items-center gap-3 group-hover:text-blue-200 transition-colors">
                Use Templates
                {templateCount > 0 && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {templateCount}
                  </span>
                )}
              </h2>

              <p className="text-neutral-400 leading-relaxed font-light">
                Save hours of work by picking up where others left off. Browse our curated collection of professional templates.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}