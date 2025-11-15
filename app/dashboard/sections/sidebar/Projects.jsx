import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "@/lib/services/projects";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import { Stack, Typography } from "@mui/material";
import { useProjects } from "@/context/ProjectsContext";
import ProjectBox from "./ProjectBox";

export default function Projects() {
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const { setProjects } = useProjects();
  const {
    data: projects = [],
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getUserProjects,
  });

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );

  useEffect(() => {
    if (!isSuccess || sortedProjects.length === 0) return;

    if (!selectedProject) {
      setSelectedProject(sortedProjects[0].id);
    }

    setProjects(sortedProjects);
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="px-2 py-1.5">
        <Loading alinment="start" size="size-[8px]" />
      </div>
    );
  }

  if (sortedProjects.length === 0 && !isLoading) {
    return (
      <Typography
        variant="body2"
        sx={{
          fontSize: "13px",
          px: "2px",
          py: { xs: "0px", md: "6px" },
          color: "text.secondary",
        }}
      >
        No projects available.
      </Typography>
    );
  }

  return (
    <Stack spacing={1}>
      {sortedProjects.map((project) => (
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
