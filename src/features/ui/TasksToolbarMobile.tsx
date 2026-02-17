import {
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Filter, Sort } from "../../shared/types/task";

type Props = {
  filter: Filter;
  sort: Sort;
  query: string;
  onChangeFilter: (v: Filter) => void;
  onChangeSort: (v: Sort) => void;
  onChangeQuery: (v: string) => void;
};

export function TasksToolbarMobile({
  filter,
  sort,
  query,
  onChangeFilter,
  onChangeSort,
  onChangeQuery,
}: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <TextField
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            label="Поиск"
            placeholder="Поиск задач…"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: query ? (
                <InputAdornment position="end">
                  <IconButton size="small" edge="end" aria-label="Очистить поиск" onClick={() => onChangeQuery("")}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <Stack direction="row" spacing={1}>
            <FormControl size="small" fullWidth>
              <InputLabel>Фильтр</InputLabel>
              <Select value={filter} label="Фильтр" onChange={(e) => onChangeFilter(e.target.value as Filter)}>
                <MenuItem value="all">Все</MenuItem>
                <MenuItem value="active">Активные</MenuItem>
                <MenuItem value="done">Выполненные</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Сортировка</InputLabel>
              <Select value={sort} label="Сортировка" onChange={(e) => onChangeSort(e.target.value as Sort)}>
                <MenuItem value="newest">Сначала новые</MenuItem>
                <MenuItem value="oldest">Сначала старые</MenuItem>
                <MenuItem value="priority">По приоритету</MenuItem>
                <MenuItem value="dueTo">По сроку</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
