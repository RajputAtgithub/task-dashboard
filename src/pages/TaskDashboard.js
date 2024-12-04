import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/taskSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import { Container, Typography, TextField, Button, InputAdornment, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
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
      <Typography variant="h4" gutterBottom>
        Task Management Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder="Search Tasks"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: '250px' }}
        />

        {/* Add Task Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTaskClick}
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
