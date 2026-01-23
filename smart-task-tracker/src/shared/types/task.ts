export type TaskPriority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "done";
export type Sort = "newest" | "oldest" | "priority";

export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  priority: TaskPriority;
  createdAt: string; // ISO
  dueDate?: string;  // ISO
};

 