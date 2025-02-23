# Task Management System

## 🚀 Short Description
The **Task Management System** is a web application that allows users to create, edit, delete, and reorder tasks in real time. Tasks are categorized into **To-Do**, **In Progress**, and **Done**, with drag-and-drop functionality for easy management.

## 🌍 Live Demo
🔗 [Live Application](https://trackify-abc94.web.app/) *(Update this link after deployment)*

## 📦 Dependencies
Ensure you have the following installed before running the project:
- **Node.js** (v18+ recommended)
- **MongoDB** (for database)
- **Express.js** (backend framework)
- **React.js** (frontend framework)
- **Tailwind CSS** (for styling)
- **WebSockets** (for real-time updates)
- **react-beautiful-dnd** (for drag-and-drop functionality)

## 🛠 Installation Steps

1️⃣ Clone the repository:
```sh
git clone https://github.com/your-repo/task-management-system.git
cd task-management-system
```

2️⃣ Install dependencies:
```sh
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3️⃣ Set up **MongoDB** connection in `.env` file (in the `server` folder):
```sh
MONGO_URI=mongodb://localhost:27017/task_management
PORT=5000
```

4️⃣ Start the backend server:
```sh
cd server
npm run dev
```

5️⃣ Start the frontend:
```sh
cd client
npm run dev
```

6️⃣ Open the app in your browser:
```
http://localhost:3000
```

## 🔧 Technologies Used
- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Real-Time Updates:** WebSockets, MongoDB Change Streams
- **State Management:** React Context API
- **Drag-and-Drop:** react-beautiful-dnd

---

🚀 Happy Coding! Let me know if you need any modifications! 😃

