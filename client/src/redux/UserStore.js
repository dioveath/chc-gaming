import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from './AuthSlice';
import regReducer from './RegisterSlice';
import tourneyReducer from './TourneySlice.js';

export default configureStore({

  reducer: {
    user: userReducer,
    auth: authReducer,
    reg: regReducer,
    tourney: tourneyReducer
  }

});
