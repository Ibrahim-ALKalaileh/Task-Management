import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './RadioGroup.css';

const RadioGroup = ({ groupLabel, options, selectedOption, onChange }) => {
  
  const handleChange = useCallback((value) => {
    onChange(value);
  }, [onChange]);

  return (
    <div className="radio-group">
      <span className="radio-group-title">{groupLabel}</span>
      {options.map(({ value, label }, index) => (
        <label key={`${groupLabel}-${value}-${index}`} htmlFor={`${groupLabel}-${value}-${index}`} className="radio-option">
          <input
            type="radio"
            id={`${groupLabel}-${value}-${index}`}
            value={value}
            checked={selectedOption === value}
            onChange={() => handleChange(value)}
          />
          <span className="option-label">{label}</span>
        </label>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  groupLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(RadioGroup);
