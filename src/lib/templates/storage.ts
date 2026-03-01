import { Project } from "../editor/types";
import { defaultTemplates } from "./defaultTemplates";

export type Template = {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  project: Project;
  createdAt: string;
  tags?: string[];
};

const STORAGE_KEY = "video-templates";
const INIT_KEY = "templates-initialized";

export const templateStorage = {
  initDefaults(): void {
    if (typeof window === "undefined") return;
    
    const initialized = localStorage.getItem(INIT_KEY);
    if (initialized) return;
    
    // Load default templates on first use
    const data = localStorage.getItem(STORAGE_KEY);
    const existingTemplates = data ? JSON.parse(data) : [];
    
    if (existingTemplates.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTemplates));
    }
    localStorage.setItem(INIT_KEY, "true");
  },

  getAll(): Template[] {
    if (typeof window === "undefined") return [];
    this.initDefaults();
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  getById(id: string): Template | null {
    const templates = this.getAll();
    return templates.find((t) => t.id === id) || null;
  },

  save(template: Template): void {
    const templates = this.getAll();
    const existingIndex = templates.findIndex((t) => t.id === template.id);
    
    if (existingIndex >= 0) {
      templates[existingIndex] = template;
    } else {
      templates.push(template);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  },

  delete(id: string): void {
    const templates = this.getAll().filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  },

  createFromProject(project: Project, name: string, description: string): Template {
    return {
      id: crypto.randomUUID(),
      name,
      description,
      project: JSON.parse(JSON.stringify(project)), // Deep clone
      createdAt: new Date().toISOString(),
      tags: [],
    };
  },
};
