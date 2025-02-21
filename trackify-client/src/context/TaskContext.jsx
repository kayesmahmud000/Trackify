/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const socket = io("https://trackify-server-delta.vercel.app");

  useEffect(() => {
    fetchTasks();

    socket.on("task-updated", () => {
      fetchTasks();
    });

    return () => socket.disconnect();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("https://trackify-server-delta.vercel.app/tasks");
    setTasks(res.data);
  };

  const addTask = async (task) => {
    await axios.post("https://trackify-server-delta.vercel.app/tasks", task);
  };

  const updateTask = async (id, updatedData) => {
    await axios.put(`https://trackify-server-delta.vercel.app/tasks/${id}`, updatedData);
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://trackify-server-delta.vercel.app/tasks/${id}`);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
