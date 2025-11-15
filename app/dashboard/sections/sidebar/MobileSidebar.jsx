import { Drawer } from "@mui/material";
import ProjectsContainer from "./ProjectsContainer";
import UserInfo from "@/components/ui/UserInfo";
import NewProject from "./NewProject";
import { IoClose } from "react-icons/io5";
import ProgressInfo from "./ProgressInfo";

export default function MobileSidebar({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex h-full w-[250px] flex-col py-4 pr-6 pl-4">
        <div className="mb-5 flex items-center justify-between">
          <UserInfo />
          <IoClose onClick={onClose} className="mt-[1.5px]" />
        </div>
        <ProjectsContainer />
        <div className="flex-1"></div>
        <NewProject />
      </div>
    </Drawer>
  );
}
