import React from 'react';
import MeetupForm from '../Form';

export default function CreateMeetup() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return <MeetupForm onSubmit={handleSubmit} />;
}
