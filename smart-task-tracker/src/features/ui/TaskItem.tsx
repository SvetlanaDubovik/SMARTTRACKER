import { Box, Button, Card, CardContent, Checkbox, Chip, Stack, Typography } from "@mui/material";
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

export function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const formattedDueDate = formatDueDate(task.dueDate);

  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent sx={{ "&:last-child": { pb: "19px" } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr) 88px 110px auto",
            columnGap: "5px",
            alignItems: "center",
          }}
        >
          <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />

          <Typography
            fontWeight={600}
            sx={{
              minWidth: 0,
              textDecoration: task.done ? "line-through" : "none",
              opacity: task.done ? 0.6 : 1,
            }}
          >
            {task.title}
          </Typography>

          <Box sx={{ justifySelf: "start" }}>
            <Chip size="small" sx={{ borderRadius: 1 }} {...priorityChip(task.priority)} />
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: "nowrap" }}
          >
            {formattedDueDate ? `до ${formattedDueDate}` : ""}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<EditOutlined />}
              sx={{ borderRadius: 1, textTransform: "none" }}
              onClick={() => onEdit(task.id)}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutline />}
              sx={{ borderRadius: 1, textTransform: "none" }}
              onClick={() => onDelete(task.id)}
            >
              Удалить
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
