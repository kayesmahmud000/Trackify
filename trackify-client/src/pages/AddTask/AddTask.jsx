import { useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [tasks, setTasks] = useState([]); // Local state to manage tasks

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Title is required!");

    const newTask = { title, description, category };

    try {
      const response = await fetch("https://trackify-server-delta.vercel.app/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const savedTask = await response.json();

      // Update the local task state with the new task
      setTasks((prevTasks) => [...prevTasks, savedTask]);

      // Clear the form fields
      setTitle("");
      setDescription("");
      setCategory("To-Do");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          maxLength="200"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>

      <div className="mt-4">
        <h3 className="font-bold">Task List</h3>
        <ul className="list-disc pl-4">
          {tasks.map((task) => (
            <li key={task._id} className="mb-2">
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              <span className="text-sm text-gray-500">{task.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTask;
