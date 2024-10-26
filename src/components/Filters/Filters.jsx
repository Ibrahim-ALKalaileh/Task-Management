import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setCategoryFilter } from '../../features/filterSlice';
import RadioGroup from '../RadioGroup/RadioGroup';
import './Filters.css';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const statusOptions = useMemo(() => [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'incomplete', label: 'Incomplete' }
  ], []);

  const categoryOptions = useMemo(() => [
    { value: 'all', label: 'All' },
    { value: 'Category 01', label: 'Category 01' },
    { value: 'Category 02', label: 'Category 02' },
    { value: 'Category 03', label: 'Category 03' }
  ], []);

  
  const handleStatusChange = useCallback((value) => {
    dispatch(setStatusFilter(value));
  }, [dispatch]);

  const handleCategoryChange = useCallback((value) => {
    dispatch(setCategoryFilter(value));
  }, [dispatch]);

  return (
    <div className="filters">
      <span className='filter-title'>Filter</span>
      <RadioGroup
        groupLabel="Completion Status"
        options={statusOptions}
        selectedOption={filters.status}
        onChange={handleStatusChange}
      />
      
      <RadioGroup
        groupLabel="Categories"
        options={categoryOptions}
        selectedOption={filters.category}
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default React.memo(Filters);
