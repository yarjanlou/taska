import { createContext, useContext, useState } from "react";

const SelectedProjectContext = createContext();

export function SelectedProjectProvider({ children }) {
  const [selectedProject, setSelectedProject] = useState({});

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
}

export function useSelectedProject() {
  return useContext(SelectedProjectContext);
}
