import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight, MdAddCircleOutline } from 'react-icons/md';

import api from '../../services/api';

import Button from '../../components/Button';
import { Header, MeetupList } from './styles';

export default function Dashborad() {
  const [meetups, setMeetups] = useState([
    {
      title: 'Meetup de React Native',
      formattedDate: '24 de Junho, às 20h',
    },
    {
      title: 'NodeJS Meetup',
      formattedDate: '17 de Junho, às 13h',
    },
  ]);

  // useEffect(() => {
  //   (async function loadSubscriptions() {
  //     const response = await api.get('/organizing');
  //     setMeetups(response.data);
  //   })();
  // }, []);

  return (
    <>
      <Header>
        <h1>Meus meetups</h1>
        <Button>
          <MdAddCircleOutline size={20} />
          Novo meetup
        </Button>
      </Header>

      <MeetupList>
        {meetups.map(meetup => (
          <li>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formattedDate}</span>
              <MdKeyboardArrowRight />
            </div>
          </li>
        ))}
      </MeetupList>
    </>
  );
}
