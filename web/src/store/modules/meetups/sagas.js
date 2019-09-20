import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { parseISO, format } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '../../../services/api';
import history from '../../../services/history';
import {
  loadMeetupsFailure,
  loadMeetupsSuccess,
  setCurrentMeetupSuccess,
} from './actions';

function* loadMeetups() {
  try {
    const response = yield call(api.get, '/organizing');

    yield put(
      loadMeetupsSuccess(
        response.data.map(meetup => ({
          ...meetup,
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale },
          ),
        })),
      ),
    );
  } catch (err) {
    yield put(loadMeetupsFailure(err.response.data));
  }
}

function* setCurrentMeetup({ meetupId }) {
  const meetup = yield select(state =>
    state.meetups.items.find(m => m.id === meetupId),
  );

  if (meetup) {
    yield put(setCurrentMeetupSuccess(meetup));
    history.push('/meetup');
  } else {
    history.push('/');
  }
}

export default all([
  takeLatest('@meetups/LOAD_REQUEST', loadMeetups),
  takeLatest('@meetups/SET_CURRENT_REQUEST', setCurrentMeetup),
]);
