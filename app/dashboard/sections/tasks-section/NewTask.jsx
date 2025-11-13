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
        disabled={selectedProject == null}
        variant="contained"
        fullWidth
        startIcon={<AddIcon sx={{ fontSize: "16px" }} />}
        sx={{
          bgcolor: "#fff",
          color: "#365dff",
          fontSize: "13px",
          fontWeight: "600",
          py: "9px",
          border: "1px solid #e5e7eb",
          boxShadow: "none",
          borderRadius: "6px",
          mb: 2,
          "&:hover": {
            bgcolor: "#cad4fb2b",
            boxShadow: "none",
          },
        }}
      >
        <span className="mt-0.5 inline-block">Add New Task</span>
      </Button>
      <NewTaskDialog
        open={open}
        onClose={() => setOpen(false)}
        status={status}
      />
    </>
  );
}
