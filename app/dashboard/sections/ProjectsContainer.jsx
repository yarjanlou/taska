import { Stack, Typography } from "@mui/material";
import Projects from "./Projects";

export default function ProjectsContainer() {
  return (
    <div>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontSize: "15px", px: "2px" }}>
          Projects
        </Typography>
        <Projects />
      </Stack>
    </div>
  );
}
