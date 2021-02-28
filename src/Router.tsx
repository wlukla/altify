import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeView from './views/Home';
import LoginView from './views/Login';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <HomeView />
      </Route>
      <Route path="/login" exact>
        <LoginView />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
