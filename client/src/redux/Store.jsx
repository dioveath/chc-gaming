import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import authReducer from "./AuthSlice";
import regReducer from "./RegisterSlice";
import tourneyReducer from "./TourneySlice";
import organizerReducer from "./OrganizerDashboardSlice";
import userDashboardReducer from "./UserDashboardSlice";
import clipReducer from "./ClipSlice";
import { clipApi } from "./ClipApi";
import { userApi } from "./UserApi";
import { tourneyApi } from "./TourneyApi";
import { apiSlice } from "./ApiSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    reg: regReducer,
    tourney: tourneyReducer,
    organizer: organizerReducer,
    userDashboard: userDashboardReducer,
    clip: clipReducer,
    api: apiSlice.reducer,
    clipApi: clipApi.reducer,
    userApi: userApi.reducer,
    tourneyApi: tourneyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
      .concat(clipApi.middleware)
      .concat(userApi.middleware)
    .concat(tourneyApi.middleware).concat(apiSlice.middleware),
});
