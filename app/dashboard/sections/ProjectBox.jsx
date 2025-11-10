import { Avatar, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export default function ProjectBox({ project: { title, id }, isSelected }) {
  return (
    <Box
      className={`flex cursor-pointer items-center gap-2.5 rounded-md border border-gray-200 px-1.5 py-1 transition-all duration-200 ${isSelected ? "bg-primary/90" : "bg-white"}`}
      onClick={() => setSelectedProject(id)}
    >
      <Avatar
        sx={{
          bgcolor: isSelected ? "#fff" : "#e1e9ff",
          color: "#365dff",
          width: "24px",
          height: "24px",
          borderRadius: "8px",
        }}
        variant="rounded"
      >
        <LanguageIcon
          sx={{
            width: "14px",
            height: "14px",
          }}
        />
      </Avatar>
      <span
        className={`text-[13px] ${isSelected ? "font-semibold text-white" : "font-medium text-neutral-800"}`}
      >
        {title}
      </span>
    </Box>
  );
}
