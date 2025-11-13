import { Badge, Box, Stack, Typography } from "@mui/material";

import Loading from "@/components/ui/Loading";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";

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
      <Stack
        direction="row"
        spacing={0.75}
        alignItems="center"
        mb={2}
        className="w-full select-none"
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        <Typography
          sx={{ fontSize: "14px", fontWeight: "600" }}
          className="text-neutral-700"
          variant="h6"
        >
          {title}
        </Typography>
        <Badge
          badgeContent={tasks?.length || "0"}
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: color,
              color: "white",
              fontSize: "13px",
              fontWeight: "500",
              minWidth: "18px",
              height: "18px",
              borderRadius: "9px",
              p: 0,
            },
          }}
        >
          <Box sx={{ width: 0, height: 0, mr: 1.5 }} />
        </Badge>
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
