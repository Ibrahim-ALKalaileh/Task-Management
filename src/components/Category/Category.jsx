import React from 'react';
import PropTypes from 'prop-types';
import './Category.css';

const Category = ({ isSelected=false, category, onClickAction=() => {} }) => {
  const handleClick = () => onClickAction(category);

  return (
    <span
      onClick={handleClick}
      className={`pill task-category ${isSelected ? 'selected' : ''}`}
    >
      {category}
    </span>
  );
};

Category.propTypes = {
  isSelected: PropTypes.bool,
  category: PropTypes.string.isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo(Category);
