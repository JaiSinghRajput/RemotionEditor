const loaded = new Set<string>();

function fontToGoogleCss(font: string) {
  return font.trim().split(/\s+/).join("+");
}

export async function ensureGoogleFontLoaded(fontFamily: string) {
  const key = fontFamily.trim();
  if (!key) return;
  if (loaded.has(key)) return;

  loaded.add(key);

  const href = `https://fonts.googleapis.com/css2?family=${fontToGoogleCss(
    key
  )}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

  // already exists?
  const exists = Array.from(document.querySelectorAll("link")).some(
    (l) => l.getAttribute("href") === href
  );
  if (exists) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);

  // wait a tiny bit so CSS arrives
  await new Promise((r) => setTimeout(r, 150));
}
