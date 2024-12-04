import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';

const TaskDetail = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));

  return (
    <Container>
      {task ? (
        <Box>
          <Typography variant="h4">Task Detail</Typography>
          <Typography variant="h6">Title: {task.title}</Typography>
          <Typography variant="body1">Description: {task.description}</Typography>
          <Typography variant="body2">Status: {task.completed ? 'Completed' : 'Pending'}</Typography>
          <Typography variant="body2">Due Date: {task.dueDate}</Typography>
        </Box>
      ) : (
        <Typography variant="body1">Task not found</Typography>
      )}
    </Container>
  );
};

export default TaskDetail;
