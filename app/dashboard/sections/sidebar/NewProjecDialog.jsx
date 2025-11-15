import { useSelectedProject } from "@/context/SelectedProjectContext";
import { avatars } from "@/lib/constants/avatars";
import { createProject } from "@/lib/services/projects";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function NewProjectDialog({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const [error, setError] = useState(false);
  const { setSelectedProject } = useSelectedProject();
  const queryClient = useQueryClient();

  const close = () => {
    onClose();
    setError(false);
    setTitle("");
    setSelectedAvatar(avatars[0].id);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      setSelectedProject(newProject.id);
      close();
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }
    mutate({ title, avatar: selectedAvatar });
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
          fontWeight: { xs: "600", md: "500" },
          pb: "8px",
          pt: { xs: "20px", md: "26px" },
          px: { xs: "24px", md: "32px" },
        }}
        className="text-neutral-600"
      >
        New Project
      </DialogTitle>
      <DialogContentText
        sx={{
          px: { xs: "24px", md: "32px" },
          fontSize: { xs: "13px", md: "14px" },
        }}
        className="text-neutral-400"
      >
        To create a new project, please enter the project title below.
      </DialogContentText>
      <DialogContent
        sx={{ pt: "5px", px: { xs: "22px", md: "30px" }, pb: "26px" }}
      >
        <form onSubmit={handlesubmit}>
          <TextField
            autoComplete="false"
            size="small"
            margin="dense"
            label="Project Title*"
            fullWidth
            variant="outlined"
            slotProps={{
              inputLabel: { sx: { fontSize: "14px" } },
            }}
            error={!!error}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "15px",
                color: "#525252",
              },
            }}
          />
          <div className="mt-4 flex flex-col gap-2">
            <Typography sx={{ fontSize: "14px" }} className="text-neutral-600">
              Choose Avatar:
            </Typography>
            <div className="flex justify-between gap-2 sm:justify-start">
              {avatars.map((a) => {
                const Icon = a.icon;
                const isSelected = selectedAvatar === a.id;
                return (
                  <Avatar
                    key={a.id}
                    onClick={() => setSelectedAvatar(a.id)}
                    sx={{
                      borderRadius: "10px",
                      cursor: "pointer",
                      bgcolor: isSelected ? a.color : `${a.color}20`,
                      color: isSelected ? "#fff" : a.color,
                      width: 44,
                      height: 44,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: isSelected
                          ? `0 0 0 2px ${a.color}30`
                          : "none",
                      },
                    }}
                    className={`${isSelected ? "" : ""}`}
                  >
                    <Icon size={18} className="stroke-2" />
                  </Avatar>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex w-full items-center justify-end gap-2 pb-1 md:mt-8 md:pb-2">
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                px: "20px",
                py: "5px",
                width: { xs: "40%", md: "auto" },
                fontSize: { xs: "13px", md: "14px" },
              }}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              sx={{
                width: { xs: "60%", md: "140px" },
                py: "6px",
                fontSize: { xs: "13px", md: "14px" },
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
