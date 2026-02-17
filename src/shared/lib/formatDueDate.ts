export function formatDueDate(dueDate?: string) {
  if (!dueDate) return "";
  const [year, month, day] = dueDate.split("-");
  if (!year || !month || !day) return dueDate;
  return `${day}-${month}-${year}`;
}
