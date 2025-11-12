import ProgressBar from "@/components/ui/ProgressBar";
import { Avatar, Stack, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
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
    <Stack spacing={1.5} className="mb-12">
      <Typography
        variant="h6"
        sx={{ fontSize: "15px", px: "2px", textTransform: "capitalize" }}
      >
        {projects.find((p) => p.id === selectedProject)?.title}
      </Typography>
      <div className="flex items-center gap-3">
        <Avatar
          sx={{
            bgcolor: "#e1e9ff",
            color: "#616060",
            width: "32px",
            height: "100%",
            borderRadius: "8px",
          }}
          variant="rounded"
        >
          <BusinessIcon
            sx={{
              width: "18px",
              height: "20px",
            }}
          />
        </Avatar>
        <div className="flex w-full flex-col gap-1.5 py-0.5">
          <span className="text-[11px] font-medium text-neutral-500">
            {progress}% complete
          </span>
          <ProgressBar value={progress} variant="determinate" />
        </div>
      </div>
    </Stack>
  );
}
