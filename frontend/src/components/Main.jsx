// src/Main.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../redux/slices/taskSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { FaSun, FaMoon } from "react-icons/fa";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();

  const addTaskToList = (task) => {
    dispatch(addTask(task));
    console.log("Toast - Task Added");
    toast.success("Task Added!");
  };

  const updateTaskInList = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    toast.info("Task Status Updated!");
  };

  const deleteTaskFromList = (taskId) => {
    dispatch(deleteTask(taskId));
    toast.error("Task Deleted!");
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentTask(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        isDarkMode
          ? "bg-gradient-to-b from-black via-black to-gray-800 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex justify-evenly items-center w-full pt-3 bg-black text-yellow-600">
        <h1 className="text-3xl font-bold mb-6 pt-5">
          Real-Time Task Management Dashboard
        </h1>
        <div
          onClick={toggleDarkMode}
          className="mt-1 p-2 cursor-pointer rounded-full hover:bg-gray-300 end-0"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-700" size={24} />
          ) : (
            <FaMoon className="text-blue-800" size={24} />
          )}
        </div>
      </div>

      <TaskList
        tasks={tasks}
        onUpdateTask={openEditModal}
        onDeleteTask={deleteTaskFromList}
      />

      <button
        onClick={openAddModal}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Add Task
      </button>

      {isModalOpen && (
        <TaskModal
          task={currentTask}
          isEditing={isEditing}
          onAddTask={addTaskToList}
          onUpdateTask={updateTaskInList}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}

export default Main;
