# Todo App

A simple Todo App built with React for the frontend and Node.js with Express and MongoDB for the backend.

## Features

- Add new tasks with a title, description, status, and due date.
- View a list of all tasks.
- Update task details.
- Delete tasks.
- Responsive design for all devices.

## Technologies Used

- Frontend:
  - React
  - Axios for HTTP requests
  - React Router for routing

- Backend:
  - Node.js
  - Express
  - MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (You can use MongoDB Atlas for cloud database or install MongoDB locally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krishna7054/Todo-App.git
   cd todo-app

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ./frontend
   npm install
3. Setup MongoDB
- If you are using MongoDB Atlas, create a cluster and get the connection string.
- If you are using a local MongoDB instance, ensure it is running and get the connection string (usually mongodb://localhost:27017).

##  Running the Application
  1. Start the backend server:
     ```bash
     cd backend
     node index.js

   ### The backend server will start on `http://localhost:3000`.
   2. Start the frontend server:
      ```bash
      cd frontend
      npm run dev
   ### The frontend should now be accessible in your web browser.

## Usage
- Open your browser and navigate to http://localhost:3001.
- You can add a new task by clicking on the "Add Todo" button.
- You can view all tasks on the main page.
- You can update or delete tasks using the respective buttons next to each task.


  ## Project Structure

      ```bash
      todo-app/
      │
      ├── backend/
      │   ├── controllers/
      │   │   └── taskController.js
      │   ├── models/
      │   │   └── Task.js
      │   ├── routes/
      │   │   └── taskRoutes.js
      │   ├── .env
      │   ├── server.js
      │   └── package.json
      │
      ├── frontend/
      │   ├── src/
      │   │   ├── components/
      │   │   │   ├── Createtodo.jsx
      │   │   │   ├── Showtodo.jsx
      │   │   │   └── Updatetodo.jsx
      │   │   ├── App.jsx
      │   │   ├── index.js
      │   │   └── todo.css
      │   ├── public/
      │   │   └── index.html
      │   └── package.json
      │
      └── README.md

## Preview
![i1](https://github.com/krishna7054/Todo-App/assets/102844052/39fbfeee-083f-454d-ac87-ccc3553fbc1f)

![i2](https://github.com/krishna7054/Todo-App/assets/102844052/29f2975c-1718-42e3-b792-8e36da22bc19)


![i3](https://github.com/krishna7054/Todo-App/assets/102844052/85cacea2-5f5e-488e-b039-cf77c652ed02)
