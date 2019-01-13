import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home'

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <Route component={NotFound}/> */}
    </Switch>
  </BrowserRouter>
)

export default Main;