import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload;
    const response = yield call(api.put, '/users', {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    });

    yield put(updateProfileSuccess(response.data));

    toast.success('Perfil editado com sucesso.', {
      autoClose: 3000,
    });
  } catch (err) {
    yield put(updateProfileFailure(err.response.data));
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
