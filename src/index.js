import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GroupPicker from './GroupPicker'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Switch>
          <Route path="/groups">
            <GroupPicker />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

