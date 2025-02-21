/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    fetchTasks();

    socket.on("task-updated", () => {
      fetchTasks();
    });

    return () => socket.disconnect();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async (task) => {
    await axios.post("http://localhost:5000/tasks", task);
  };

  const updateTask = async (id, updatedData) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, updatedData);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
