import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { signInSuccess, signInFailure, signUpFailure } from './actions';

function setToken({ payload }) {
  if (payload && payload.token) {
    api.defaults.headers.authorization = `Bearer ${payload.token}`;
  }
}

function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'login', payload);
    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    setToken({ payload: { token } });

    history.push('/dashboard');
  } catch (err) {
    const { status, data } = err.response;

    if (status === 401) {
      toast.error(data.error);
    }

    yield put(signInFailure());
  }
}

function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', payload);
    history.push('/');
  } catch (err) {
    const { status, data } = err.response;

    if (status === 400) {
      yield put(signUpFailure(data));
    }
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
