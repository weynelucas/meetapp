import produce from 'immer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  token: null,
  isSignedIn: false,
  isSigningIn: false,
  isSigningUp: false,
  signInErrors: {},
  signUpErrors: {},
};

function AuthReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.isSigningIn = true;
        draft.signInErrors = {};
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
        const { errors } = action;

        draft.isSignedIn = false;
        draft.isSigningIn = false;
        draft.signInErrors = errors || {};
        break;
      }

      case '@auth/SIGN_UP_REQUEST': {
        draft.isSigningUp = true;
        draft.signUpErrors = {};
        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        const { errors } = action;

        draft.isSigningUp = false;
        draft.signUpErrors = errors;
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
