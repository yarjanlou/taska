import NewProject from "./NewProject";
import ProjectsContainer from "./ProjectsContainer";

export default function Sidebar() {
  return (
    <div className="border-r border-gray-200">
      <div className="flex size-full flex-col justify-between p-6">
        <ProjectsContainer />
        <div className="flex-1"></div>
        <NewProject />
      </div>
    </div>
  );
}
