"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import TasksContainer from "./TasksContainer";

export default function UserDashboard() {
  return (
    <div className="grid min-h-screen grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="grid grid-rows-[60px_1fr]">
        <Header />
        <TasksContainer />
      </div>
    </div>
  );
}
