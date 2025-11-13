import ProgressBar from "@/components/ui/ProgressBar";
import { Avatar, Stack, Typography } from "@mui/material";
import { GiProgression } from "react-icons/gi";
import { useTasks } from "@/context/TasksContext";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { useProjects } from "@/context/ProjectsContext";

export default function ProgressInfo() {
  const { selectedProject } = useSelectedProject();
  const { tasks } = useTasks();
  const { projects } = useProjects();

  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;

    const doneTasks = tasks.filter((task) => task.status === "DONE").length;
    return Math.round((doneTasks / tasks.length) * 100);
  };

  const progress = calculateProgress(tasks);

  return (
    <Stack spacing={1.5} className="mb-12 select-none">
      <Typography
        variant="h6"
        sx={{ fontSize: "16px", fontWeight: "600", px: "2px" }}
        className="text-neutral-700"
      >
        {projects.find((p) => p.id === selectedProject)?.title}
      </Typography>
      <div className="flex items-center gap-3">
        <Avatar
          sx={{
            bgcolor: "#e1e9ff",
            color: "#616060",
            width: "36px",
            height: "100%",
            borderRadius: "8px",
          }}
          variant="rounded"
        >
          <GiProgression className="size-4 text-gray-500" />
        </Avatar>
        <div className="flex w-full flex-col gap-2 py-0.5">
          <span className="text-xs font-medium text-neutral-500">
            {progress}% complete
          </span>
          <ProgressBar value={progress} variant="determinate" />
        </div>
      </div>
    </Stack>
  );
}
