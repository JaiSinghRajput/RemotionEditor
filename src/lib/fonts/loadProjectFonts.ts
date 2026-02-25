import { Project } from "../editor/types";
import { ensureGoogleFontLoaded } from "./googleFonts";

export async function loadProjectFonts(project: Project) {
  const fonts = new Set<string>();

  for (const l of project.layers) {
    if (l.type === "text") fonts.add(l.fontFamily);
  }

  await Promise.all(Array.from(fonts).map((f) => ensureGoogleFontLoaded(f)));
}
