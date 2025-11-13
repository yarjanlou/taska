import { createContext, useContext, useState } from "react";

const MobileSidebarContext = createContext();

export default function MobileSidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <MobileSidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export const useMobileSidebar = () => useContext(MobileSidebarContext);
