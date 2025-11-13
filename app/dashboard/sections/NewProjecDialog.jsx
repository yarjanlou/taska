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
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const close = () => {
    onClose();
    setError(null);
    setTitle("");
    setSelectedAvatar(avatars[0].id);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      close();
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Project title is required.");
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
          fontSize: "18px",
          fontWeight: "500",
          pb: "8px",
          pt: "30px",
          px: "32px",
        }}
        className="text-neutral-600"
      >
        New Project
      </DialogTitle>
      <DialogContentText
        sx={{ px: "32px", fontSize: "14px" }}
        className="text-neutral-400"
      >
        To create a new project, please enter the project title below.
      </DialogContentText>
      <DialogContent sx={{ pt: "5px", px: "30px", pb: "26px" }}>
        <form onSubmit={handlesubmit}>
          <TextField
            autoFocus
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
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "15px",
                color: "#525252",
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
          <div className="mt-4 flex flex-col gap-2">
            <Typography sx={{ fontSize: "14px" }} className="text-neutral-600">
              Choose Avatar:
            </Typography>
            <div className="flex gap-2">
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
          <div className="mt-6 flex w-full items-center justify-end gap-2">
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                px: "20px",
                py: "5px",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                borderRadius: "6px",
              }}
            >
              cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              sx={{
                width: "140px",
                py: "6px",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                borderRadius: "6px",
                ":hover": {
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
