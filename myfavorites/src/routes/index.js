import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';
import Beer from '../pages/Beer';
import Cartoon from '../pages/Cartoon';
import Space from '../pages/Space';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/admin" exact component={SignIn} />
        <Route path="/beer" exact component={Beer} />
        <Route path="/cartoon" exact component={Cartoon} />
        <Route path="/space" exact component={Space} />
        <Route path="/favorites" exact component={Favorites} isPrivate />
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
