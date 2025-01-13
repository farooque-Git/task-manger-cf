import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  tasks: [],
  filter: "All",
  searchTerm: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      toast.success("Task Added !");
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        toast.info("Task Updated !");
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      toast.error("Task Deleted !");
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setSearchTerm, setFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
