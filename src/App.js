import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <TaskForm />
        <TaskFilters />
        <TaskList />
      </Container>
    </Provider>
  );
};

export default App;
