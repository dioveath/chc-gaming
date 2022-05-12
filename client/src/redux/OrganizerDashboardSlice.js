import { createSlice } from '@reduxjs/toolkit';


const organizerSlice = createSlice({
  name: 'organizer',
  initialState: {
    dashboard: {
      activeMenu: 'Dashboard'
    }
  },

  reducers: {
    setActiveMenu: (state, action) => {
      state.dashboard.activeMenu = action.payload;
    }
  }

});

export const { setActiveMenu } = organizerSlice.actions;
export default organizerSlice.reducer;
