import { useEffect, useMemo, useState } from "react";
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


import { debounce } from "../../shared/lib/debounce";
import { useTasksStore, selectVisibleTasks } from "../tasks/model/tasks.store";
import type { Filter, Sort } from "../../shared/types/task";

export function TasksToolbar() {
  const filter = useTasksStore((s) => s.filter);
  const sort = useTasksStore((s) => s.sort);
  const tasks = useTasksStore((s) => s.tasks);
  const search = useTasksStore((s) => s.search);
  const setFilter = useTasksStore((s) => s.setFilter);
  const setSort = useTasksStore((s) => s.setSort);
  const setSearch = useTasksStore((s) => s.setSearch);

  const visibleTasks = useMemo(
    () => selectVisibleTasks({ tasks, filter, sort, search }),
    [tasks, filter, sort, search]
  );

  const [localQuery, setLocalQuery] = useState("");

  const debounced = useMemo(
    () => debounce((q: string) => useTasksStore.getState().setSearch(q), 350),
    []
  );

  useEffect(() => {
    debounced(localQuery);
    return () => debounced.cancel();
  }, [localQuery, debounced]);

  return (
    // <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    //   <input
    //     value={localQuery}
    //     onChange={(e) => setLocalQuery(e.target.value)}
    //     placeholder="Search…"
    //   />

    //   <label>
    //     Filter:{" "}
    //     <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
    //       <option value="all">all</option>
    //       <option value="active">active</option>
    //       <option value="done">done</option>
    //     </select>
    //   </label>

    //   <label>
    //     Sort:{" "}
    //     <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
    //       <option value="newest">newest</option>
    //       <option value="oldest">oldest</option>
    //       <option value="priority">priority</option>
    //     </select>
    //   </label>
    // </div>
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1}
      alignItems={{ md: "center" }}
      justifyContent="space-between"
    >
                <TextField
                  value={localQuery}
                  // onChange={(e) => setQuery(e.target.value)}
                  onChange={(e) => setLocalQuery(e.target.value as string)}
                  label="Search"
                  placeholder="Search tasks…"
                  size="small"
                  fullWidth
                  sx={{ maxWidth: { md: 280 }, flexGrow: 1 }}
                />

                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Filter</InputLabel>
                  <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value as Filter)}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Sort</InputLabel>
                  <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value as Sort)}>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                  {visibleTasks.length} tasks
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />

                <Button
                  variant="contained"
                  onClick={() => alert("Open modal")}
                  sx={{ borderRadius: 3, alignSelf: { xs: "stretch", md: "auto" } }}
                >
                  + Add task
                </Button>
              </Stack> 
  );
}
