"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProjectDialog from "./NewProjecDialog";
import { useState } from "react";

export default function NewProject() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        fullWidth
        startIcon={<AddIcon sx={{ fontSize: "16px" }} />}
        sx={{
          borderStyle: "dashed",
          fontSize: "13px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mt-0.5 inline-block">Add Project</span>
      </Button>
      <NewProjectDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
