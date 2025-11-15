import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { getTasksByProject } from "@/lib/services/tasks";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  TouchSensor,
} from "@dnd-kit/core";
import { pb } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "@/context/TasksContext";
import TaskGroup from "./TaskGroup";

export default function TasksContainer() {
  const [activeTask, setActiveTask] = useState(null);
  const { selectedProject } = useSelectedProject();
  const { setTasks } = useTasks();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", selectedProject.id],
    queryFn: () => getTasksByProject(selectedProject.id),
  });

  useEffect(() => {
    if (tasks) setTasks(tasks);
  }, [tasks, setTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const handleDragStart = ({ active }) => {
    document.body.classList.add("dragging");
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async ({ active, over }) => {
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: over.id } : t,
    );
    queryClient.setQueryData(["tasks", selectedProject.id], updatedTasks);

    try {
      await pb.collection("tasks").update(task.id, { status: over.id });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div className="relative lg:w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="py-6 md:px-10">
          <div className="flex items-start gap-6 lg:gap-10">
            <TaskGroup
              title="To Do"
              color="#f87878"
              tasks={tasks?.filter((task) => task.status === "TODO")}
              activeTask={activeTask}
              status="TODO"
              isLoading={isLoading}
            />
            <TaskGroup
              title="In Progress"
              color="#365dff"
              tasks={tasks?.filter((task) => task.status === "INPROGRESS")}
              activeTask={activeTask}
              status="INPROGRESS"
              isLoading={isLoading}
            />
            <TaskGroup
              title="Done"
              color="#4ebf5c"
              tasks={tasks?.filter((task) => task.status === "DONE")}
              activeTask={activeTask}
              status="DONE"
              isLoading={isLoading}
            />
          </div>
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              {...activeTask}
              style={{
                transform: undefined,
                pointerEvents: "none",
                boxShadow: "rgb(142 141 141 / 10%) 0px 3px 20px 0px",
              }}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
