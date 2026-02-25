import { create } from "zustand";
import { Project, Layer } from "./types";

type EditorState = {
  // Data
  project: Project | null;
  selectedLayerId: string | null;

  // Playback
  currentFrame: number;
  playing: boolean;
  zoom: number;


  // Project / selection
  setProject: (p: Project) => void;
  selectLayer: (id: string | null) => void;

  // Playback controls
  setFrame: (frame: number) => void;
  incrementFrame: () => void;
  seekFrames: (delta: number) => void;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setFormat: (width: number, height: number) => void;
  setDuration: (durationInFrames: number) => void;

  // Timeline UI
  setZoom: (z: number) => void;

  // Layer operations
  updateLayer: <T extends Layer["type"]>(
    id: string,
    type: T,
    patch: Partial<Omit<Extract<Layer, { type: T }>, "id" | "type">>
  ) => void;


  addLayer: (layer: Layer) => void;
  deleteLayer: (id: string) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  selectedLayerId: null,

  currentFrame: 0,
  playing: false,
  zoom: 1,

  setProject: (p) =>
    set({
      project: p,
      currentFrame: 0,
      playing: false,
      selectedLayerId: null,
    }),

  selectLayer: (id) => set({ selectedLayerId: id }),

  // ---- Playback ----
  setFrame: (frame) => {
    const project = get().project;
    if (!project) return;

    const clamped = Math.max(0, Math.min(project.durationInFrames - 1, frame));
    set({ currentFrame: clamped });
  },

  incrementFrame: () => {
    const project = get().project;
    if (!project) return;

    set((state) => {
      const next = state.currentFrame + 1;
      return {
        currentFrame: next >= project.durationInFrames ? 0 : next,
      };
    });
  },

  seekFrames: (delta) => {
    const project = get().project;
    if (!project) return;

    set((state) => {
      const next = state.currentFrame + delta;
      const clamped = Math.max(0, Math.min(project.durationInFrames - 1, next));
      return { currentFrame: clamped };
    });
  },

  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  togglePlay: () => set((s) => ({ playing: !s.playing })),

  // ---- Zoom ----
  setZoom: (z) => set({ zoom: z }),

  // ---- Layers ----
  updateLayer: (id, type, patch) => {
    const project = get().project;
    if (!project) return;

    set({
      project: {
        ...project,
        layers: project.layers.map((l) => {
          if (l.id !== id) return l;
          if (l.type !== type) return l;
          return { ...l, ...patch } as Layer;
        }),
      },
    });
  },

  addLayer: (layer) => {
    const project = get().project;
    if (!project) return;

    set({
      project: {
        ...project,
        layers: [...project.layers, layer],
      },
    });
  },

  deleteLayer: (id) => {
    const project = get().project;
    if (!project) return;

    set({
      project: {
        ...project,
        layers: project.layers.filter((l) => l.id !== id),
      },
      selectedLayerId:
        get().selectedLayerId === id ? null : get().selectedLayerId,
    });
  },
  setFormat: (newW, newH) => {
    const project = get().project;
    if (!project) return;

    const oldW = project.width;
    const oldH = project.height;

    const sx = newW / oldW;
    const sy = newH / oldH;

    set({
      project: {
        ...project,
        width: newW,
        height: newH,
        layers: project.layers.map((l) => {
          if (l.type !== "text") return l;
          return {
            ...l,
            x: Math.round(l.x * sx),
            y: Math.round(l.y * sy),
            fontSize: Math.max(12, Math.round(l.fontSize * Math.min(sx, sy))),
          };
        }),
      },
    });
  },

  setDuration: (durationInFrames) => {
    const project = get().project;
    if (!project) return;

    set({
      project: {
        ...project,
        durationInFrames,
      },
    });
  },
}));
