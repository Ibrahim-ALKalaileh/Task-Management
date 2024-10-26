import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip/Tooltip.jsx";
import editIcon from "../../assets/edit-btn/edit.png";
import editIcon2x from "../../assets/edit-btn/edit2x.png";
import editIcon3x from "../../assets/edit-btn/edit3x.png";
import deleteIcon from "../../assets/delete-btn/delete.png";
import deleteIcon2x from "../../assets/delete-btn/delete2x.png";
import deleteIcon3x from "../../assets/delete-btn/delete3x.png";
import "./Task.css";
import Category from "../Category/Category";

const Task = ({ task, onEdit, onDelete, onToggle }) => {
  const handleEdit = useCallback(() => onEdit(task), [onEdit, task]);
  const handleDelete = useCallback(() => onDelete(task), [onDelete, task]);
  const handleToggle = useCallback(() => onToggle(task.id), [onToggle, task.id]);

  console.log("Task rendered");

  return (
    <div className="task-container">
      <Tooltip text={task.description}>
        <span className="task-container__title">{task.title}</span>
        <div className="task-container__categories">
          {task.categories.map((category, index) => (
            <Category key={`category-${index}`} category={category} />
          ))}
        </div>
      </Tooltip>

      <div className="task-container__actions">
        <button
          onClick={handleToggle}
          className={`task-container__status ${task.completed ? 'task-container__status--completed' : 'task-container__status--incomplete'}`}
        >
          {task.completed ? "Completed" : "Incomplete"}
        </button>
        <div onClick={handleEdit}>
          <img
            src={editIcon}
            srcSet={`${editIcon} 1x, ${editIcon2x} 2x, ${editIcon3x} 3x`}
            alt="Edit"
            className="task-container__icon"
          />
        </div>
        <div onClick={handleDelete}>
          <img
            src={deleteIcon}
            srcSet={`${deleteIcon} 1x, ${deleteIcon2x} 2x, ${deleteIcon3x} 3x`}
            alt="Delete"
            className="task-container__icon"
          />
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default React.memo(Task);
