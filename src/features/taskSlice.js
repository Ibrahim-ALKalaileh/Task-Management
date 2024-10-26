import { createSlice } from "@reduxjs/toolkit";
import { encryptTasks, decryptTasks } from "../util/encryption";


const loadTasksFromLocalStorage = () => {
  try {
    const serializedTasks = localStorage.getItem("tasks");
    const tasks = serializedTasks ? JSON.parse(serializedTasks) : [];
    return decryptTasks(tasks); 
  } catch (err) {
    console.error("Error loading tasks from LocalStorage:", err);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks) => {
  try {
    const encryptedTasks = encryptTasks(tasks); 
    localStorage.setItem("tasks", JSON.stringify(encryptedTasks));
  } catch (err) {
    console.error("Error saving tasks to LocalStorage:", err);
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: loadTasksFromLocalStorage(), loading: false, error: null },
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    editTask(state, action) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTaskCompletion(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

export const { setTasks, addTask, editTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
