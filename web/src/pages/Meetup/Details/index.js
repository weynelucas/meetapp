import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdEdit, MdDeleteForever, MdEventNote, MdPlace } from 'react-icons/md';

import history from '../../../services/history';
import { deleteMeetupRequest } from '../../../store/modules/meetups/actions';

import Button from '../../../components/Button';

import { Container, MeetupHeader, MeetupBody, MeetupFooter } from './styles';

export default function MeetupDetails() {
  const dispatch = useDispatch();

  const meetup = useSelector(state => state.meetups.current);

  function handleEdit() {
    history.push('/meetup/edit');
  }

  function handleDelete() {
    dispatch(deleteMeetupRequest(meetup.id));
  }

  return meetup ? (
    <Container>
      <MeetupHeader>
        {meetup.title}
        <div>
          <Button theme="info" onClick={handleEdit}>
            <MdEdit size={20} />
            Editar
          </Button>

          <Button onClick={handleDelete}>
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
