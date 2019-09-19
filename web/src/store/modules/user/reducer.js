import produce from 'immer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const INITIAL_STATE = {
  profile: null,
  errors: {},
  isUpdating: false,
};

function UserReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { user } = action;
        draft.profile = user;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }

      case '@user/UPDATE_PROFILE_REQUEST': {
        draft.errors = {};
        draft.isUpdating = true;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { profile } = action;
        draft.profile = profile;
        draft.errors = {};
        draft.isUpdating = false;
        break;
      }

      case '@user/UPDATE_PROFILE_FAILURE': {
        const { errors } = action;
        draft.errors = errors;
        draft.isUpdating = false;
        break;
      }

      default:
    }
  });
}

export default persistReducer(
  {
    key: 'user',
    storage,
    whitelist: ['profile'],
  },
  UserReducer,
);
