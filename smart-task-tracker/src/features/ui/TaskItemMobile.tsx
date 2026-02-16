import { Box, Button, Card, CardContent, Checkbox, Chip, Stack, Typography } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import type { Task } from "../../shared/types/task";
import { priorityChip } from "../../shared/lib/priorityChip";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItemMobile({ task, onToggle, onEdit, onDelete }: Props) {
  const formattedDueDate = task.dueDate
    ? (() => {
        const [year, month, day] = task.dueDate.split("-");
        return `${day}-${month}-${year}`;
      })()
    : "";

  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent sx={{ "&:last-child": { pb: "19px" } }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, width: "100%" }}>
            <Chip size="small" sx={{ borderRadius: 1, width: "fit-content" }} {...priorityChip(task.priority)} />
            <Box sx={{ flex: 1 }} />
            {formattedDueDate ? (
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                до {formattedDueDate}
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

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<EditOutlined />}
              sx={{ borderRadius: 1, textTransform: "none", flex: 1 }}
              onClick={() => onEdit(task.id)}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutline />}
              sx={{ borderRadius: 1, textTransform: "none", flex: 1 }}
              onClick={() => onDelete(task.id)}
            >
              Удалить
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
