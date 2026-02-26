import { ensureCdnFontLoaded, CDN_FONTS, fontNameToSlug } from "./cdnFonts";

const loaded = new Set<string>();
const fontLoadPromises = new Map<string, Promise<void>>();

function fontToGoogleCss(font: string) {
  return font.trim().split(/\s+/).join("+");
}

// Wait for font to actually load using Font Loading API
async function waitForFontLoad(fontFamily: string, timeout = 3000): Promise<void> {
  if (!document.fonts) {
    // Fallback for browsers without Font Loading API
    await new Promise((r) => setTimeout(r, 300));
    return;
  }

  try {
    // Wait for specific font to load
    await Promise.race([
      document.fonts.load(`1em "${fontFamily}"`),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Font load timeout")), timeout)
      ),
    ]);
    
    // Extra safety: wait for document.fonts.ready
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);
  } catch (error) {
    console.warn(`Font ${fontFamily} load timeout, continuing...`);
  }
}

export async function ensureGoogleFontLoaded(fontFamily: string) {
  const key = fontFamily.trim();
  if (!key) return;
  
  // Return existing promise if font is already being loaded
  if (fontLoadPromises.has(key)) {
    return fontLoadPromises.get(key);
  }

  if (loaded.has(key)) return;

  // Create a promise for this font load
  const loadPromise = (async () => {
    // Check if it's a known CDN font from our list
    const cdnFont = CDN_FONTS.find((f) => f.name === key);
    if (cdnFont) {
      await ensureCdnFontLoaded(cdnFont.name, cdnFont.slug);
      await waitForFontLoad(key);
      loaded.add(key);
      return;
    }

    // Try loading from Google Fonts first
    const href = `https://fonts.googleapis.com/css2?family=${fontToGoogleCss(
      key
    )}:wght@100;200;300;400;500;600;700;800;900&display=block`;

    // already exists?
    const exists = Array.from(document.querySelectorAll("link")).some(
      (l) => l.getAttribute("href")?.includes(fontToGoogleCss(key))
    );
    
    if (!exists) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }

    // Wait for font to actually load
    await waitForFontLoad(key);
    loaded.add(key);
  })();

  fontLoadPromises.set(key, loadPromise);
  
  try {
    await loadPromise;
  } finally {
    fontLoadPromises.delete(key);
  }
}

// Load font from CDN (for custom/unknown fonts)
export async function loadCustomCdnFont(fontName: string) {
  await ensureCdnFontLoaded(fontName);
}
