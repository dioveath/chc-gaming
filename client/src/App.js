import './App.css';
import HomePage from './containers/HomePage';
import DashboardPage from './containers/DashboardPage';
import OrganizerDashboardPage from './containers/OrganizerDashboardPage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import FifaLeagueRegister from './containers/FifaLeagueRegister';
import TourneysPage from './containers/TourneysPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateToken } from './redux/AuthSlice';
import { updateUser } from './redux/UserSlice';

import config from './config/config.js';


function App() {

  const dispatch = useDispatch();
  var auth = useSelector((state => state.auth));

  useEffect(() => {

    (async() => {
      dispatch(updateToken());

      if(auth.accessToken != null){
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/users/${auth.userId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken
          },
        };

        var response = await axios.request(options);

        if(response.data.status !== 'fail'){
          dispatch(updateUser({
            user_id: response.data.user.id,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            gaming_name: response.data.user.gaming_name,
            email: response.data.user.email,
            dob: response.data.dob
          }));
        }
      }
     })();

  }, [auth.accessToken, auth.userId, dispatch]);

  const user = useSelector(state => state.user);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage/>
          </Route>

          <Route path='/dashboard'>
            <DashboardPage/>
          </Route>

          <Route path="/auth">
            <LoginPage/>
          </Route>

          <Route path='/organizer'>
            <OrganizerDashboardPage/>
          </Route>

          <Route path="/tourneys/:tourneyId">
            <FifaLeagueRegister/>
          </Route>
          <Route path="/tourneys">
            <TourneysPage/>
          </Route>
          
          <Route path="/profile/:userId">
            <ProfilePage/>
          </Route>          
        </Switch>
      </Router>
    </>
  );
}

export default App;
