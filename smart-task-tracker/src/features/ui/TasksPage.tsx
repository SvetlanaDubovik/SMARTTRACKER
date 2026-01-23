import { useState } from "react";
import { useTasksStore } from "../tasks/model/tasks.store";
import { TasksList } from "./TasksList";
import { TasksToolbar } from "./TasksToolbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

export function TasksPage() {
  const addTask = useTasksStore((s) => s.addTask);
  const [title, setTitle] = useState("");

  

  return (
    // <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
    //   <h1>Smart Task Tracker</h1>

    //   <TasksToolbar />

    //   <div style={{ display: "flex", gap: 8 }}>
    //     <input
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       placeholder="New task title…"
    //     />
    //     <button
    //       onClick={() => {
    //         addTask(title);
    //         setTitle("");
    //       }}
    //     >
    //       Add
    //     </button>
    //   </div>

    //   <TasksList />
    // </div>

       <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
      <Container maxWidth="md">
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Smart Task Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Keep tasks clear and manageable
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <CardContent>
               <TasksToolbar />
              {/* <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                <TextField
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  label="Search"
                  placeholder="Search tasks…"
                  size="small"
                  fullWidth
                />

                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Filter</InputLabel>
                  <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value as Filter)}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Sort</InputLabel>
                  <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value as Sort)}>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                  {visible.length} tasks
                </Typography>

                <Box sx={{ flex: 1 }} />

                <Button variant="contained" onClick={() => alert("Open modal")} sx={{ borderRadius: 3 }}>
                  + Add task
                </Button>
              </Stack> */}
            </CardContent>
          </Card>
        </Stack>

        {/* <Stack spacing={1.5}>
          {visible.length === 0 ? (
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <Typography fontWeight={600}>No tasks yet</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Create your first task to get started.
                </Typography>
                <Button variant="contained" sx={{ mt: 2, borderRadius: 3 }} onClick={() => alert("Open modal")}>
                  + Add task
                </Button>
              </CardContent>
            </Card>
          ) : (
            visible.map((t) => (
              <Card key={t.id} variant="outlined" sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Checkbox
                      checked={t.done}
                      onChange={() =>
                        setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                      }
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography
                          fontWeight={600}
                          sx={{ textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.6 : 1 }}
                        >
                          {t.title}
                        </Typography>
                        <Chip size="small" {...priorityChip(t.priority)} />
                        {t.dueDate ? (
                          <Typography variant="caption" color="text.secondary">
                            due {t.dueDate}
                          </Typography>
                        ) : null}
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        startIcon={<EditOutlined />}
                        sx={{ borderRadius: 3 }}
                        onClick={() => {
                          const next = prompt("New title:", t.title);
                          if (!next) return;
                          setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, title: next } : x)));
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteOutline />}
                        sx={{ borderRadius: 3 }}
                        onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )} */}
        {/* </Stack> */}
      </Container>
    </Box>

  );
}
