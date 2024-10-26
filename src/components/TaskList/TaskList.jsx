import React, { useMemo, useCallback,useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
// import VirtualizedList from '../../util/VirtualizedList/VirtualizedList';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks, filters, onEdit, onDelete, onToggle }) => {
  const taskListRef = useRef(null);
  const [taskListHeight, setTaskListHeight] = useState(0);

  useEffect(() => {
    if (taskListRef.current) {
      setTaskListHeight(taskListRef.current.clientHeight);
    }
  }, []);
  
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusFilter =
        filters.status === 'all' ||
        (filters.status === 'completed' && task.completed) ||
        (filters.status === 'incomplete' && !task.completed);

      const categoryFilter =
        filters.category === 'all' ||
        task.categories.includes(filters.category);

      return statusFilter && categoryFilter;
    });
  }, [tasks, filters]);

  const TaskItem = useCallback(({ index, style }) => {
    const task = filteredTasks[index];
    return (
      <div style={style}>
        <Task
          task={task}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </div>
    );
  }, [filteredTasks, onEdit, onToggle, onDelete]);
  console.log("TaskList rendered",taskListHeight);
  return (
    <div className="task-list-container" ref={taskListRef}>
      {filteredTasks.length > 0 ? (
        <List
          className="custom-list"
          height={taskListHeight?taskListHeight:800} 
          itemCount={filteredTasks.length} 
          itemSize={120}
          width="100%" 
        >
          {TaskItem}
        </List>
      ) : (
        <p>No tasks found based on the selected filters.</p>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default React.memo(TaskList);
