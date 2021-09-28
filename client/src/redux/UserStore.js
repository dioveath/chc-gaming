import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from './AuthSlice';
import regReducer from './RegisterSlice';

export default configureStore({

  reducer: {
    user: userReducer,
    auth: authReducer,
    reg: regReducer
  }

});
