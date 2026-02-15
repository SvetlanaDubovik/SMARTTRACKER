import { Stack } from "@mui/material";
import type { Task } from "../../shared/types/task";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TasksList({ tasks, onToggle, onEdit, onDelete }: Props) {
  return (
    <Stack spacing={1.5}>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Stack>
  );
}
