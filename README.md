# Task Manager App – MERN Stack Web App

> **Tech Stack:** React.js · Node.js · Express.js · MongoDB · Mongoose · JWT · CSS

---

## Overview

A full-stack task management application that allows users to manage their daily tasks with features like creating, editing, filtering, and deleting tasks. The app uses secure authentication and a responsive UI to deliver a smooth experience for users to stay organized and productive.

---

## Features

- **User Authentication (JWT)** – Register and login functionality with protected routes
- **Task Management** – Add, update, delete, and mark tasks as complete/incomplete
- **Task Filtering** – Filter tasks by their status (completed or pending)
- **Modal UI for Task Input** – Create/edit tasks through a sleek modal interface
- **Error Handling & Validation** – Frontend and backend input validation with proper error responses

---

## Screenshots

### Login Page

![Login Page](Screenshots/Login%20Page.png)

### Signup Page

![Signup Page](Screenshots/Signup%20Page.png)

### Tasks Dashboard Page

![Tasks Dashboard Page](Screenshots/Tasks%20Dashboard%20Page.png)

### Add/Edit Task Modal

![Add/Edit Task Modal](Screenshots/Modal%20Component.png)

### Filter Tasks

![Filter Tasks 01](Screenshots/Filtered%2001.png)

![Filter Tasks 02](Screenshots/Filtered%2002.png)

## Tech Stack

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| Frontend         | React.js, Tailwind CSS          |
| Backend          | Node.js, Express.js             |
| Database         | MongoDB, Mongoose               |
| Authentication   | JWT (JSON Web Tokens), bcryptjs |
| State Management | React Hooks, Context API        |
| Tools            | Git, GitHub, VS Code, Postman   |

---

## Folder Structure

```
TASK MANAGER APP/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
|   |   ├── components/
|   |   |   ├── Routes/
|   |   |   |   └── Private.js
|   |   |   └── Footer.css
|   |   |   └── Footer.js
|   |   |   └── Header.css
|   |   |   └── Header.js
|   |   |   └── Layout.js
|   |   |   └── Spinner.css
|   |   |   └── Spinner.js
|   |   |   └── TaskModal.css
|   |   |   └── TaskModal.js
|   |   ├── context/
|   |   |   └── auth.js
|   |   ├── pages/
|   |   |   ├── Auth/
|   |   |   |   └── Login.css
|   |   |   |   └── Login.js
|   |   |   |   └── Register.css
|   |   |   |   └── Register.js
|   |   |   └── HomePage.js
|   |   |   └── HomePage.css
|   |   |   └── UserHomePage.js
|   |   |   └── UserHomePage.css
|   |   └── App.js
|   |   └── index.js
├── server/                  # Express backend
|   ├── config/
|   |   └── db.js
|   ├── controllers/
|   |   └── authController.js
|   |   └── taskController.js
|   ├── middlewares/
|   |   └── authMiddleware.js
|   ├── models/
|   |   └── taskModel.js
|   |   └── userModel.js
|   ├── routes/
|   |   └── authRoute.js
|   |   └── taskRoutes.js
|   ├── utils/
|   |   └── authHelper.js
│   └── server.js
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hasnain1665/TaskManager-MERN.git
cd TaskManager-MERN
```

### 2. Setup Backend

```bash
cd server
npm install
```

### 3. Create a `.env` file in `/server` folder:

```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

# 4. Start the backend server:

```bash
npm server.js

```

### 5. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## API Endpoints

| Method | Endpoint              | Description                             |
| ------ | --------------------- | --------------------------------------- |
| POST   | `/api/auth/login`     | Login user                              |
| POST   | `/api/auth/register`  | Register user                           |
| POST   | `/api/task/tasks`     | Create a new task                       |
| GET    | `/api/task/tasks`     | Get all tasks of the authenticated user |
| GET    | `/api/task/tasks/:id` | Get a specific task                     |
| PUT    | `/api/task/tasks/:id` | Update a task (details/completion)      |
| DELETE | `/api/task/tasks/:id` | Delete a task                           |

---

## Future Enhancements

- Task due dates and reminders
- Email notifications
- Dark mode toggle
- Drag-and-drop task sorting
- User profile and settings page

---
