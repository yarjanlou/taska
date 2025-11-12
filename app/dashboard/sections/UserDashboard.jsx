"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import TasksContainer from "./TasksContainer";
import { SelectedProjectProvider } from "@/context/SelectedProjectContext";
import { TasksProvider } from "@/context/TasksContext";

export default function UserDashboard() {
  return (
    <SelectedProjectProvider>
      <TasksProvider>
        <div className="grid min-h-screen grid-cols-[250px_1fr]">
          <Sidebar />
          <div className="grid h-screen grid-rows-[60px_1fr] bg-gray-100">
            <Header />
            <div className="overflow-y-auto">
              <TasksContainer />
            </div>
          </div>
        </div>
      </TasksProvider>
    </SelectedProjectProvider>
  );
}
