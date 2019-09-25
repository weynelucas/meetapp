import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
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
  } catch (err) {
    if (err.response && err.response.status === 401) {
      Alert.alert('Falha no login', err.response.data.error);
    }

    yield put(signInFailure());
  }
}

function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', payload);
  } catch (err) {
    if (err.response && err.response.status === 400) {
      yield put(signUpFailure(err.response.data));
      Alert.alert(
        'Falha no cadastro',
        'Não foi possível realizar o cadastro, favor verificar seus dados',
      );
    }
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
