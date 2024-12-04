import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/taskSlice';
import { TextField, Button, Box } from '@mui/material';


const TaskForm = ({ existingTask, onClose }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (existingTask) {
      setTask({
        title: existingTask.title,
        description: existingTask.description,
        dueDate: existingTask.dueDate,
      });
    }
  }, [existingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (existingTask) {
      dispatch(editTask({ id: existingTask.id, updates: task }));
    } else {
      dispatch(addTask(task));
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '20px' }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        sx={{ marginBottom: '10px',marginTop:'5px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        sx={{ marginBottom: '10px' }}
      />
      <TextField
        label="Due Date"
        variant="outlined"
        fullWidth
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        sx={{marginBottom: '10px',
          '.MuiInputLabel-root': {
            textAlign: 'left', // Center-align the label text
            width: '100%', // Ensures the label covers the entire width
            transformOrigin: 'left', // Centers the transformation point
          },
          '.MuiInputLabel-shrink': {
            textAlign: 'left', // Adjust alignment when the label shrinks
          },
        }}
        InputLabelProps={{
          shrink: true, // Ensures label stays visible when date is selected
        }}
      />
      <Button type="submit" variant="contained">
        {existingTask ? 'Update' : 'Add'} {/* Dynamic text based on existingTask */}
      </Button>
      <Button onClick={onClose} variant="outlined" sx={{ marginLeft: '10px' }}>Cancel</Button>
    </Box>
  );
};

export default TaskForm;
