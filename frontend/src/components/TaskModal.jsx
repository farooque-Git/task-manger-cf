import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/slices/taskSlice";

function TaskModal({ task, isEditing, onClose }) {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (isEditing && task) {
      setTaskName(task.name);
      setStatus(task.status);
    }
  }, [isEditing, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateTask({ ...task, name: taskName, status }));
    } else {
      dispatch(addTask({ id: Date.now(), name: taskName, status }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taskName" className="block text-sm font-semibold">
              Task Name:
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Pending" >
                Pending
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black py-1 px-3 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
