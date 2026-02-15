import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import type { Filter, Sort } from "../../shared/types/task";

type Props = {
  filter: Filter;
  sort: Sort;
  query: string;
  total: number;
  onChangeFilter: (v: Filter) => void;
  onChangeSort: (v: Sort) => void;
  onChangeQuery: (v: string) => void;
  onAdd: () => void;
};

export function TasksToolbar({
  filter,
  sort,
  query,
  total,
  onChangeFilter,
  onChangeSort,
  onChangeQuery,
  onAdd,
}: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
          <TextField
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            label="Поиск"
            placeholder="Поиск задач…"
            size="small"
            fullWidth
            sx={{ maxWidth: { md: 260 } }}
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Фильтр</InputLabel>
            <Select value={filter} label="Фильтр" onChange={(e) => onChangeFilter(e.target.value as Filter)}>
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="done">Выполненные</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Сортировка</InputLabel>
            <Select value={sort} label="Сортировка" onChange={(e) => onChangeSort(e.target.value as Sort)}>
              <MenuItem value="newest">Сначала новые</MenuItem>
              <MenuItem value="oldest">Сначала старые</MenuItem>
              <MenuItem value="priority">По приоритету</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
            {total} задач
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Button variant="contained" onClick={onAdd} sx={{ borderRadius: 1, ml: 0, textTransform: "none" }}>
            + Добавить задачу
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
