// src/api/tasks.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks(params: {
  status?: "all" | "active" | "done";
  sort?: "newest" | "oldest" | "priority";
  q?: string;
}) {
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.sort) qs.set("sort", params.sort);
  if (params.q) qs.set("q", params.q); // URLSearchParams сам encode-ит

  const res = await fetch(`${API_URL}/tasks?${qs.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
