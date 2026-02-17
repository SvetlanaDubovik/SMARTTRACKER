import { pgTable, uuid, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const taskPriority = pgEnum("task_priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  done: boolean("done").notNull().default(false),
  priority: taskPriority("priority").notNull().default("medium"),
  dueDate: timestamp("due_date", { withTimezone: false }),
  createdAt: timestamp("created_at", { withTimezone: false }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: false }).notNull().defaultNow(),
});
