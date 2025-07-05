Pro Todo Manager
================

Overview
--------
Pro Todo Manager is a full-stack web application for managing to-do tasks. Users can create tasks with a title and description, view the five most recent active tasks, mark tasks as completed, and view completed tasks. The application uses a React frontend, an Express.js backend, and a MySQL database, all containerized with Docker and orchestrated using Docker Compose.

Features
--------
- Create tasks with a title and description through a web interface.
- Display the five most recent active tasks.
- Mark tasks as completed, removing them from the active tasks list.
- View a list of completed tasks.
- Responsive and accessible UI with clean design.
- Unit tests for frontend and backend components.
- Integration tests for the backend API.

Tech Stack
----------
- Frontend: React, React Router, Axios, CSS (with Tailwind-inspired styling)
- Backend: Node.js, Express.js, MySQL
- Database: MySQL (via mysql2 library)
- Containerization: Docker, Docker Compose
- Testing: Jest (backend), React Testing Library (frontend)

Prerequisites
-------------
- Docker: Ensure Docker and Docker Compose are installed.
- Linux Environment: A Linux dev environment with Bash and GNU tools.
- Git: To clone the repository.

Setup and Running the Project
-----------------------------
1. Clone the repository:
   git clone https://github.com/it22242204/TODO.git
   cd TODO

2. Build and start the containers:
   docker compose up --build

   This will build the frontend and backend Docker images, start the MySQL database, backend API (port 5050), and frontend UI (port 3000).

3. Access the application at:
   http://localhost:3000

4. To stop the application, press Ctrl+C or run:
   docker compose down

Database Setup
--------------
The MySQL database is automatically initialized with a todo_db database and a task table.

The task table schema includes:
- id: Auto-incremented primary key
- title: Task title (string)
- description: Task description (string)
- completed: Boolean indicating task completion status

Running Tests
-------------
Backend Tests:
1. Navigate to the backend directory:
   cd backend
2. Run the tests:
   npm test

Frontend Tests:
1. Navigate to the frontend directory:
   cd frontend
2. Run the tests:
   npm test

API Endpoints
-------------
- GET /tasks: Retrieve the five most recent incomplete tasks.
- POST /tasks: Create a new task (requires title and description in the request body).
- PUT /tasks/:id/complete: Mark a task as completed.
- GET /tasks/completed: Retrieve all completed tasks.
- DELETE /tasks/:id: Delete a task by ID.

Notes
-----
- The backend API runs on http://localhost:5050 within the Docker network.
- The frontend communicates with the backend via Axios, with CORS configured for http://localhost:5173.
- The application follows clean code principles, with modular components, clear naming, and proper error handling.
- Unit tests cover key frontend components and backend API endpoints.

Troubleshooting
---------------
- Database Connection Issues: Ensure the MySQL container is running and the todo_db database is initialized.
- CORS Errors: Verify the backend CORS configuration matches the frontend URL (http://localhost:5173).
- Port Conflicts: Ensure ports 3000 (frontend), 5050 (backend), and 3306 (MySQL) are not in use.