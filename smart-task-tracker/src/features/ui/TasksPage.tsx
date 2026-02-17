import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useTasksStore, selectVisibleTasks } from "../tasks/model/tasks.store";
import { TasksToolbar } from "./TasksToolbar";
import { TasksToolbarMobile } from "./TasksToolbarMobile";
import { TasksList } from "./TasksList";
import { TasksEmpty } from "./TasksEmpty";
import { TaskFormDialog } from "./TaskFormDialog";

export function TasksPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box sx={{ minHeight: visible.length !== 0 ? "100vh" : "100%", bgcolor: "grey.50", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ position: visible.length !== 0 ? "sticky" : "relative", top: 8, zIndex: 10, bgcolor: "grey.50", pb: 1, mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ fontSize: { xs: "1.6rem", sm: "2.125rem" }, whiteSpace: "nowrap" }}
            >
              Умный трекер задач
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Держите задачи в порядке и под контролем
            </Typography>
          </Box>

          {isMobile ? (
            <TasksToolbarMobile
              filter={filter}
              sort={sort}
              query={query}
              onChangeFilter={setFilter}
              onChangeSort={setSort}
              onChangeQuery={setQuery}
            />
          ) : (
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
          )}
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
        {isMobile && visible.length !== 0 ? (
        <Box
          sx={{
            position: "fixed",
            left: "0",
            bottom: 0,
            height: 20,
            zIndex: 20,
            width: "100vw",
            background: "#fff"
          }}
        >
          <Box
          sx={{
            position: "fixed",
            left: "50%",
            bottom: 20,
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "calc(100vw - 80px)",
            maxWidth: 720,
          }}
        >
          <Button
            variant="contained"
            onClick={openCreate}
            sx={{ width: "100%", borderRadius: 3, px: 4, py: 1.5, textTransform: "none", boxShadow: 3 }}
          >
            + Добавить
          </Button>
        </Box>
        </Box>
      ) : null}
      </Container>
    </Box>
  );
}
