import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import meetups from './meetups/reducer';

const reducers = combineReducers({
  auth,
  user,
  meetups,
});

export default reducers;
