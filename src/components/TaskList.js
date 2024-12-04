import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import { reorderTasks } from '../redux/taskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const TaskList = ({ onEdit }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const dispatch=useDispatch();
  // Filter tasks based on filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return task.completed;
    if (filter === 'PENDING') return !task.completed;
    if (filter === 'OVERDUE') {
      const currentDate = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate < currentDate && !task.completed;
    }
    return true;
  });

  // Apply search filter
  const filteredAndSearchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

   // Handle drag and drop reorder
   const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    // If the task was dropped outside the valid area
    if (!destination) return;

    // If the task is dropped in the same position
    if (destination.index === source.index) return;

    const reorderedTasks = Array.from(filteredAndSearchedTasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    dispatch(reorderTasks(reorderedTasks));  // Dispatch action to update task order in Redux state
  }; 

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredAndSearchedTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem task={task} onEdit={onEdit} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
