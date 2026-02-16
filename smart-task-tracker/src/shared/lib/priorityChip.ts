import type { TaskPriority } from "../types/task";

export function priorityChip(priority: TaskPriority) {
  if (priority === "high") return { label: "высокий", color: "error" as const, variant: "filled" as const };
  if (priority === "medium") return { label: "средний", color: "warning" as const, variant: "filled" as const };
  return { label: "низкий", color: "success" as const, variant: "filled" as const };
}
