import React from "react";
import PropTypes from "prop-types";
import "./Tooltip.css";

const Tooltip = ({ children, text }) => (
  <div className="tooltip-container">
    {children}
    <span className="tooltip-text">{text}</span>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default React.memo(Tooltip);
