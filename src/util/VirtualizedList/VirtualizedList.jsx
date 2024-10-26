import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const VirtualizedList = ({ items, rowHeight, visibleHeight, renderItem }) => {
  const containerRef = useRef(null);
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(Math.ceil(visibleHeight / rowHeight)); 

  const totalItems = items.length;
  const totalHeight = totalItems * rowHeight;

  const calculateVisibleItems = useCallback(() => {
    const scrollTop = containerRef.current.scrollTop;
    const start = Math.floor(scrollTop / rowHeight);
    const end = Math.min(totalItems, Math.ceil((scrollTop + visibleHeight) / rowHeight));
    setVisibleStart(start);
    setVisibleEnd(end);
  }, [rowHeight, visibleHeight, totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(calculateVisibleItems);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [calculateVisibleItems]);

  const visibleItems = items.slice(visibleStart, visibleEnd); 

  return (
    <div
      ref={containerRef}
      className="virtualized-list"
      style={{ height: `${visibleHeight}rem`, overflowY: 'auto', position: 'relative' }}
    >
      
      <div style={{ height: `${totalHeight}rem`, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="task-list" 
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              padding: '10rem',
              top: `${(visibleStart + index) * rowHeight}rem`,
              height: `${rowHeight}rem`,
              width: '100%',
            }}
          >
            {renderItem(item)} 
          </div>
        ))}
      </div>
    </div>
  );
};

VirtualizedList.propTypes = {
  items: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  visibleHeight: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default VirtualizedList;
