import "./App.css";

import DashboardPage from "./containers/DashboardPage";
import OrganizerDashboardPage from "./containers/OrganizerDashboardPage";
import TourneyDashboardPage from "./containers/TourneyDashboardPage";
import LoginPage from "./containers/LoginPage";
import ProfilePage from "./containers/ProfilePage";
import FifaLeagueRegister from "./containers/FifaLeagueRegister";
import TourneysPage from "./containers/TourneysPage";

import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from './containers/Auth/RequireAuth';

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from './redux/AuthSlice';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const dispatch = useDispatch();
  const { accessToken: loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(updateToken());
  }, [dispatch]);

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Routes>
          <Route path="/" element={<Navigate to='/auth'/>}/>
          <Route path="/auth/*" element={loggedIn ? <Navigate to='/dashboard'/> : <LoginPage/>}/>
          <Route path="/profile/:profileId" element={<ProfilePage/>}/>
          
          <Route element={<RequireAuth/>}>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/organizer" element={<OrganizerDashboardPage/>}/>
            <Route path="/organizer/tourneys/:tourneyId" element={<TourneyDashboardPage/>}/>
            <Route path="/organizer/tourney/:tourneyId" element={<TourneyDashboardPage/>}/>
            <Route path="/tourneys/:tourneyId" element={<FifaLeagueRegister/>}/>
            <Route path="/tourneys" element={<TourneysPage/>}/>
          </Route>
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
