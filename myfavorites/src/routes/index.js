import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/favorites" exact component={Favorites} isPrivate />
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
