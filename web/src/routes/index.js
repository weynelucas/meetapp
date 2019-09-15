import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashborad from '../pages/Dashborad';
import Meetup from '../pages/Meetup';

// import { Container } from './styles';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashborad} />
      <Route path="/profile" component={Profile} />
      <Route path="/meetup" component={Meetup} />
    </Switch>
  );
}
