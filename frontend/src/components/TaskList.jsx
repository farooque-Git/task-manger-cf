// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setFilter,
  deleteTask,
  updateTask,
} from "../redux/slices/taskSlice";

function TaskList() {
  const dispatch = useDispatch();
  const { tasks, filter, searchTerm } = useSelector((state) => state.tasks);

  // Local state to hold the search term temporarily
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 500);
    //debounce time
    setDebounceTimeout(newTimeout);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-between mb-4">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Task ID</th>
            <th className="border-b px-4 py-2 text-left">Task Name</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border-b px-4 py-2">{task.id}</td>
                <td className="border-b px-4 py-2">{task.name}</td>
                <td className="border-b px-4 py-2">{task.status}</td>
                <td className="border-b px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => dispatch(updateTask(task))}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-4 py-2 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
