import { Box, Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTasksStore, selectVisibleTasks } from "../tasks/model/tasks.store";
import { TasksToolbar } from "./TasksToolbar";
import { TasksList } from "./TasksList";
import { TasksEmpty } from "./TasksEmpty";
import { TaskFormDialog } from "./TaskFormDialog";

export function TasksPage() {
  // ui state
  const filter = useTasksStore((s) => s.filter);
  const sort = useTasksStore((s) => s.sort);
  const query = useTasksStore((s) => s.query);

  const setFilter = useTasksStore((s) => s.setFilter);
  const setSort = useTasksStore((s) => s.setSort);
  const setQuery = useTasksStore((s) => s.setQuery);

  // dialog
  const dialogOpen = useTasksStore((s) => s.dialogOpen);
  const editingId = useTasksStore((s) => s.editingId);
  const openCreate = useTasksStore((s) => s.openCreate);
  const openEdit = useTasksStore((s) => s.openEdit);
  const closeDialog = useTasksStore((s) => s.closeDialog);
  const submitTask = useTasksStore((s) => s.submitTask);

  // tasks actions
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  // data
  const tasks = useTasksStore((s) => s.tasks);
  const visible = useMemo(() => selectVisibleTasks({ tasks, filter, sort, query }), [tasks, filter, sort, query]);

  const editingTask = tasks.find((t) => t.id === editingId) ?? null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight={600}>
            Smart Task Tracker
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep tasks clear and manageable
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TasksToolbar
            filter={filter}
            sort={sort}
            query={query}
            total={visible.length}
            onChangeFilter={setFilter}
            onChangeSort={setSort}
            onChangeQuery={setQuery}
            onAdd={openCreate}
          />
        </Box>

        {visible.length === 0 ? (
          <TasksEmpty onAdd={openCreate} />
        ) : (
          <TasksList tasks={visible} onToggle={toggleDone} onEdit={openEdit} onDelete={deleteTask} />
        )}

        <TaskFormDialog
          key={`${editingId ?? "create"}-${dialogOpen ? "open" : "closed"}`}
          open={dialogOpen}
          initialValues={
            editingTask
              ? { title: editingTask.title, priority: editingTask.priority, dueDate: editingTask.dueDate }
              : undefined
          }
          onClose={closeDialog}
          onSubmit={(values) => {
            submitTask(values);
            closeDialog();
          }}
        />
      </Container>
    </Box>
  );
}
