import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight, MdAddCircleOutline } from 'react-icons/md';

import api from '../../services/api';

import Button from '../../components/Button';
import { Header, MeetupList } from './styles';

export default function Dashborad() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async function loadSubscriptions() {
      const response = await api.get('/organizing');
      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale: ptBR },
          ),
        })),
      );
    })();
  }, []);

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
              <Link to="/meetup">
                <MdKeyboardArrowRight size={26} />
              </Link>
            </div>
          </li>
        ))}
      </MeetupList>
    </>
  );
}
