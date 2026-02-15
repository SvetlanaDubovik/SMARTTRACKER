import { create } from "zustand";
import type { Filter, Sort, Task, TaskFormValues } from "../../../shared/types/task.ts";

type TasksState = {
  tasks: Task[];
  filter: Filter;
  sort: Sort;
  query: string;

  dialogOpen: boolean;
  editingId: string | null;

  // actions: ui state
  setFilter: (v: Filter) => void;
  setSort: (v: Sort) => void;
  setQuery: (v: string) => void;

  openCreate: () => void;
  openEdit: (id: string) => void;
  closeDialog: () => void;

  // actions: tasks
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  submitTask: (values: TaskFormValues) => void;
};

function uid() {
  return crypto.randomUUID?.() ?? String(Math.random()).slice(2);
}

const seedTasks: Task[] = [
  { id: uid(), title: "Вернуть React-руки", done: false, priority: "high", dueDate: "2026-02-10" },
  { id: uid(), title: "Добавить фильтры и поиск", done: false, priority: "medium" },
  { id: uid(), title: "Сделать README", done: true, priority: "low" },
];

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: seedTasks,
  filter: "all",
  sort: "newest",
  query: "",

  dialogOpen: false,
  editingId: null,

  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  setQuery: (query) => set({ query }),

  openCreate: () => set({ dialogOpen: true, editingId: null }),
  openEdit: (id) => set({ dialogOpen: true, editingId: id }),
  closeDialog: () => set({ dialogOpen: false }),

  toggleDone: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),

  deleteTask: (id) =>
    set((s) => ({
      tasks: s.tasks.filter((t) => t.id !== id),
    })),

  submitTask: (values) => {
    const { editingId, tasks } = get();

    // edit
    if (editingId) {
      set({
        tasks: tasks.map((t) => (t.id === editingId ? { ...t, ...values } : t)),
      });
      return;
    }

    // create
    const newTask: Task = { id: uid(), done: false, ...values };
    set({ tasks: [newTask, ...tasks] });
  },
}));

// selector: visible tasks (filter + search + sort)
export function selectVisibleTasks(s: Pick<TasksState, "tasks" | "filter" | "sort" | "query">) {
  let list = s.tasks;

  if (s.filter === "active") list = list.filter((t) => !t.done);
  if (s.filter === "done") list = list.filter((t) => t.done);

  const q = s.query.trim().toLowerCase();
  if (q) list = list.filter((t) => t.title.toLowerCase().includes(q));

  if (s.sort === "priority") {
    const rank = { high: 0, medium: 1, low: 2 } as const;
    list = [...list].sort((a, b) => rank[a.priority] - rank[b.priority]);
  }

  // Примечание: new/oldest лучше делать по createdAt. Пока оставим стабильный порядок.
  return list;
}
