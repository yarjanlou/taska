"use client";

import { SelectedProjectProvider } from "@/context/SelectedProjectContext";
import { TasksProvider } from "@/context/TasksContext";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import TasksContainer from "./tasks-section/TasksContainer";
import MobileSidebarProvider from "@/context/MobileSidebarContext";

export default function UserDashboard() {
  return (
    <SelectedProjectProvider>
      <TasksProvider>
        <MobileSidebarProvider>
          <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
            <Sidebar />
            <div className="grid h-screen grid-rows-[60px_1fr] bg-gray-100">
              <Header />
              <div className="flex overflow-x-scroll px-5 md:px-0 lg:overflow-x-hidden">
                <TasksContainer />
              </div>
            </div>
          </div>
        </MobileSidebarProvider>
      </TasksProvider>
    </SelectedProjectProvider>
  );
}
