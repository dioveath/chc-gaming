import { createSlice } from '@reduxjs/toolkit';

const organizerSlice = createSlice({
  name: 'organizer',
  initialState: {
    arena: null,
    dashboard: {
      activeMenu: 'Dashboard'
    }
  },
  reducers: {
    setActiveMenu: (state, action) => {
      state.dashboard.activeMenu = action.payload;
    },
    setArena: (state, action) => {
      state.arena = action.payload;
    },
    resetArena: (state, action) => {
      state.arena = null;
      state.dashboard.activeMenu = 'Dashboard';
    }
  }

});

export const { setActiveMenu, setArena, resetArena } = organizerSlice.actions;
export default organizerSlice.reducer;