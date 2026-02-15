import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { TaskFormValues, TaskPriority } from "../../shared/types/task";

type Props = {
  open: boolean;
  initialValues?: TaskFormValues;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
};

export function TaskFormDialog({ open, initialValues, onClose, onSubmit }: Props) {
    const [title, setTitle] = useState(initialValues?.title ?? "");
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority ?? "medium");
  const [dueDate, setDueDate] = useState<string>(initialValues?.dueDate ?? "");

const handleSubmit = () => {
  if (!title.trim()) return;

  onSubmit({
    title: title.trim(),
    priority,
    dueDate: dueDate || undefined,
  });
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialValues ? "Edit Task" : "Create Task"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value as TaskPriority)}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Due date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ textTransform: "none" }}>
          {initialValues ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
