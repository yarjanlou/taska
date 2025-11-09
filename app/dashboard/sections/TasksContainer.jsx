import { useQuery } from "@tanstack/react-query";
import TaskGroup from "./TaskGroup";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { getTasksByProject } from "@/lib/services/tasks";

export default function TasksContainer() {
  const { selectedProject } = useSelectedProject();

  const { data: tasks } = useQuery({
    queryKey: ["tasks", selectedProject],
    queryFn: () => getTasksByProject(selectedProject),
  });

  return (
    <div className="px-10 py-6">
      <div className="flex items-start gap-10">
        <TaskGroup
          title="To Do"
          color="#f87878"
          tasks={tasks?.filter((task) => task.status === "TODO")}
          status="TODO"
        />
        <TaskGroup
          title="In Progress"
          color="#365dff"
          tasks={tasks?.filter((task) => task.status === "INPROGRESS")}
          status="INPROGRESS"
        />
        <TaskGroup
          title="Done"
          color="#4ebf5c"
          tasks={tasks?.filter((task) => task.status === "DONE")}
          status="DONE"
        />
      </div>
    </div>
  );
}
