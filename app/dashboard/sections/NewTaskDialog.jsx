"use client";

import DeadlineInput from "@/app/dashboard/sections/DeadlineInput";
import ImageInput from "@/components/ui/ImageInput";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { createTask } from "@/lib/services/tasks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function NewTaskDialog({ open, onClose, status }) {
  const initialForm = {
    title: "",
    description: "",
    images: [],
    deadline: null,
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const { selectedProject } = useSelectedProject();
  const queryClient = useQueryClient();

  // validation
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "title is required.";
    if (!form.description.trim())
      newErrors.description = "description is required.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ["tasks", selectedProject] });
    },
  });

  const close = () => {
    onClose();
    setForm(initialForm);
    setError(null);
  };

  // handlers
  const handleChange = (field) => (e) => {
    const value =
      field === "images" ? Array.from(e.target.files) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ ...form, status, selectedProject });
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
          <Stack spacing={2}>
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
              value={form.title}
              onChange={handleChange("title")}
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
              value={form.description}
              onChange={handleChange("description")}
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
            <DeadlineInput
              deadline={form.deadline}
              setDeadline={(date) =>
                setForm((prev) => ({ ...prev, deadline: date }))
              }
            />
            <ImageInput
              imageFile={form.images}
              onChange={handleChange("images")}
            />
          </Stack>
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
