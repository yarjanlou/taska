import { Avatar, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export default function ProjectBox({ title }) {
  return (
    <Box className="flex items-center gap-2.5 border border-gray-200 px-1.5 py-1 rounded-md">
      <Avatar
        sx={{
          bgcolor: "#365dff1a",
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
      <span className="text-[13px] font-medium">{title}</span>
    </Box>
  );
}
