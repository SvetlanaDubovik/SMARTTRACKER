import { useState } from "react";
import { useTasksStore } from "../tasks/model/tasks.store";
import { TasksList } from "./TasksList";
import { TasksToolbar } from "./TasksToolbar";

export function TasksPage() {
  const addTask = useTasksStore((s) => s.addTask);
  const [title, setTitle] = useState("");

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <h1>Smart Task Tracker</h1>

      <TasksToolbar />

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title…"
        />
        <button
          onClick={() => {
            addTask(title);
            setTitle("");
          }}
        >
          Add
        </button>
      </div>

      <TasksList />
    </div>
  );
}
