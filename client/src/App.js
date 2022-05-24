import "./App.css";

import HomePage from "./containers/HomePage";
import DashboardPage from "./containers/DashboardPage";
import OrganizerDashboardPage from "./containers/OrganizerDashboardPage";
import TourneyDashboardPage from "./containers/TourneyDashboardPage";
import LoginPage from "./containers/LoginPage";
import ProfilePage from "./containers/ProfilePage";
import FifaLeagueRegister from "./containers/FifaLeagueRegister";
import TourneysPage from "./containers/TourneysPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, logout } from "./redux/AuthSlice";
import { updateUser, pending, deleteUser } from "./redux/UserSlice";

import config from "./config/config.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function App() {
  const dispatch = useDispatch();
  var auth = useSelector((state) => state.auth);

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
      {/* <SkeletonTheme> */}

      <Router>
        <Switch>

          <Route path="/" exact>
              <HomePage />
          </Route>

          <Route path="/auth">
            { auth.accessToken !== null && <Redirect to='/dashboard'/>}
            <LoginPage />
          </Route>

          <Route path="/profile/:profileId">
            <ProfilePage />
          </Route>          

          {auth.accessToken === null &&
           <Redirect to='/' />}

          {/* Below will be protected routes  */}

          <Route path="/dashboard">
            <DashboardPage />
          </Route>

          <Route path="/organizer/tourneys/:tourneyId">
            <TourneyDashboardPage />
          </Route>

          <Route path="/organizer">
            <OrganizerDashboardPage />
          </Route>

          <Route path="/organizer/tourney/:tourneyId">
            <TourneyDashboardPage />
          </Route>

          <Route path="/tourneys/:tourneyId">
            <FifaLeagueRegister />
          </Route>

          <Route path="/tourneys">
            <TourneysPage />
          </Route>


        </Switch>
      </Router>

      {/* </SkeletonTheme>     */}

      <ToastContainer/>
    </>
  );
}

export default App;
