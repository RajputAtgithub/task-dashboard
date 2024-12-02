import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../taskSlice';
import { ButtonGroup, Button } from '@mui/material';

const TaskFilters = () => {
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => dispatch(setFilter('ALL'))}>All</Button>
      <Button onClick={() => dispatch(setFilter('COMPLETED'))}>Completed</Button>
      <Button onClick={() => dispatch(setFilter('PENDING'))}>Pending</Button>
      <Button onClick={() => dispatch(setFilter('OVERDUE'))}>Overdue</Button>
    </ButtonGroup>
  );
};

export default TaskFilters;
