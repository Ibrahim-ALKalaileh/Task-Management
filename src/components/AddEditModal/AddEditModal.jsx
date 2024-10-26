import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './AddEditModal.css';
import Category from '../Category/Category';
import Modal from '../Modal/Modal';

const AddEditModal = ({ isOpen, onClose, onSave, initialTaskData, categoriesAvailable, isEditing }) => {
  const defaultTaskState = useMemo(() => ({
    title: '',
    description: '',
    categories: [],
  }), []);
  const id= `${isEditing?"edit":"create"}-task-form`;

  const [currentTask, setCurrentTask] = useState(defaultTaskState);
  const [errorMsg, setErrorMsg] = useState('');

  const resetTaskState = useCallback(() => {
    setCurrentTask(defaultTaskState);
    setErrorMsg('');
  }, [defaultTaskState]);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialTaskData) {
        setCurrentTask(initialTaskData);
      } else {
        resetTaskState();
      }
    }
  }, [isEditing, initialTaskData, isOpen, resetTaskState]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const toggleCategory = useCallback((category) => {
    setCurrentTask(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const handleSaveTask = useCallback(() => {
    if (currentTask.title.trim() === '') {
      setErrorMsg('Task title is required');
      return;
    }
    if (currentTask.categories.length === 0) {
      setErrorMsg('Select at least one category');
      return;
    }
    setErrorMsg('');
    onSave(currentTask);
    handleClose();
  }, [currentTask, onSave]);

  const handleClose = useCallback(() => {
    resetTaskState();
    onClose();
  }, [resetTaskState, onClose]);

  if (!isOpen) return null;

  return (
    <Modal
      id="add-edit-task-modal"
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      ActionButtonLabel={isEditing ? 'Edit' : 'Create'}
      onClickAction={handleSaveTask}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <form className="task-form">
        <input
          id="add-edit-task-modal"
          type="text"
          name="title"
          placeholder="Task Name"
          value={currentTask.title}
          onChange={handleInputChange}
          required
          className="shared-input-styles"
        />
        <textarea
          name="description"
          placeholder="Task description (optional)"
          value={currentTask.description}
          onChange={handleInputChange}
          className="shared-input-styles"
        />
        <div className="category-selection">
          <h4>Categories</h4>
          <div className="category-pills">
            {categoriesAvailable.map((category, index) => (
              <Category
                key={category}
                category={category}
                isSelected={currentTask.categories.includes(category)}
                onClickAction={() => toggleCategory(category)}
              />
            ))}
          </div>
        </div>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </Modal>
  );
};

AddEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialTaskData: PropTypes.object,
  categoriesAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default React.memo(AddEditModal);
