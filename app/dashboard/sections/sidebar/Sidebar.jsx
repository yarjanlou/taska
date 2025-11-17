import ProjectsContainer from "./ProjectsContainer";
import ProgressInfo from "./ProgressInfo";
import NewProject from "./NewProject";

export default function Sidebar() {
  return (
    <div className="hidden h-screen border-r border-gray-200 lg:block">
      <div className="flex size-full flex-col justify-between p-6">
        <div className="no-scrollbar max-h-[66vh] overflow-y-auto">
          <ProjectsContainer />
        </div>
        <div className="flex-1" />
        <ProgressInfo />
        <NewProject />
      </div>
    </div>
  );
}
