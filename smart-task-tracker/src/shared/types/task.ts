export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  done: boolean;
  priority: TaskPriority;
  createdAt: number; // unix ms
  dueDate?: string; // YYYY-MM-DD
};

export type Filter = "all" | "active" | "done";
export type Sort = "newest" | "oldest" | "priority" | "dueTo";

export type TaskFormValues = {
  title: string;
  priority: TaskPriority;
  dueDate?: string;
};
