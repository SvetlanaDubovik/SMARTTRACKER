import { Button, Card, CardContent, Typography } from "@mui/material";

type Props = {
  onAdd: () => void;
};

export function TasksEmpty({ onAdd }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent sx={{ textAlign: "center", py: 6 }}>
        <Typography fontWeight={600}>No tasks yet</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Create your first task to get started.
        </Typography>
        <Button variant="contained" sx={{ mt: 2, borderRadius: 1, textTransform: "none" }} onClick={onAdd}>
          + Add task
        </Button>
      </CardContent>
    </Card>
  );
}
