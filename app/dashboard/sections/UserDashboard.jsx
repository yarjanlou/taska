"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import TasksContainer from "./TasksContainer";
import { SelectedProjectProvider } from "@/context/SelectedProjectContext";

export default function UserDashboard() {
  return (
    <SelectedProjectProvider>
      <div className="grid min-h-screen grid-cols-[250px_1fr]">
        <Sidebar />
        <div className="grid h-screen grid-rows-[60px_1fr] bg-gray-100">
          <Header />
          <div className="overflow-y-auto">
            <TasksContainer />
          </div>
        </div>
      </div>
    </SelectedProjectProvider>
  );
}
