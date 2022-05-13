import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
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

export const { setActiveMenu } = userSlice.actions;
export default userSlice.reducer;
