import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'ALL',
  isFormVisible: false, // Track form visibility
  editingTask: null, // Track task being edited
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false });
      state.isFormVisible = false; // Hide form after adding a task
    },
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) Object.assign(task, updates);
      state.isFormVisible = false; // Hide form after editing a task
      state.editingTask = null; // Clear editing task after submitting
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    openForm: (state, action) => {
      state.isFormVisible = true;
      state.editingTask = action.payload || null; // If editing, set the task
    },
    closeForm: (state) => {
      state.isFormVisible = false;
      state.editingTask = null; // Clear editing task when closing the form
    },
  },
});

export const { 
  addTask, 
  editTask, 
  deleteTask, 
  toggleTaskCompletion, 
  setFilter, 
  openForm, 
  closeForm 
} = taskSlice.actions;

export default taskSlice.reducer;
