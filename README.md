# 🗂️ Task & Project Manager

### 📖 Overview

This is a **Task & Project Manager** web application where users can organize projects and manage tasks effectively. Each task can have a **title**, **description**, **attachments**, **deadline**, and a **status**.  

The app provides a **drag-and-drop interface** to update task status between **To Do**, **In Progress**, and **Done** columns. It is fully **responsive** and optimized for both desktop and mobile devices.

Built with **Next.js**, **MUI**, and **React Query**, this application combines modern frontend technologies with a smooth user experience.

---

### 🚀 Features

- ✅ Create multiple projects  
- ✅ Add tasks to any project with:
  - Title  
  - Description  
  - Images/attachments  
  - Deadline  
- ✅ Drag & drop tasks between three statuses: **To Do**, **In Progress**, **Done**  
- ✅ Fully responsive layout for desktop and mobile  
- ✅ Built with **Next.js**, **MUI**, and **React Query** for state management and server interactions  
- ✅ Smooth UX for task management  

---

### 🎨 User Interface

The app has **three main columns** representing task statuses:

1. **To Do** – Tasks yet to be started  
2. **In Progress** – Tasks currently being worked on  
3. **Done** – Completed tasks  

Users can drag and drop tasks between columns to **update status in real time**.  

Attachments (images) and deadlines are visible within each task card.

---

### 💻 Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React |
| UI | MUI (Material UI) |
| State & Data Fetching | React Query |
| Styling | Tailwind / MUI components |
| Drag & Drop | DnD Kit |

---

### ⚙️ How It Works

1. **Project Creation:** Users can create multiple projects. Each project acts as a container for its tasks.  
2. **Task Creation:** Within a project, users can define a task with:
   - Title  
   - Description  
   - Attach images  
   - Set a deadline  
3. **Task Status Management:**  
   - Tasks are displayed in columns according to status (**To Do**, **In Progress**, **Done**)  
   - Drag & drop updates the status automatically  
4. **Responsive UI:** Works seamlessly on desktop, tablet, and mobile devices.

---

### ⏱️ Time and Space Complexity (Conceptual)

| Operation | Complexity |
|-----------|------------|
| Fetch projects/tasks | O(n) (linear with number of tasks) |
| Create / Update task | O(1) |
| Drag & drop | O(1) for DOM updates, async updates handled by React Query |


