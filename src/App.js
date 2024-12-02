import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import { Search } from '@mui/icons-material';
import { Container, Typography, MenuItem, Select, Box, TextField, InputAdornment } from '@mui/material';
import { setSearchQuery, searchQuery } from './taskSlice';

const App = () => {
  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const [action, setAction] = useState(''); // Track selected action (Add, Edit, etc.)

  // Handle the task editing
  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to be edited
    setAction(''); // Reset the action when editing
  };

  // Handle closing the form (resetting task editing or action)
  const handleCloseForm = () => {
    setEditingTask(null); // Close the form after submitting or canceling
    setAction(''); // Reset the action (no action selected)
  };

  // Handle dropdown action selection (Add Task)
  const handleActionChange = (event) => {
    setAction(event.target.value); // Update the action (Add Task)
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query in Redux
  };
  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>

        {/* Dropdown for task actions (Add, Edit, etc.) */}
        <Box mb={2}>
          <Select
            value={action}
            onChange={handleActionChange}
            displayEmpty
            variant="outlined"
            sx={{ width: '200px' }}
          >
            <MenuItem value="">Select Action</MenuItem>
            <MenuItem value="ADD">Add Task</MenuItem>
            {/* You can add more actions like "Edit Task" if needed */}
          </Select>
          <TextField
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: '250px' }}
          />
        </Box>

        {/* Render TaskForm if action is to Add Task or if editing an existing task */}
        {(action === 'ADD' || editingTask) && (
          <TaskForm existingTask={editingTask} onClose={handleCloseForm} />
        )}

        <TaskFilters />
        <TaskList onEdit={handleEditTask} />
      </Container>
    </Provider>
  );
};

export default App;
