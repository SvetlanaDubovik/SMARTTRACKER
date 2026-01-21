export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  priority: TaskPriority;
  createdAt: string; // ISO
  dueDate?: string;  // ISO
};
