import produce from 'immer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  token: null,
  isSignedIn: false,
  isSigningIn: false,
  isSigningUp: false,
  errors: {},
};

function AuthReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.isSigningIn = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action;
        draft.token = token;
        draft.isSignedIn = true;
        draft.isSigningIn = false;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.isSignedIn = false;
        draft.isSigningIn = false;
        break;
      }

      case '@auth/SIGN_UP_REQUEST': {
        draft.isSigningUp = true;
        draft.errors = {};
        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        const { errors } = action;
        draft.isSigningUp = false;
        draft.errors = errors;
        break;
      }

      case '@auth/SIGN_UP_SUCCESS': {
        draft.isSigningUp = false;
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
    storage: AsyncStorage,
    whitelist: ['token', 'isSignedIn'],
  },
  AuthReducer,
);
