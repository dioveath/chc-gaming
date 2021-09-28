import './App.css';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import FifaLeagueRegister from './containers/FifaLeagueRegister';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateToken } from './redux/AuthSlice';
import { updateUser } from './redux/UserSlice';


function App() {

  const dispatch = useDispatch();
  var auth = useSelector((state => state.auth));

  useEffect(async () => {

    dispatch(updateToken());

    if(auth.accessToken != null){
      const options = {
        method: 'GET',
        url: `http://localhost:5555/api/v1/users/${auth.userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.accessToken
        },
      };      

      var response = await axios.request(options);

      if(response.data.status != 'fail'){
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

  });

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage/>
          </Route>
          <Route path="/auth">
            <LoginPage/>
          </Route>
          <Route path="/leagues/fifa/s3">
            <FifaLeagueRegister/>
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
