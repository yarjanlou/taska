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
    <div className="flex min-h-0 max-w-1/3 flex-1 flex-col">
      <Stack
        direction="row"
        spacing={0.75}
        alignItems="center"
        mb={{ xs: 1.5, md: 2 }}
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
          sx={{ fontSize: { xs: "13px", md: "14px" }, fontWeight: "600" }}
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
              fontSize: { xs: "11px", md: "12px" },
              fontWeight: "500",
              width: "20px",
              height: "20px",
              minWidth: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "none",
              position: "static",
              p: 0,
            },
          }}
        >
          <Box sx={{ width: 0, height: 0, mr: 1 }} />
        </Badge>
      </Stack>
      <NewTask status={status} />
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="py-2">
            <Loading />
          </div>
        ) : (
          <Stack ref={setNodeRef} spacing={1}>
            {tasks?.map((task) =>
              activeTask?.id === task.id ? null : (
                <TaskCard key={task.id} {...task} />
              ),
            )}
          </Stack>
        )}
      </div>
    </div>
  );
}
