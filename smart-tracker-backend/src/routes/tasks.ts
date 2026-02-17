import type { FastifyInstance } from "fastify";
import { and, desc, asc, eq, ilike } from "drizzle-orm";
import { db } from "../db/index";
import { tasks } from "../db/schema";
import { createTaskSchema, updateTaskSchema, listQuerySchema } from "../lib/validators";

function parseDateOrNull(s?: string | null) {
  if (s === null) return null;
  if (!s) return undefined;

  // Если придёт "YYYY-MM-DD", сделаем Date в локальном времени
  // Для простоты: new Date("2026-02-17") => UTC. Это ок для pet.
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

export async function tasksRoutes(app: FastifyInstance) {
  // GET /tasks?status=active&q=abc&sort=newest
  app.get("/tasks", async (req) => {
    const q = listQuerySchema.parse(req.query);
        console.log({q})

    const filters = [];
    if (q.status === "active") filters.push(eq(tasks.done, false));
    if (q.status === "done") filters.push(eq(tasks.done, true));
    if (q.q && q.q.trim()) filters.push(ilike(tasks.title, `%${q.q.trim()}%`));

    const where = filters.length ? and(...filters) : undefined;

    let orderBy = desc(tasks.createdAt);
    if (q.sort === "oldest") orderBy = asc(tasks.createdAt);
    if (q.sort === "priority") orderBy = asc(tasks.priority); // low->medium->high (если хочешь иначе — скажешь)

    const rows = await db.select().from(tasks).where(where).orderBy(orderBy);
    return rows;
  });

  // POST /tasks
  app.post("/tasks", async (req, reply) => {
    const body = createTaskSchema.parse(req.body);
    console.log({body})

    const now = new Date();
    const [row] = await db
      .insert(tasks)
      .values({
        title: body.title,
        priority: body.priority,
        dueDate: parseDateOrNull(body.dueDate) ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    reply.code(201);
    return row;
  });

  // PATCH /tasks/:id
  app.patch("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = updateTaskSchema.parse(req.body);

    const patch: any = { updatedAt: new Date() };
    if (body.title !== undefined) patch.title = body.title;
    if (body.done !== undefined) patch.done = body.done;
    if (body.priority !== undefined) patch.priority = body.priority;
    if (body.dueDate !== undefined) patch.dueDate = parseDateOrNull(body.dueDate) ?? null;

    const updated = await db.update(tasks).set(patch).where(eq(tasks.id, id)).returning();
    if (updated.length === 0) {
      reply.code(404);
      return { message: "Task not found" };
    }
    return updated[0];
  });

  // DELETE /tasks/:id
  app.delete("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const deleted = await db.delete(tasks).where(eq(tasks.id, id)).returning({ id: tasks.id });

    if (deleted.length === 0) {
      reply.code(404);
      return { message: "Task not found" };
    }

    reply.code(204);
    return null;
  });
}
