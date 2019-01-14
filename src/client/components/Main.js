import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home'
import Prediction from '../containers/Prediction';

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <Route component={NotFound}/> */}
    </Switch>
  </BrowserRouter>
)

export default Main;