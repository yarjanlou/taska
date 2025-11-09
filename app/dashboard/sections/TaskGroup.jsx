import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";

export default function TaskGroup({ title, color, tasks, status }) {
  return (
    <div className="flex-1">
      <Stack direction="row" spacing={0.75} alignItems="center" mb={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        <Typography sx={{ fontSize: "14px", fontWeight: "500" }} variant="h6">
          {title}
        </Typography>
      </Stack>
      <NewTask status={status} />
      <Stack spacing={1}>
        {tasks?.map((task) => (
          <TaskCard key={task.title} {...task} />
        ))}
      </Stack>
    </div>
  );
}
