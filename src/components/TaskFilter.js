import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/taskSlice';
import { Select, MenuItem, Box } from '@mui/material';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = React.useState('ALL');

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterValue(selectedFilter);
    dispatch(setFilter(selectedFilter)); // Update the Redux filter state
  };

  return (
    <Box>
      <Select
        value={filterValue}
        onChange={handleFilterChange}
        displayEmpty
        variant="outlined"
        sx={{ width: '200px' }}
      >
        <MenuItem value="ALL">All Tasks</MenuItem>
        <MenuItem value="COMPLETED">Completed Tasks</MenuItem>
        <MenuItem value="PENDING">Pending Tasks</MenuItem>
        <MenuItem value="OVERDUE">Overdue Tasks</MenuItem>
      </Select>
    </Box>
  );
};

export default TaskFilter;