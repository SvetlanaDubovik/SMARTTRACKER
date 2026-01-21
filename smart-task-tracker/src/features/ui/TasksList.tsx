import { TaskItem } from "./TaskItem";
import { selectVisibleTasks, useTasksStore } from "../tasks/model/tasks.store";

export function TasksList() {
  const tasks = useTasksStore((s) => selectVisibleTasks(s));

  if (tasks.length === 0) {
    return <p>Пока нет задач. Добавь первую 👇</p>;
  }

  return (
    <ul style={{ display: "grid", gap: 8, padding: 0, listStyle: "none" }}>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
