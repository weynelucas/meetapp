import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import { signInSuccess, signInFailure } from './actions';
import history from '../../../services/history';

function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'login', payload);

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    const { error } = err.response.data;
    toast.error(error);
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
