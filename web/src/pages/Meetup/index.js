import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdEdit, MdDeleteForever, MdEventNote, MdPlace } from 'react-icons/md';

import Button from '../../components/Button';
import { Container, MeetupHeader, MeetupBody, MeetupFooter } from './styles';

export default function Meetup() {
  const meetup = useSelector(state => state.meetups.current);

  return meetup ? (
    <Container>
      <MeetupHeader>
        {meetup.title}
        <div>
          <Button theme="info">
            <MdEdit size={20} />
            Editar
          </Button>

          <Button>
            <MdDeleteForever size={20} />
            Cancelar
          </Button>
        </div>
      </MeetupHeader>

      <MeetupBody>
        <img src={meetup.banner.url} alt={meetup.title} />
        <p>{meetup.description}</p>
      </MeetupBody>

      <MeetupFooter>
        <span>
          <MdEventNote size={20} />
          {meetup.formattedDate}
        </span>
        <span>
          <MdPlace size={20} />
          Rua Guilherme Gembala, 260
        </span>
      </MeetupFooter>
    </Container>
  ) : (
    <Redirect to="/" />
  );
}
