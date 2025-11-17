import { Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import NewTaskDialog from "./NewTaskDialog";

export default function NewTask({ status }) {
  const [open, setOpen] = useState(false);
  const { selectedProject } = useSelectedProject();
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={!Object.keys(selectedProject).length}
        variant="contained"
        fullWidth
        startIcon={
          <AddIcon
            sx={{
              width: { xs: "16px", md: "20px" },
              height: { xs: "16px", md: "20px" },
            }}
          />
        }
        sx={{
          bgcolor: "#fff",
          color: "#365dff",
          fontSize: { xs: "12px", md: "13px" },
          fontWeight: "600",
          py: "9px",
          border: "1px solid #e5e7eb",
          boxShadow: "none",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          mb: { xs: 1.5, md: 2 },
          "&:hover": {
            bgcolor: "#cad4fb2b",
            boxShadow: "none",
          },
          width: { xs: "240px", md: "100%" },
          flexShrink: "0",
        }}
        data-testid={`add-${status}-task-btn`}
      >
        <span className="mt-px inline-block md:mt-0.5">Add New Task</span>
      </Button>
      <NewTaskDialog
        open={open}
        onClose={() => setOpen(false)}
        status={status}
      />
    </>
  );
}
