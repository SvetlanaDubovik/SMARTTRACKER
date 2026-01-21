import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../shared/lib/debounce";
import { useTasksStore } from "../tasks/model/tasks.store";

export function TasksToolbar() {
  const filter = useTasksStore((s) => s.filter);
  const sort = useTasksStore((s) => s.sort);
  const setFilter = useTasksStore((s) => s.setFilter);
  const setSort = useTasksStore((s) => s.setSort);
  const setSearch = useTasksStore((s) => s.setSearch);

  const [localQuery, setLocalQuery] = useState("");

  const debounced = useMemo(() => debounce(setSearch, 350), [setSearch]);

  useEffect(() => {
    debounced(localQuery);
  }, [localQuery, debounced]);

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search…"
      />

      <label>
        Filter:{" "}
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="done">done</option>
        </select>
      </label>

      <label>
        Sort:{" "}
        <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="priority">priority</option>
        </select>
      </label>
    </div>
  );
}
