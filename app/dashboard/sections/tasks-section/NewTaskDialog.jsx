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
          fontSize: "18px",
          fontWeight: "600",
          pb: "8px",
          pt: "30px",
          px: "32px",
        }}
        className="text-neutral-600"
      >
        New Task
      </DialogTitle>
      <DialogContentText
        sx={{ px: "32px", fontSize: "13px" }}
        className="text-neutral-300"
      >
        Enter a title and description to create a new task. You can also add an
        optional image or deadline.
      </DialogContentText>
      <DialogContent sx={{ px: "30px", pb: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              size="small"
              margin="dense"
              label="Task Title*"
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                  "&:hover fieldset": {
                    borderColor: "#365dff",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "1px",
                  },
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
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
              }}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || selectedProject == null}
              variant="contained"
              sx={{
                width: "140px",
                py: "6px",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ":hover": {
                  backgroundColor: "#2e50e6e7",
                },
                borderRadius: "6px",
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
