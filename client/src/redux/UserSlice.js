import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isPending: true,
    isError: false,
    errorMessages: null
  },

  reducers: {
    updateUser: (state, action) => {
      state.data = action.payload;
      state.isError = false;
      state.isPending = false;
    },

    pending: (state, action) => {
      state.isError = false;
      state.isPending = true;
    },

    error: (state, action) => {
      state.isError = true;
      state.isPending = false;

      // state.errorMessages = action.payload.errorMessages;
    },

    deleteUser: (state, action) => {
      state.data = null;
    }
    
  }
  
});

export const { updateUser, pending, error, deleteUser } = userSlice.actions;
export default userSlice.reducer;
