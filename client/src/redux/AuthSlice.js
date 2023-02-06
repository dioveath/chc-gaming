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

    pending: (state, _action) => {
      state.isError = false;
      state.isPending = true;
    },

    error: (state, action) => {
      state.isError = true;
      state.isPending = false;

      state.errorMessages = action.payload.errorMessages;
    },

    // checks for expiry
    updateToken: (state, _action) => { 
      var token = localStorage.getItem('accessToken');
      if(token == null) return;

      var decodedToken = jwt_decode(token);
      
      if(decodedToken.exp * 1000 < Date.now()) {
        state.accessToken = null;
        state.userId = null;
      }

      state.isPending = false;
      state.isError = false;
    },

    logout: (state, _action) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      state.accessToken = null;
      state.userId = null;
      state.isPending = false;
      state.isError = false;
    }
  }

});



export const { login, error, pending, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
