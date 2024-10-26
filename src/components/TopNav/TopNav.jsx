import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './TopNav.css';
import HoverOptimizedImage from '../HoverOptimizedImage/HoverOptimizedImage';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const TopNav = ({ openCreateModal }) => {
  
  const imgObj = useMemo(() => ({
    width: 145,
    height: 40,
    alt: "Add Task",
    src: '/images/newTask-btn/NewTask.png',
    src2x: '/images/newTask-btn/NewTask@2x.png',
    src3x: '/images/newTask-btn/NewTask@3x.png',
    hoverSrc: '/images/newTask-btn/NewTask-Hover.png',
    hoverSrc2x: '/images/newTask-btn/NewTask-Hover@2x.png',
    hoversrc3x: '/images/newTask-btn/NewTask-Hover@3x.png',
  }), []);

  return (
    <header className="header-nav">
      <p>Task Management</p>
      <DarkModeToggle />
      <HoverOptimizedImage imgObj={imgObj} onClickAction={openCreateModal} />
    </header>
  );
};

TopNav.propTypes = {
  openCreateModal: PropTypes.func.isRequired,
};

export default React.memo(TopNav);
