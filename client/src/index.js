import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from "react-redux";
import userStore from "./redux/UserStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={userStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
