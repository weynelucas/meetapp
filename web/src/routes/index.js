import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashborad from '../pages/Dashborad';
import Meetup from '../pages/Meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashborad} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup" component={Meetup} isPrivate />
    </Switch>
  );
}
