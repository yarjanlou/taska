import HamburgerButton from "./HamburgerButton";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { Typography } from "@mui/material";
import UserInfo from "@/components/ui/UserInfo";

export default function Header() {

  const { selectedProject } = useSelectedProject();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex size-full items-center px-6 md:px-10 lg:justify-end lg:px-12">
        <div className="hidden lg:block">
          <UserInfo />
        </div>
        <div className="flex gap-4 lg:hidden">
          <HamburgerButton />
          <Typography sx={{ textTransform: "capitalize", fontWeight: "500" }}>
            {selectedProject?.title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
