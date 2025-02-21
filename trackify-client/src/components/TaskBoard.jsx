import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const { tasks, setTasks, updateTask } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Return if dropped outside a droppable area

    const { draggableId, destination, source } = result;

    // No change in task position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = [...tasks];

    // Get the dragged task and update the category based on the destination
    const task = updatedTasks.find((task) => task._id === draggableId);
    if (task) {
      const updatedTask = { ...task, category: categories[destination.droppableId] };
      // Update task state optimistically
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === draggableId ? updatedTask : task))
      );

      // Update the task in the backend
      setLoading(true);
      try {
        await updateTask(draggableId, { category: updatedTask.category });
      } catch (error) {
        console.error("Error updating task:", error);
        setTasks(tasks); // Rollback in case of error
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Droppable key={category} droppableId={String(index)}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <h2 className="font-bold mb-2">{category}</h2>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, idx) => (
                    <Draggable key={task._id} draggableId={task._id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow mb-2"
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm">{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
