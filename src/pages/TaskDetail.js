import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Card, CardContent, Grid, Button  } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const TaskDetail = () => {
  const { id } = useParams();
  const taskId = parseInt(id);
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === taskId));
  const navigate = useNavigate();
  return (
    <Container sx={{ marginTop: '20px' }}>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)} // Go back to the previous page
        sx={{ marginBottom: '20px' }}
      >
        Back to Task List
      </Button>
      {task ? (
        <Card sx={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Task Detail
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Title:
                </Typography>
                <Typography variant="body1" paragraph>
                  {task.title}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Description:
                </Typography>
                <Typography variant="body1" paragraph>
                  {task.description}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Status:
                </Typography>
                <Typography variant="body1" paragraph>
                  {task.completed ? (
                    <span style={{ color: 'green' }}>Completed</span>
                  ) : (
                    <span style={{ color: 'red' }}>Pending</span>
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Due Date:
                </Typography>
                <Typography variant="body1" paragraph>
                  {task.dueDate}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center">
          Task not found
        </Typography>
      )}
    </Container>
  );
};

export default TaskDetail;
