import "./App.css";

import HomePage from "./containers/HomePage";
import DashboardPage from "./containers/DashboardPage";
import OrganizerDashboardPage from "./containers/OrganizerDashboardPage";
import TourneyDashboardPage from "./containers/TourneyDashboardPage";
import LoginPage from "./containers/LoginPage";
import ProfilePage from "./containers/ProfilePage";
import FifaLeagueRegister from "./containers/FifaLeagueRegister";
import TourneysPage from "./containers/TourneysPage";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, logout } from "./redux/AuthSlice";
import { updateUser, pending, deleteUser } from "./redux/UserSlice";

import { useGetUserQuery } from "./redux/UserApi";

import config from "./config/config.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { data } = useGetUserQuery(auth.userId);

  useEffect(() => {
    (async () => {
      dispatch(updateToken());
      dispatch(deleteUser());
      if (auth.accessToken != null) {
        dispatch(pending());

        const options = {
          method: "GET",
          url: `${config.serverUrl}/api/v1/users/${auth.userId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        };

        try {
          const response = await axios.request(options);
          if (response.data.status !== "fail") {
            dispatch(updateUser(response.data.user));
          }
        } catch (e) {
          console.log(e.response);
          // dispatch(error(e.response.data.errorList));
          dispatch(logout());
          dispatch(deleteUser());
        }
      }
    })();
  }, [auth.accessToken, auth.userId, dispatch]);

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Routes>
          <Route path="/" element={<Navigate to='/auth'/>}/>
          <Route path="/auth/*" element={auth.accessToken ? <Navigate to='/dashboard'/> : <LoginPage/>}/>
          <Route path="/profile/:profileId" element={<ProfilePage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/organizer" element={<OrganizerDashboardPage/>}/>
          <Route path="/organizer/tourneys/:tourneyId" element={<TourneyDashboardPage/>}/>
          <Route path="/organizer/tourney/:tourneyId" element={<TourneyDashboardPage/>}/>
          <Route path="/tourneys/:tourneyId" element={<FifaLeagueRegister/>}/>
          <Route path="/tourneys" element={<TourneysPage/>}/>
        </Routes>
      </SkeletonTheme>
      <ToastContainer
        theme="dark"
        position="bottom-center"
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        autoClose={1000}
      />
    </>
  );
}

export default App;
