import { Box, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import Loading from "@/components/ui/Loading";
import { useDroppable } from "@dnd-kit/core";

export default function TaskGroup({
  title,
  color,
  tasks,
  activeTask,
  status,
  isLoading,
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="flex-1">
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
        {isLoading ? (
          <div className="py-2">
            <Loading />
          </div>
        ) : (
          tasks?.map((task) =>
            activeTask?.id === task.id ? null : (
              <TaskCard key={task.id} {...task} />
            ),
          )
        )}
      </Stack>
    </div>
  );
}
