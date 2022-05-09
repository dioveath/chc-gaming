import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const generateInitialState = () => {
  var accessToken = localStorage.getItem('accessToken');
  var userId = localStorage.getItem('userId');
  return {
    userId,
    accessToken,
    isPending: false,
    isError: false,
    errorMessages: null
  };
};


const authSlice = createSlice({
  name: "auth",
  initialState: generateInitialState(),
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userId', action.payload.userId);
      state.isPending = false;
      state.isError = false;
    },

    pending: (state, action) => {
      state.isError = false;
      state.isPending = true;
    },

    error: (state, action) => {
      state.isError = true;
      state.isPending = false;

      state.errorMessages = action.payload.errorMessages;
    },

    // checks for expiry
    updateToken: (state, action) => { 

      var token = localStorage.getItem('accessToken');
      if(token == null) return;

      var decodedToken = jwt_decode(token);

      var currentDate = new Date();

      if(decodedToken.exp * 1000 < currentDate.getTime()) {
        state.accessToken = null;
        state.userId = null;
      }

    },

    logout: (state, action) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      state.accessToken = null;
      state.userId = null;
    }
  }

});

export const { login, error, pending, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
