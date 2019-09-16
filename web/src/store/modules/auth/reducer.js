import produce from 'immer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const INITIAL_STATE = {
  token: null,
  isSignedIn: false,
  isLoggingIn: false,
  errors: {},
};

function AuthReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action;
        draft.token = token;
        draft.isSignedIn = true;
        draft.isLoggingIn = false;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.isSignedIn = false;
        draft.isLoggingIn = false;
        break;
      }

      case '@auth/SIGN_UP_REQUEST': {
        draft.isLoggingIn = true;
        draft.errors = {};
        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        const { errors } = action;
        draft.isLoggingIn = true;
        draft.errors = errors;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.isSignedIn = false;
        break;
      }

      default:
    }
  });
}

export default persistReducer(
  {
    key: 'auth',
    storage,
    blacklist: ['isLoggingIn', 'errors'],
  },
  AuthReducer,
);
