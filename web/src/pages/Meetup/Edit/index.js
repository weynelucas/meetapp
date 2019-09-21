import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MeetupForm from '../Form';

export default function EditMeetup() {
  const meetup = useSelector(state => state.meetups.current);

  return meetup ? <MeetupForm meetup={meetup} /> : <Redirect to="/" />;
}
