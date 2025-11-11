import ProjectBox from "./ProjectBox";
import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "@/lib/services/projects";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import { Stack, Typography } from "@mui/material";

export default function Projects() {
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const {
    data: projects = [],
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getUserProjects,
  });

  useEffect(() => {
    if (isSuccess && projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [isSuccess, projects, selectedProject, setSelectedProject]);

  if (isLoading) {
    return (
      <div className="px-2 py-1.5">
        <Loading alinment="start" size="size-[8px]" />
      </div>
    );
  }

  if (projects.length === 0 && !isLoading) {
    return (
      <Typography
        variant="body2"
        sx={{ fontSize: "13px", px: "2px", py: "6px", color: "text.secondary" }}
      >
        No projects available.
      </Typography>
    );
  }

  return (
    <Stack spacing={1}>
      {projects.map((project) => (
        <ProjectBox
          key={project.id}
          project={project}
          isSelected={selectedProject === project.id}
          setSelectedProject={setSelectedProject}
        />
      ))}
    </Stack>
  );
}
