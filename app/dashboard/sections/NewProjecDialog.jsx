import { createProject } from "@/lib/services/projects";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function NewProjectDialog({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  close = () => {
    onClose();
    setError(null);
    setTitle("");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      close();
      setTitle("");
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }
    mutate({ title });
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          pb: "6px",
          pt: "20px",
          px: "20px",
        }}
      >
        Add New Project
      </DialogTitle>
      <DialogContentText sx={{ px: "20px", fontSize: "14px", color: "#555" }}>
        To create a new project, please enter the project title below. This will
        help you organize and manage your projects effectively.
      </DialogContentText>
      <DialogContent sx={{ pt: "5px" }}>
        <form>
          <TextField
            autoFocus
            required
            size="small"
            margin="dense"
            label="Project Title"
            type="text"
            fullWidth
            variant="standard"
            slotProps={{
              inputLabel: { sx: { fontSize: "14px" } },
            }}
            error={!!error}
            // helperText={error}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ px: "20px", pb: "20px" }}>
        <Button
          variant="outlined"
          onClick={close}
          sx={{ px: "20px", py: "5px", fontSize: "13px", fontWeight: "600" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handlesubmit}
          disabled={isPending}
          variant="contained"
          sx={{
            width: "140px",
            py: "6px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
