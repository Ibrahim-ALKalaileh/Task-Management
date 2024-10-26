import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import "./DeleteModal.css";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const DeleteModal = ({ isOpen, task={}, onDelete, onClose }) => {
  
  const imgObj = useMemo(
    () => ({
      width: 418,
      height: 214,
      alt: "Delete Task",
      src: "/images/delete-img-modal/delete-img-modal.png",
      src2x: "/images/delete-img-modal/delete-img-modal2x.png",
      src3x: "/images/delete-img-modal/delete-img-modal3x.png",
    }),
    []
  );

  
  const handleDelete = useCallback(() => {
    onDelete(task);
  }, [onDelete, task]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-container">
        <OptimizedImage
          imgObj={imgObj}
          onClickAction={handleDelete}
          className="delete-image"
        />
        <div className="delete-content">
          <div className="delete-warning">Delete Task!</div>
          <div className="delete-task-name">
            <p>Are you sure that you want to delete</p>
            <strong>{task?.title}</strong>?
          </div>
          <div className="delete-action-btns">
            <button className="cancel-btn" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="delete-btn" type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  task: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(DeleteModal);
