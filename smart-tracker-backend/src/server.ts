import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { tasksRoutes } from "./routes/tasks";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get("/health", async () => ({ ok: true }));

await app.register(tasksRoutes);

const port = Number(process.env.PORT ?? 3001);
app.listen({ port, host: "0.0.0.0" });
