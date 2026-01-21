import { create } from "zustand";
import type { Task, TaskPriority } from "../../../shared/types/task";

type Filter = "all" | "active" | "done";
type Sort = "newest" | "oldest" | "priority";

type TasksState = {
  tasks: Task[];
  filter: Filter;
  sort: Sort;
  search: string;

  setFilter: (f: Filter) => void;
  setSort: (s: Sort) => void;
  setSearch: (q: string) => void;

  addTask: (title: string) => void;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  editTitle: (id: string, title: string) => void;
};

const STORAGE_KEY = "stt_tasks_v1";

function nowIso() {
  return new Date().toISOString();
}

function uid() {
  return crypto.randomUUID?.() ?? String(Math.random()).slice(2);
}

const seedTasks: Task[] = [
  { id: uid(), title: "Вернуть React-руки", done: false, priority: "high", createdAt: nowIso() },
  { id: uid(), title: "Добавить фильтры и поиск", done: false, priority: "medium", createdAt: nowIso() },
  { id: uid(), title: "Сделать README", done: false, priority: "low", createdAt: nowIso() },
];

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTasks;
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : seedTasks;
  } catch {
    return seedTasks;
  }
}

function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore
  }
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: loadTasks(),
  filter: "all",
  sort: "newest",
  search: "",

  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),

  addTask: (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: uid(),
      title: trimmed,
      done: false,
      priority: "medium" as TaskPriority,
      createdAt: nowIso(),
    };

    const next = [newTask, ...get().tasks];
    saveTasks(next);
    set({ tasks: next });
  },

  toggleDone: (id) => {
    const next = get().tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    saveTasks(next);
    set({ tasks: next });
  },

  deleteTask: (id) => {
    const next = get().tasks.filter((t) => t.id !== id);
    saveTasks(next);
    set({ tasks: next });
  },

  editTitle: (id, title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const next = get().tasks.map((t) => (t.id === id ? { ...t, title: trimmed } : t));
    saveTasks(next);
    set({ tasks: next });
  },
}));

export function selectVisibleTasks(state: Pick<TasksState, "tasks" | "filter" | "sort" | "search">) {
  const q = state.search.trim().toLowerCase();

  let list = state.tasks;

  // filter
  if (state.filter === "active") list = list.filter((t) => !t.done);
  if (state.filter === "done") list = list.filter((t) => t.done);

  // search
  if (q) list = list.filter((t) => t.title.toLowerCase().includes(q));

  // sort
  if (state.sort === "newest") {
    list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else if (state.sort === "oldest") {
    list = [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  } else if (state.sort === "priority") {
    const rank = { high: 0, medium: 1, low: 2 } as const;
    list = [...list].sort((a, b) => rank[a.priority] - rank[b.priority]);
  }

  return list;
}
