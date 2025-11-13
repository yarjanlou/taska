import ProjectsContainer from "./ProjectsContainer";
import ProgressInfo from "./ProgressInfo";
import NewProject from "./NewProject";

export default function Sidebar() {
  return (
    <div className="hidden border-r border-gray-200 lg:block">
      <div className="flex size-full flex-col justify-between p-6">
        <ProjectsContainer />
        <div className="flex-1"></div>
        <ProgressInfo />
        <NewProject />
      </div>
    </div>
  );
}
