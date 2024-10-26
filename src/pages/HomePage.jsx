import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from '../components/TaskList/TaskList';
import Filters from '../components/Filters/Filters';
import AddEditModal from '../components/AddEditModal/AddEditModal';
import DeleteModal from '../components/DeleteModal/DeleteModal'; 
import TopNav from '../components/TopNav/TopNav';
import { addTask, editTask, deleteTask , toggleTaskCompletion } from '../features/taskSlice';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.filters);

  const memoizedTasks = useMemo(() => tasks, [tasks]);
  const memoizedFilters = useMemo(() => filters, [filters]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const categoriesAvailable = ['Category 01', 'Category 02', 'Category 03'];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openCreateModal = useCallback(() => {
    setIsEditing(false);
    setTaskToEdit(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((task) => {
    setIsEditing(true);
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const openDeleteModal = useCallback((task) => {
    setIsDeleteModalOpen(true);
    setTaskToEdit(task);
  }, []);

  const handleSaveTask = useCallback((task) => {
    if (isEditing) {
      dispatch(editTask({ id: task.id, ...task }));
    } else {
      dispatch(addTask({ id: Date.now(), ...task, completed: false }));
    }
    resetTask();
    setIsModalOpen(false);
  }, [dispatch, isEditing, taskToEdit]);

  const handleDeleteTask = useCallback((task) => {
    dispatch(deleteTask(task.id));
    resetTask();
    setIsDeleteModalOpen(false);
  }, [dispatch]);

  const resetTask = useCallback(() => {
    setTaskToEdit(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    resetTask();
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  }, []);

  const handleToggleTask = useCallback((taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  }
  , [dispatch]);

  return (
    <div className="homepage">
      <TopNav openCreateModal={openCreateModal} />

      <div className="homepage-content">
        <aside className="homepage-filters">
          <Filters />
        </aside>

        <main className="homepage-tasklist">
          <TaskList tasks={memoizedTasks} filters={memoizedFilters} onEdit={openEditModal} onDelete={openDeleteModal} onToggle={handleToggleTask} />
        </main>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        initialTaskData={taskToEdit}
        categoriesAvailable={categoriesAvailable}
        isEditing={isEditing}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        task={taskToEdit}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default React.memo(HomePage);
