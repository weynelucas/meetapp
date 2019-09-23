import React from 'react';
import { useDispatch } from 'react-redux';

import { addMeetupRequest } from '~/store/modules/meetups/actions';

import MeetupForm from '../Form';

export default function CreateMeetup() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(addMeetupRequest(data));
  }

  return <MeetupForm onSubmit={handleSubmit} />;
}
