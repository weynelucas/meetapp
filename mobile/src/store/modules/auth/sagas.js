import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
} from './actions';

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
  } catch (err) {
    if (err.response) {
      yield put(signInFailure(err.response.data));

      if (err.response.status === 401) {
        Alert.alert('Falha no login', err.response.data.error);
      }
    }
  }
}

function* signUp({ payload }) {
  try {
    const response = yield call(api.post, 'users', payload);

    yield put(signUpSuccess(response.data));
  } catch (err) {
    if (err.response && err.response.status === 400) {
      yield put(signUpFailure(err.response.data));
    }
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
