import { z } from "zod";

export const prioritySchema = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  priority: prioritySchema.optional().default("medium"),
  dueDate: z.string().optional(), // "YYYY-MM-DD" или ISO — решим на фронте
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  done: z.boolean().optional(),
  priority: prioritySchema.optional(),
  dueDate: z.string().nullable().optional(), // null = убрать dueDate
});

export const listQuerySchema = z.object({
  status: z.enum(["all", "active", "done"]).optional(),
  q: z.string().optional(),
  sort: z.enum(["newest", "oldest", "priority"]).optional(),
});
