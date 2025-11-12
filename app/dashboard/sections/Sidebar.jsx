import { ProjectsProvider } from "@/context/ProjectsContext";
import NewProject from "./NewProject";
import ProgressInfo from "./ProgressInfo";
import ProjectsContainer from "./ProjectsContainer";

export default function Sidebar() {
  return (
    <ProjectsProvider>
      <div className="border-r border-gray-200">
        <div className="flex size-full flex-col justify-between p-6">
          <ProjectsContainer />
          <div className="flex-1"></div>
          <ProgressInfo />
          <NewProject />
        </div>
      </div>
    </ProjectsProvider>
  );
}
