import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskCompletion, deleteTask } from '../redux/taskSlice'; 
import { IconButton , Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    onEdit(task); // Trigger the edit action
  };

  const handleFinish = () => {
    dispatch(toggleTaskCompletion(task.id)); // Toggle the task completion
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Delete the task
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop:'5px', marginBottom: '10px', 
                 backgroundColor: task.completed ? '#b1ffb1' : '#ffb4b4', // Conditional color based on completion status
                 padding: '10px', borderRadius: '5px' }}>
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ color: task.completed ? 'green' : 'red' }}>{task.title}</h4>
        <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </Link>
        <p>{task.description}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
      </div>

      {/* Icon Buttons */}
      <div>
        <IconButton onClick={handleEdit} color="primary" aria-label="edit task">
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleFinish}
          color={task.completed ? 'secondary' : 'primary'}
          aria-label={task.completed ? 'mark as pending' : 'mark as completed'}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color="error" aria-label="delete task">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskItem;
