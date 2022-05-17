import './App.css';

import HomePage from './containers/HomePage';
import DashboardPage from './containers/DashboardPage';
import OrganizerDashboardPage from './containers/OrganizerDashboardPage';
import TourneyDashboardPage from './containers/TourneyDashboardPage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import FifaLeagueRegister from './containers/FifaLeagueRegister';
import TourneysPage from './containers/TourneysPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateToken } from './redux/AuthSlice';
import { updateUser, pending, error, deleteUser} from './redux/UserSlice';

import config from './config/config.js';


function App() {

  const dispatch = useDispatch();
  var auth = useSelector((state => state.auth));


  useEffect(() => {

    (async() => {
      dispatch(updateToken());
      dispatch(deleteUser());
      if(auth.accessToken != null){
        dispatch(pending());

        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/users/${auth.userId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken
          },
        };

        try {
          const response = await axios.request(options);
          if(response.data.status !== 'fail'){
            dispatch(updateUser(response.data.user));
          }
        } catch(e){
          console.log(e);
          dispatch(error());
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
              { auth.accessToken !== null  ? <Redirect to={`/dashboard`}/> : <HomePage/>}
            </Route>

            <Route path='/dashboard'>
              { auth.accessToken === null && <Redirect to={`/`}/>}
              <DashboardPage/>
            </Route>

            <Route path="/auth">
              <LoginPage/>
            </Route>

            <Route path='/organizer/tourneys/:tourneyId'>
              { auth.accessToken === null && <Redirect to={`/`}/>}            
              <TourneyDashboardPage/>
            </Route>            

            <Route path='/organizer'>
              { auth.accessToken === null && <Redirect to={`/`}/>}            
              <OrganizerDashboardPage/>
            </Route>

            <Route path='/organizer/tourney/:tourneyId'>
              <TourneyDashboardPage/>
            </Route>

            <Route path="/tourneys/:tourneyId">
              <FifaLeagueRegister/>
            </Route>

            <Route path="/tourneys">
              <TourneysPage/>
            </Route>
            
            <Route path="/profile/:profileId">
              { auth.accessToken === null && <Redirect to={`/`}/>}            
              <ProfilePage/>
            </Route>          
          </Switch>
        </Router>
      {/* </SkeletonTheme>     */}
    </>
  );
}

export default App;
