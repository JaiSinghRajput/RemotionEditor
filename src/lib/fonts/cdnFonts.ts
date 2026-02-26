// Popular CDN Fonts from cdnfonts.com
export type CdnFont = {
  name: string;
  slug: string; // URL slug for CSS
  category: string;
};

export const CDN_FONTS: CdnFont[] = [
  // Sans-Serif
  { name: "Helvetica Neue", slug: "helvetica-neue-5", category: "sans-serif" },
  { name: "Gotham", slug: "gotham", category: "sans-serif" },
  { name: "Futura", slug: "futura-2", category: "sans-serif" },
  { name: "Avenir", slug: "avenir", category: "sans-serif" },
  { name: "Proxima Nova", slug: "proxima-nova-2", category: "sans-serif" },
  { name: "Brandon Grotesque", slug: "brandon-grotesque", category: "sans-serif" },
  { name: "Din", slug: "din-2014", category: "sans-serif" },
  { name: "Century Gothic", slug: "century-gothic", category: "sans-serif" },
  { name: "Gilroy", slug: "gilroy-bold", category: "sans-serif" },
  { name: "Sofia Pro", slug: "sofia-pro", category: "sans-serif" },
  { name: "Circular Std", slug: "circular-std", category: "sans-serif" },
  { name: "TT Commons", slug: "tt-commons", category: "sans-serif" },
  { name: "Nexa", slug: "nexa-bold", category: "sans-serif" },
  { name: "Product Sans", slug: "product-sans", category: "sans-serif" },
  { name: "SF Pro Display", slug: "sf-pro-display", category: "sans-serif" },
  { name: "Metropolis", slug: "metropolis-2", category: "sans-serif" },
  { name: "Gotham Rounded", slug: "gotham-rounded", category: "sans-serif" },
  { name: "TT Norms", slug: "tt-norms", category: "sans-serif" },
  { name: "Museo Sans", slug: "museo-sans", category: "sans-serif" },
  { name: "Akrobat", slug: "akrobat", category: "sans-serif" },

  // Serif
  { name: "Didot", slug: "didot-2", category: "serif" },
  { name: "Bodoni", slug: "bodoni-mt", category: "serif" },
  { name: "Caslon", slug: "adobe-caslon-pro", category: "serif" },
  { name: "Garamond", slug: "garamond", category: "serif" },
  { name: "Baskerville", slug: "libre-baskerville", category: "serif" },
  { name: "Trajan", slug: "trajan-pro", category: "serif" },
  { name: "Minion Pro", slug: "minion-pro", category: "serif" },
  { name: "Big Caslon", slug: "big-caslon", category: "serif" },
  { name: "Freight Text", slug: "freight-text-pro", category: "serif" },
  { name: "Mrs Eaves", slug: "mrs-eaves", category: "serif" },

  // Display & Decorative
  { name: "Wisdom Script", slug: "wisdom-script", category: "display" },
  { name: "Lyka Gemelos", slug: "lyka-gemelos", category: "display" },
  { name: "More Than Life", slug: "more-than-life", category: "display" },
  { name: "Holiday Trip", slug: "holiday-trip", category: "display" },
  { name: "Intro", slug: "intro", category: "display" },
  { name: "Nexa Rust", slug: "nexa-rust", category: "display" },
  { name: "Voga", slug: "voga", category: "display" },
  { name: "Blanka", slug: "blanka", category: "display" },
  { name: "Misto", slug: "misto", category: "display" },
  { name: "Harley", slug: "harley", category: "display" },
  { name: "Retro Signature", slug: "retro-signature", category: "display" },
  { name: "Wild Youth", slug: "wild-youth", category: "display" },
  { name: "Northwell", slug: "northwell", category: "display" },
  { name: "Playlist", slug: "playlist", category: "display" },
  { name: "Beyno", slug: "beyno", category: "display" },
  { name: "Coneria Script", slug: "coneria-script", category: "display" },
  { name: "Angilla Tattoo", slug: "angilla-tattoo", category: "display" },
  { name: "Billionaire", slug: "billionaire", category: "display" },
  { name: "Blacklisted", slug: "blacklisted", category: "display" },
  { name: "Bookeyed Jack", slug: "bookeyed-jack", category: "display" },
  { name: "California Sunrise", slug: "california-sunrise", category: "display" },
  { name: "Champagne Limousines", slug: "champagne-limousines", category: "display" },

  // Handwriting & Script
  { name: "Allura", slug: "allura", category: "handwriting" },
  { name: "Angelina", slug: "angelina", category: "handwriting" },
  { name: "Brittany Signature", slug: "brittany-signature", category: "handwriting" },
  { name: "Honey Script", slug: "honey-script", category: "handwriting" },
  { name: "Southam", slug: "southam", category: "handwriting" },
  { name: "Sacramento", slug: "sacramento", category: "handwriting" },
  { name: "Mistral", slug: "mistral", category: "handwriting" },
  { name: "Lucida Handwriting", slug: "lucida-handwriting", category: "handwriting" },
  { name: "Brush Script", slug: "brush-script-mt", category: "handwriting" },
  { name: "Yellowtail", slug: "yellowtail", category: "handwriting" },

  // Monospace
  { name: "Monaco", slug: "monaco", category: "monospace" },
  { name: "Consolas", slug: "consolas", category: "monospace" },
  { name: "Operator Mono", slug: "operator-mono", category: "monospace" },
  { name: "Input Mono", slug: "input-mono", category: "monospace" },
  { name: "Dank Mono", slug: "dank-mono", category: "monospace" },
];

