import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home'
import MapBoxAccidentContainer from '../containers/MapContainer';
import NotFound from './NotFound';
import Prediction from '../containers/Prediction';
import Register from '../containers/Register';
import Login from '../containers/Login';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/accidents-view' component={MapBoxAccidentContainer} />
      <Route exact path='/accidents-analysis' component={Prediction} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)

export default Main;