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
      sx={{
        width: {
          xs: '150px', // Small devices (phones)
          sm: '200px', // Medium devices (tablets)
          md: '250px', // Large devices (desktops)
          lg: '300px', // Extra-large devices
        },
        marginBottom: '10px',
      }}
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
