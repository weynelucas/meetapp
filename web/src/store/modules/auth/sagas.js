import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import { signInSuccess, signInFailure, signUpFailure } from './actions';
import history from '../../../services/history';

function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'login', payload);

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    const { status } = err.response;

    if (status === 401) {
      toast.error('Impossível fazer o login com as credenciais fornecidas.', {
        autoClose: 3000,
      });
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
]);
