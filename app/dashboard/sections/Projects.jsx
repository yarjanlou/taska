import { Stack, Typography } from "@mui/material";
import ProjectBox from "./ProjectBox";
import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "@/lib/services/projects";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { useEffect } from "react";

export default function Projects() {
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const { data: projects = [], isSuccess } = useQuery({
    queryKey: ["projects"],
    queryFn: getUserProjects,
  });

  useEffect(() => {
    if (isSuccess && projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [isSuccess, projects, selectedProject, setSelectedProject]);

  return (
    <div className="">
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontSize: "15px", px: "2px" }}>
          Projects
        </Typography>
        {projects?.map((project) => (
          <ProjectBox key={project.id} title={project.title} id={project.id} />
        ))}
      </Stack>
    </div>
  );
}
