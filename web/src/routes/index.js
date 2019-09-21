import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashborad from '../pages/Dashborad';
import MeetupDetails from '../pages/Meetup/Details';
import CreateMeetup from '../pages/Meetup/Create';
import EditMeetup from '../pages/Meetup/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashborad} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup" exact component={MeetupDetails} isPrivate />
      <Route path="/meetup/create" component={CreateMeetup} isPrivate />
      <Route path="/meetup/edit" component={EditMeetup} isPrivate />
    </Switch>
  );
}
