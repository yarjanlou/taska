import { Stack, Typography } from "@mui/material";
import Projects from "./Projects";

export default function ProjectsContainer() {
  return (
    <div>
      <Stack spacing={1.5}>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: "600", px: "2px" }}
          className="text-neutral-700"
        >
          Projects
        </Typography>
        <Projects />
      </Stack>
    </div>
  );
}
