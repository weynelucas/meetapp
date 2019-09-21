import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MeetupForm from '../Form';
import { updateMeetupRequest } from '../../../store/modules/meetups/actions';

export default function EditMeetup() {
  const dispatch = useDispatch();

  const meetup = useSelector(state => state.meetups.current);

  function handleSubmit(data) {
    dispatch(updateMeetupRequest(meetup.id, data));
  }

  return meetup ? (
    <MeetupForm meetup={meetup} onSubmit={handleSubmit} />
  ) : (
    <Redirect to="/" />
  );
}
