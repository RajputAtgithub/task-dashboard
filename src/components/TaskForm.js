import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../taskSlice';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ existingTask = null, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  // Populate the form if editing an existing task
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      // Dispatch editTask action
      dispatch(editTask({ id: existingTask.id, updates: { title, description, dueDate } }));
    } else {
      // Dispatch addTask action
      dispatch(addTask({ id: Date.now(), title, description, dueDate }));
    }
    setTitle('');
    setDescription('');
    setDueDate('');
    if (onClose) onClose(); // Close the modal or reset the form
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained">
          {existingTask ? 'Update Task' : 'Add Task'}
        </Button>
        {onClose && (
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TaskForm;
