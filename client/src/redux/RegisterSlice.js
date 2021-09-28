
import { createSlice } from '@reduxjs/toolkit';




const regSlice = createSlice({
  name: "reg",
  initialState: {
    isPending: false,
    isError: false,
    errorMessages: null
  },

  reducers: {

    pending: (state, action) => {
      state.isError = false;
      state.isPending = true;
    },

    error: (state, action) => {
      state.isPending = false;
      state.isError = true;
      state.errorMessages = action.payload.errorMessages;
    },

    complete: (state, action) => {
      state.isPending = false;
      state.isError = false;
      state.errorMessages = null;
    }

  },

});


export const { pending, error, complete } = regSlice.actions;
export default regSlice.reducer;
