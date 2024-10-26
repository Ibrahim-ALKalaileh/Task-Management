import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all',
  category: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
  }
});

export const { setStatusFilter, setCategoryFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
