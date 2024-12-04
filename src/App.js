import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
