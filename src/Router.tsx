import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeView from './views/Home';
import LoginView from './views/Login';
import LikedView from './views/Liked';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <HomeView />
      </Route>
      <Route path="/login" exact>
        <LoginView />
      </Route>
      <Route path="/liked" exact>
        <LikedView />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
