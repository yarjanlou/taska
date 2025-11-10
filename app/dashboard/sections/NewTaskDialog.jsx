"use client";

import ImageInput from "@/components/ui/ImageInput";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { createTask } from "@/lib/services/tasks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function NewTaskDialog({ open, onClose, status }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { selectedProject } = useSelectedProject();
  const queryClient = useQueryClient();

  const close = () => {
    onClose();
    setTitle("");
    setDescription("");
    setImages([]);
    setError(null);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ["tasks", selectedProject] });
    },
  });

  // validation
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "title is required.";
    if (!description.trim()) newErrors.description = "description is required.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ title, description, images, selectedProject, status });
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
        Add New Task
      </DialogTitle>
      <DialogContentText sx={{ px: "20px", fontSize: "14px", color: "#555" }}>
        To create a new task, please enter the title and description below. You
        can also attach an optional image.
      </DialogContentText>
      <DialogContent sx={{ px: "20px", pb: "10px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            size="small"
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { sx: { fontSize: "14px" } },
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!error?.title}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "15px",
              },
            }}
          />
          <TextField
            required
            size="small"
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            slotProps={{
              inputLabel: { sx: { fontSize: "14px" } },
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!error?.description}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "15px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              },
            }}
          />
          <ImageInput
            imageFile={images}
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
          <div className="mt-8 flex w-full items-center justify-end gap-2 pb-2.5">
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                px: "20px",
                py: "5px",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || selectedProject == null}
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
