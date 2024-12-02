import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice'; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // Ensure the slice reducer is added here
  },
});
