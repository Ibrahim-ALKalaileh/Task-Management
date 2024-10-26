import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, isDelete=false, title, ActionButtonLabel, onClickAction, children, onClose }) => {
  if (!isOpen) return null;

  const handleActionClick = useCallback(() => {
    onClickAction();
  }, [onClickAction]);

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const getActionButtons = useCallback(() => (
    <div className="task-form-buttons">
      <button className="action-buttons" type="button" onClick={handleCloseClick}>
        Cancel
      </button>
      <button className="action-buttons" type="button" onClick={handleActionClick}>
        {ActionButtonLabel}
      </button>
    </div>
  ), [handleCloseClick, handleActionClick, ActionButtonLabel]);

  return (
    <div className="modal-overlay">
      <div className={isDelete ? 'delete-modal' : 'modal-content'}>
        <span className="modalHeader">{title}</span>
        {children}
        {getActionButtons()}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDelete: PropTypes.bool,
  title: PropTypes.string.isRequired,
  ActionButtonLabel: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(Modal);
