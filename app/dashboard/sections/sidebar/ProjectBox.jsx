import { Avatar, Box } from "@mui/material";
import { avatars } from "@/lib/constants/avatars";
import { useMobileSidebar } from "@/context/MobileSidebarContext";

export default function ProjectBox({
  project: { title, id, avatar },
  isSelected,
  setSelectedProject,
}) {
  const avatarData = avatars.find((a) => a.id === avatar) || avatars[0];
  const Icon = avatarData.icon;
  const { close } = useMobileSidebar();

  return (
    <Box
      className={`flex cursor-pointer items-center gap-2.5 rounded-md border border-gray-200 px-1.5 py-1 transition-all duration-200 ${isSelected ? "bg-primary/90" : "bg-white"}`}
      onClick={() => {
        setSelectedProject(id);
        setTimeout(() => {
          close();
        }, 300);
      }}
    >
      <Avatar
        sx={{
          bgcolor: isSelected ? "#fff" : `${avatarData.color}22`,
          color: isSelected ? "#3B82F6" : avatarData.color,
          width: "24px",
          height: "24px",
          borderRadius: "8px",
        }}
        variant="rounded"
      >
        <Icon className="size-3.5" />
      </Avatar>
      <span
        className={`text-xs select-none md:text-[13px] ${isSelected ? "font-semibold text-white" : "font-medium text-neutral-800"}`}
      >
        {title}
      </span>
    </Box>
  );
}
