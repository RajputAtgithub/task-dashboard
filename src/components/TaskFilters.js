import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../taskSlice';
import { Select, MenuItem, Box } from '@mui/material';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = React.useState('ALL'); // State to track dropdown selection

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterValue(selectedFilter); // Update local state
    dispatch(setFilter(selectedFilter)); // Dispatch filter to Redux
  };

  return (
    <Box>
      <Select
        value={filterValue}
        onChange={handleFilterChange}
        displayEmpty
        variant="outlined"
        sx={{ width: '200px' }} // Set width for dropdown
      >
        <MenuItem value="ALL">All Tasks</MenuItem>
        <MenuItem value="COMPLETED">Completed Tasks</MenuItem>
        <MenuItem value="PENDING">Pending Tasks</MenuItem>
        <MenuItem value="OVERDUE">Overdue Tasks</MenuItem>
      </Select>
    </Box>
  );
};

export default TaskFilters;
