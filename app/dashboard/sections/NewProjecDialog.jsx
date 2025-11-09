import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function NewProjectDialog({ open, onClose }) {
  const [title, setTitle] = useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
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
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            autoFocus
            required
            size="small"
            margin="dense"
            name="projectTitle"
            label="Project Title"
            type="text"
            fullWidth
            variant="standard"
            slotProps={{
              inputLabel: { sx: { fontSize: "14px" } },
            }}
            // className="placeholder:text-xs!"
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ px: "20px", pb: "20px" }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ px: "20px", py: "5px", fontSize: "13px", fontWeight: "600" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {}}
          sx={{ px: "20px", py: "6px", fontSize: "13px", fontWeight: "600" }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
