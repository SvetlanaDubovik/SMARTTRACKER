import { Stack, useMediaQuery, useTheme } from "@mui/material";
import type { Task } from "../../shared/types/task";
import { TaskItem } from "./TaskItem";
import { TaskItemMobile } from "./TaskItemMobile";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TasksList({ tasks, onToggle, onEdit, onDelete }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={1.5}>
      {tasks.map((t) => (
        isMobile ? (
          <TaskItemMobile key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ) : (
          <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        )
      ))}
    </Stack>
  );
}
