"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";

type Font = { name: string; category: string; type: string; slug?: string };

// Popular fonts to show by default (Mix of Google and CDN)
const POPULAR_FONTS: Font[] = [
  { name: "Inter", category: "sans-serif", type: "google" },
  { name: "Poppins", category: "sans-serif", type: "google" },
  { name: "Gotham", category: "sans-serif", type: "cdn", slug: "gotham" },
  { name: "Helvetica Neue", category: "sans-serif", type: "cdn", slug: "helvetica-neue-5" },
  { name: "Montserrat", category: "sans-serif", type: "google" },
  { name: "Proxima Nova", category: "sans-serif", type: "cdn", slug: "proxima-nova-2" },
  { name: "Playfair Display", category: "serif", type: "google" },
  { name: "Didot", category: "serif", type: "cdn", slug: "didot-2" },
  { name: "Bebas Neue", category: "display", type: "google" },
  { name: "Lyka Gemelos", category: "display", type: "cdn", slug: "lyka-gemelos" },
  { name: "Dancing Script", category: "handwriting", type: "google" },
  { name: "Wisdom Script", category: "display", type: "cdn", slug: "wisdom-script" },
];

export default function FieldFontSearch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFonts, setFilteredFonts] = useState<Font[]>(POPULAR_FONTS);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFonts(POPULAR_FONTS);
      return;
    }

    const fetchFonts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/fonts/search?q=${encodeURIComponent(searchQuery)}`
        );
        if (response.ok) {
          const data = await response.json();
          setFilteredFonts(data.fonts || []);
        }
      } catch (error) {
        console.error("Failed to fetch fonts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchFonts, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedFont = filteredFonts.find((f: Font) => f.name === value);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/90">{label}</label>
      <div ref={dropdownRef} className="relative">
        {/* Search Input */}
        <div className="relative">
          {isLoading ? (
            <Loader2 className="absolute left-3 top-2.5 w-4 h-4 text-white/40 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder={value || "Type ANY font name from cdnfonts.com or Google Fonts..."}
            value={isOpen ? searchQuery : ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white/90 placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors"
          />
          {isOpen && searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-2.5 text-white/40 hover:text-white/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selected Font Display */}
        {!isOpen && value && (
          <div className="mt-2 text-sm text-white/70">
            Selected: <span className="text-white/90 font-medium">{value}</span>
            {selectedFont && (
              <span className="text-white/50 ml-2">({selectedFont.category})</span>
            )}
          </div>
        )}

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-neutral-900 border border-white/20 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {filteredFonts.length === 0 ? (
              <div className="p-4 text-sm text-white/50 text-center">
                No fonts found matching "{searchQuery}"
              </div>
            ) : (
              <>
                <div className="sticky top-0 bg-neutral-900 px-3 py-2 text-xs text-white/50 border-b border-white/10">
                  {searchQuery ? (
                    <>
                      {filteredFonts.length} result{filteredFonts.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </>
                  ) : (
                    <>Popular Fonts (Google + Premium CDN)</>
                  )}
                </div>
                <div className="p-2 space-y-1">
                  {filteredFonts.map((font: Font) => (
                    <button
                      key={font.name}
                      onClick={() => {
                        onChange(font.name);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        value === font.name
                          ? "bg-blue-600/30 border border-blue-500/50 text-white"
                          : "hover:bg-white/10 text-white/80 hover:text-white"
                      }`}
                      style={{ fontFamily: font.name }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex-1 truncate">{font.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {font.type === "cdn" && font.category !== "custom" && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              Premium
                            </span>
                          )}
                          {font.category === "custom" && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                              CDN
                            </span>
                          )}
                          {font.category !== "custom" && (
                            <span className="text-xs text-white/40">{font.category}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Search Info */}
        {isOpen && !searchQuery && (
          <div className="mt-2 text-xs text-white/40 space-y-1 p-2 bg-neutral-900/50 rounded">
            <div>
              💡 <span className="font-medium">Tip:</span> Type ANY font name from cdnfonts.com (e.g., "More Than Life", "Holiday Trip") or search Google Fonts
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
