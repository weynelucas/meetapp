import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowRight, MdAddCircleOutline } from 'react-icons/md';

import Button from '../../components/Button';
import { Header, MeetupList } from './styles';
import {
  loadMeetupsRequest,
  setCurrentMeetupRequest,
} from '../../store/modules/meetups/actions';
import history from '../../services/history';

export default function Dashborad() {
  const dispatch = useDispatch();

  const meetups = useSelector(state => state.meetups.items);

  useEffect(() => {
    dispatch(loadMeetupsRequest());
  }, [dispatch]);

  function handleDetailsNavigate(meetupId) {
    dispatch(setCurrentMeetupRequest(meetupId));
  }

  function handleCreateNavigate() {
    history.push('/meetup/create');
  }

  return (
    <>
      <Header>
        <h1>Meus meetups</h1>
        <Button onClick={handleCreateNavigate}>
          <MdAddCircleOutline size={20} />
          Novo meetup
        </Button>
      </Header>

      <MeetupList>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formattedDate}</span>
              <button
                type="button"
                onClick={() => handleDetailsNavigate(meetup.id)}>
                <MdKeyboardArrowRight size={26} />
              </button>
            </div>
          </li>
        ))}
      </MeetupList>
    </>
  );
}
