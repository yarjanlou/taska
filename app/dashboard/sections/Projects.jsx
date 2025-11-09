import { Stack, Typography } from "@mui/material";
import ProjectBox from "./ProjectBox";

export default function Projects() {
  return (
    <div className="">
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontSize: "15px" , px: "2px" }}>
          Projects
        </Typography>
        <ProjectBox title="Project 1" />
        <ProjectBox title="Project 2" />
        <ProjectBox title="Project 3" />
      </Stack>
    </div>
  );
}
