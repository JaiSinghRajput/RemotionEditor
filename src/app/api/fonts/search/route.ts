import { NextRequest, NextResponse } from "next/server";
import { searchCdnFonts, type CdnFont } from "../../../../lib/fonts/cdnFonts";

type GoogleFont = {
  family: string;
  category: string;
  variants: string[];
};

type GoogleFontsResponse = {
  items: GoogleFont[];
};

type FontResult = {
  name: string;
  category: string;
  type: "google" | "cdn";
  slug?: string; // For CDN fonts
};

// Cache fonts for 24 hours
let cachedFonts: GoogleFont[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    
    // Get CDN fonts
    const cdnFonts = searchCdnFonts(query).map((font: CdnFont) => ({
      name: font.name,
      category: font.category,
      type: "cdn" as const,
      slug: font.slug,
    }));

    let googleFonts: FontResult[] = [];

    // Fetch Google Fonts
    try {
      const now = Date.now();
      if (!cachedFonts || now - cacheTime > CACHE_DURATION) {
        const apiKey = process.env.GOOGLE_FONTS_API_KEY;
        
        if (apiKey) {
          const response = await fetch(
            `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
          );

          if (response.ok) {
            const data: GoogleFontsResponse = await response.json();
            cachedFonts = data.items;
            cacheTime = now;
          }
        }
      }

      if (cachedFonts) {
        let filteredGoogleFonts = cachedFonts;
        
        if (query.trim()) {
          const lowerQuery = query.toLowerCase();
          filteredGoogleFonts = cachedFonts.filter(
            (font) =>
              font.family.toLowerCase().includes(lowerQuery) ||
              font.category.toLowerCase().includes(lowerQuery)
          );
        }

        googleFonts = filteredGoogleFonts.slice(0, 50).map((font) => ({
          name: font.family,
          category: font.category,
          type: "google" as const,
        }));
      }
    } catch (error) {
      console.warn("Google Fonts API error, continuing with CDN fonts only:", error);
    }

    // Combine both sources, CDN fonts first for premium experience
    const allFonts = [...cdnFonts, ...googleFonts].slice(0, 100);

    return NextResponse.json({ fonts: allFonts });
  } catch (error) {
    console.error("Font search error:", error);
    return NextResponse.json(
      { error: "Failed to search fonts" },
      { status: 500 }
    );
  }
}
