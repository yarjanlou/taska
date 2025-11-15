"use client";

import DeadlineInput from "@/app/dashboard/sections/tasks-section/DeadlineInput";
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
      queryClient.invalidateQueries({
        queryKey: ["tasks", selectedProject.id],
      });
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
    if (field in error) setError((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutate({ ...form, status, selectedProject: selectedProject.id });
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: { xs: "16px", md: "18px" },
          fontWeight: "600",
          pb: "8px",
          pt: { xs: "20px", md: "30px" },
          px: { xs: "22px", md: "32px" },
        }}
        className="text-neutral-600"
      >
        New Task
      </DialogTitle>
      <DialogContentText
        sx={{ px: { xs: "22px", md: "32px" }, fontSize: "13px" }}
        className="text-neutral-300"
      >
        Enter a title and description to create a new task. You can also add an
        optional image or deadline.
      </DialogContentText>
      <DialogContent sx={{ px: { xs: "20px", md: "32px" }, pb: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={{ xs: 1.5, md: 2 }}>
            <TextField
              size="small"
              margin="dense"
              label="Task Title*"
              fullWidth
              variant="outlined"
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
              size="small"
              margin="dense"
              label="Description*"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
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
          <div className="mt-8 flex w-full items-center justify-center gap-2 pb-2 sm:justify-end md:pb-2.5">
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                px: "20px",
                py: "5px",
                width: { xs: "40%", md: "auto" },
                fontSize: "14px",
              }}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || selectedProject == null}
              variant="contained"
              sx={{
                width: { xs: "60%", md: "140px" },
                py: "6px",
                fontSize: "14px",
                "&:not(:disabled):hover": {
                  backgroundColor: "#2e50e6e7",
                },
              }}
            >
              {isPending ? "creating..." : "create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
