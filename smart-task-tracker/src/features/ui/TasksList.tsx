import { useMemo } from "react";
import { TaskItem } from "./TaskItem";
import { selectVisibleTasks, useTasksStore } from "../tasks/model/tasks.store";

export function TasksList() {
  const tasks = useTasksStore((s) => s.tasks);
  const filter = useTasksStore((s) => s.filter);
  const sort = useTasksStore((s) => s.sort);
  const search = useTasksStore((s) => s.search);

  const visibleTasks = useMemo(
    () => selectVisibleTasks({ tasks, filter, sort, search }),
    [tasks, filter, sort, search]
  );

  if (visibleTasks.length === 0) {
    return <p>Пока нет задач. Добавь первую 👇</p>;
  }

  return (
    <ul style={{ display: "grid", gap: 8, padding: 0, listStyle: "none" }}>
      {visibleTasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
