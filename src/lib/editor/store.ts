import { create } from "zustand";
import { Project, Layer } from "./types";

type EditorState = {
  // Data
  project: Project | null;
  selectedLayerId: string | null;

  // History
  past: Project[];
  future: Project[];

  // Playback
  currentFrame: number;
  playing: boolean;
  zoom: number;


  // Project / selection
  setProject: (p: Project) => void;
  selectLayer: (id: string | null) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

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

// Helper to save current state to history before making changes
const saveToHistory = (get: () => EditorState, set: (partial: Partial<EditorState>) => void) => {
  const { project, past } = get();
  if (!project) return;
  
  // Limit history to 50 items
  const newPast = [...past, project].slice(-50);
  set({ past: newPast, future: [] });
};

// Helper to auto-save project to localStorage
const autoSaveProject = (project: Project | null) => {
  if (!project || typeof window === "undefined") return;
  try {
    localStorage.setItem(`project-${project.id}`, JSON.stringify(project));
  } catch (error) {
    console.error("Failed to auto-save project:", error);
  }
};

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  selectedLayerId: null,
  past: [],
  future: [],

  currentFrame: 0,
  playing: false,
  zoom: 1,

  setProject: (p) =>
    set({
      project: p,
      currentFrame: 0,
      playing: false,
      selectedLayerId: null,
      past: [],
      future: [],
    }),

  selectLayer: (id) => set({ selectedLayerId: id }),

  // Undo/Redo
  undo: () => {
    const { past, project, future } = get();
    if (past.length === 0 || !project) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);

    set({
      past: newPast,
      project: previous,
      future: [project, ...future],
    });
  },

  redo: () => {
    const { future, project, past } = get();
    if (future.length === 0 || !project) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      past: [...past, project],
      project: next,
      future: newFuture,
    });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

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

    saveToHistory(get, set);
    const updatedProject = {
      ...project,
      layers: project.layers.map((l) => {
        if (l.id !== id) return l;
        if (l.type !== type) return l;
        return { ...l, ...patch } as Layer;
      }),
    };
    set({ project: updatedProject });
    autoSaveProject(updatedProject);
  },

  addLayer: (layer) => {
    const project = get().project;
    if (!project) return;

    saveToHistory(get, set);
    const updatedProject = {
      ...project,
      layers: [...project.layers, layer],
    };
    set({ project: updatedProject });
    autoSaveProject(updatedProject);
  },

  deleteLayer: (id) => {
    const project = get().project;
    if (!project) return;

    saveToHistory(get, set);
    const updatedProject = {
      ...project,
      layers: project.layers.filter((l) => l.id !== id),
    };
    set({
      project: updatedProject,
      selectedLayerId:
        get().selectedLayerId === id ? null : get().selectedLayerId,
    });
    autoSaveProject(updatedProject);
  },
  setFormat: (newW, newH) => {
    const project = get().project;
    if (!project) return;

    const oldW = project.width;
    const oldH = project.height;

    const sx = newW / oldW;
    const sy = newH / oldH;
const updatedProject = {
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
    };
    set({ project: updatedProject });
    autoSaveProject(updatedProject);
  },

  setDuration: (durationInFrames) => {
    const project = get().project;
    if (!project) return;

    saveToHistory(get, set);
    const updatedProject = {
      ...project,
      durationInFrames,
    };
    set({ project: updatedProject });
    autoSaveProject(updatedProject);
  },
}));
