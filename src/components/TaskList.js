import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskCompletion, deleteTask } from '../taskSlice';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = ({ onEdit }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  // Filter tasks based on selected filter in Redux
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'COMPLETED') return task.completed;
    if (filter === 'PENDING') return !task.completed;
    if (filter === 'OVERDUE') return !task.completed && new Date(task.dueDate) < new Date();
    return true; // Default: ALL tasks
  });

  return (
    <List>
      {filteredTasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <>
              <Checkbox
                checked={task.completed}
                onChange={() => dispatch(toggleTaskCompletion(task.id))}
              />
              <IconButton onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(deleteTask(task.id))}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary={task.title}
            secondary={`Due: ${task.dueDate}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