const loaded = new Set<string>();
const fontLoadPromises = new Map<string, Promise<void>>();

// Convert font name to CDN slug (e.g., "More Than Life" → "more-than-life")
export function fontNameToSlug(fontName: string): string {
  return fontName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function getCdnFontCssUrl(slug: string): string {
  return `https://fonts.cdnfonts.com/css/${slug}`;
}

// Wait for font to actually load using Font Loading API
async function waitForFontLoad(fontFamily: string, timeout = 3000): Promise<void> {
  if (!document.fonts) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }

  try {
    await Promise.race([
      document.fonts.load(`1em "${fontFamily}"`),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Font load timeout")), timeout)
      ),
    ]);
    
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);
  } catch (error) {
    console.warn(`CDN font ${fontFamily} load timeout, continuing...`);
  }
}

// Load any CDN font by name, auto-generating slug if not in our list
export async function ensureCdnFontLoaded(fontName: string, slug?: string) {
  const key = `cdn-${fontName}`;
  
  // Return existing promise if font is already being loaded
  if (fontLoadPromises.has(key)) {
    return fontLoadPromises.get(key);
  }
  
  if (loaded.has(key)) return;

  // Create a promise for this font load
  const loadPromise = (async () => {
    // Use provided slug or generate from font name
    const finalSlug = slug || fontNameToSlug(fontName);

    const href = getCdnFontCssUrl(finalSlug);

    // Check if already exists
    const exists = Array.from(document.querySelectorAll("link")).some(
      (l) => l.getAttribute("href") === href
    );
    
    if (!exists) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }

    // Wait for font to actually load
    await waitForFontLoad(fontName);
    loaded.add(key);
  })();

  fontLoadPromises.set(key, loadPromise);
  
  try {
    await loadPromise;
  } finally {
    fontLoadPromises.delete(key);
  }
}

export function searchCdnFonts(query: string): CdnFont[] {
  if (!query.trim()) return CDN_FONTS.slice(0, 50); // Return first 50 by default

  const lowerQuery = query.toLowerCase();
  const matchingFonts = CDN_FONTS.filter(
    (font) =>
      font.name.toLowerCase().includes(lowerQuery) ||
      font.category.toLowerCase().includes(lowerQuery)
  );

  // If user typed an exact font name not in our list, add it as a custom CDN font
  if (query.trim().length > 2) {
    const exactMatch = CDN_FONTS.some(
      (f) => f.name.toLowerCase() === lowerQuery
    );
    
    if (!exactMatch && query.trim().length >= 3) {
      // Add user's search term as a custom CDN font
      matchingFonts.push({
        name: query.trim(),
        slug: fontNameToSlug(query),
        category: "custom",
      });
    }
  }

  return matchingFonts;
}
