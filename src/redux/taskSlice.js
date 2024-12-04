import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'ALL',
  isFormVisible: false,
  editingTask: null,
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (!action.payload.title || !action.payload.dueDate) return; // Ensure required fields
      state.tasks.push({
        id: Date.now(),
        ...action.payload,
        completed: false,
      });
      state.isFormVisible = false;
    },
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      if (!updates.title || !updates.dueDate) return; // Validate required fields
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
        };
      }
      state.isFormVisible = false;
      state.editingTask = null;
    },    
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const confirmDelete = window.confirm('Do you want to delete this task?');
      if (confirmDelete) {
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
        if (state.editingTask?.id === taskId) {
          state.isFormVisible = false;
          state.editingTask = null;
        }
      }
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updateOrder: (state, action) => {
      state.tasks = action.payload;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
  setSearchQuery,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
