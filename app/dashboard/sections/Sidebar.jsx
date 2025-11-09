import NewProject from "./NewProject";
import Projects from "./Projects";

export default function Sidebar() {
  return (
    <div className="border-r border-gray-200">
      <div className="size-full p-6 flex flex-col justify-between">
        <Projects />
        <div className="flex-1"></div>
        <NewProject />
      </div>
    </div>
  );
}
