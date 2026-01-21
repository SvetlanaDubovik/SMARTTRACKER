import type { Task } from "../../shared/types/task";
import { useTasksStore } from "../tasks/model/tasks.store";

type Props = { task: Task };

export function TaskItem({ task }: Props) {
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const deleteTask = useTasksStore((s) => s.deleteTask);
  const editTitle = useTasksStore((s) => s.editTitle);

  return (
    <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleDone(task.id)}
        aria-label="toggle done"
      />

      <span style={{ textDecoration: task.done ? "line-through" : "none", flex: 1 }}>
        {task.title} <small>({task.priority})</small>
      </span>

      <button
        onClick={() => {
          const next = prompt("New title:", task.title);
          if (next != null) editTitle(task.id, next);
        }}
      >
        Edit
      </button>

      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
