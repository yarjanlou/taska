import { Stack, Typography } from "@mui/material";
import Projects from "./Projects";

export default function ProjectsContainer() {
  return (
    <div>
      <Stack spacing={{ xs: 1, md: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: { xs: "500", md: "600" },
            px: "2px",
          }}
          className="text-neutral-700"
        >
          Projects
        </Typography>
        <Projects />
      </Stack>
    </div>
  );
}
