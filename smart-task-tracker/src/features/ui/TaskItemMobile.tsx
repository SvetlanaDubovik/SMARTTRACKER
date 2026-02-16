import { Box, Card, CardContent, Checkbox, Chip, IconButton, Stack, Typography } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import type { Task } from "../../shared/types/task";
import { priorityChip } from "../../shared/lib/priorityChip";
import { formatDueDate } from "../../shared/lib/formatDueDate";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItemMobile({ task, onToggle, onEdit, onDelete }: Props) {
  const formattedDueDate = formatDueDate(task.dueDate);

  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent sx={{ "&:last-child": { pb: "19px" } }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, width: "100%" }}>
            <Chip size="small" sx={{ borderRadius: 1, width: "fit-content" }} {...priorityChip(task.priority)} />
            <Box sx={{ flex: 1 }} />
            {formattedDueDate ? (
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                Срок: {formattedDueDate}
              </Typography>
            ) : null}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox checked={task.done} onChange={() => onToggle(task.id)} sx={{ p: 0 }} />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                fontWeight={600}
                role="button"
                tabIndex={0}
                onClick={() => onToggle(task.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(task.id);
                  }
                }}
                sx={{
                  minWidth: 0,
                  textDecoration: task.done ? "line-through" : "none",
                  opacity: task.done ? 0.6 : 1,
                  wordBreak: "break-word",
                  cursor: "pointer",
                }}
              >
                {task.title}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />

          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <IconButton
              size="small"
              sx={{ color: "primary.main" }}
              aria-label="Редактировать"
              onClick={() => onEdit(task.id)}
            >
              <EditOutlined />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "error.main" }}
              aria-label="Удалить"
              onClick={() => onDelete(task.id)}
            >
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
