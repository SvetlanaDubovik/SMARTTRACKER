import { Button, Card, CardContent, Typography } from "@mui/material";

type Props = {
  onAdd: () => void;
};

export function TasksEmpty({ onAdd }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent sx={{ textAlign: "center", py: 6 }}>
        <Typography fontWeight={600}>Пока нет задач</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, width: "fit-content", mx: "auto", textAlign: "center" }}
        >
          Создайте первую задачу, чтобы начать.
        </Typography>
        <Button variant="contained" sx={{ mt: 2, borderRadius: 1, textTransform: "none" }} onClick={onAdd}>
          + Добавить
        </Button>
      </CardContent>
    </Card>
  );
}
