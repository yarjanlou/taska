import { FaBars } from "react-icons/fa6";
import MobileSidebar from "../sidebar/MobileSidebar";
import { useMobileSidebar } from "@/context/MobileSidebarContext";

export default function HamburgerButton() {
  const { open, toggle, close } = useMobileSidebar();
  return (
    <>
      <button onClick={toggle}>
        <FaBars className="stroke-2" />
      </button>
      <MobileSidebar open={open} onClose={close} />
    </>
  );
}
