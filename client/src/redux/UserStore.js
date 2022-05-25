import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from './AuthSlice';
import regReducer from './RegisterSlice';
import tourneyReducer from './TourneySlice.js';
import organizerReducer from './OrganizerDashboardSlice.js';
import userDashboardReducer from './UserDashboardSlice.js';
import clipReducer from './ClipSlice';

export default configureStore({

  reducer: {
    user: userReducer,
    auth: authReducer,
    reg: regReducer,
    tourney: tourneyReducer,
    organizer: organizerReducer,
    userDashboard: userDashboardReducer,
    clip: clipReducer
  }

});
