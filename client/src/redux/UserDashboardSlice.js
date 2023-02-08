import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashboard: {
    activeMenu: 'Dashboard'
  }  
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.dashboard.activeMenu = action.payload;
    },
    resetMenu: (state, _action) => {
      state.dashboard.activeMenu = initialState.dashboard.activeMenu;
    }
  }

});

export const { setActiveMenu, resetMenu } = userSlice.actions;
export default userSlice.reducer;
