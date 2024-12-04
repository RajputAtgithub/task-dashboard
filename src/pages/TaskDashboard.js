import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/taskSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import { Container, Typography, TextField, Button, InputAdornment, Box, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value); // Update local state
    dispatch(setSearchQuery(value)); // Update Redux store
  };

  const handleClearSearch = () => {
    setSearchText(''); // Clear the input field
    dispatch(setSearchQuery('')); // Clear the Redux store
  };

  const handleAddTaskClick = () => {
    setEditingTask(null); // Ensure we are not editing any task
    setIsFormVisible(true); // Show the form
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide the form
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to be edited
    setIsFormVisible(true); // Show the form
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: {
            xs: '1.5rem', // Small devices (phones)
            sm: '2rem',   // Medium devices (tablets)
            md: '2.5rem', // Large devices (desktops)
            lg: '3rem',   // Extra-large devices
          },
        }}
      >
        Task Management Dashboard
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }, // Column layout for smaller devices
          alignItems: { xs: 'flex-start', sm: 'center' }, // Align items based on the layout
          gap: '10px', // Add spacing between elements
          marginBottom: '20px',
        }}
      >
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder="Search Tasks"
          value={searchText} // Bind input value to state
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: {
              xs: '50%', // Full width on small devices
              sm: '250px', // Fixed width on medium and larger devices
            },
          }}
        />

        {/* Add Task Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTaskClick}
          sx={{
            width: {
              xs: '50%', // Full width on small devices
              sm: 'auto', // Auto width on medium and larger devices
            },
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* Task Filter */}
      <TaskFilter />

      {/* Task Form */}
      {isFormVisible && (
        <TaskForm existingTask={editingTask} onClose={handleCloseForm} />
      )}

      {/* Task List */}
      <TaskList onEdit={handleEditTask} />
    </Container>
  );
};

export default TaskDashboard;
