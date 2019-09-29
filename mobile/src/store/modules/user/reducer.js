import produce from 'immer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  profile: null,
  isUpdatingProfile: false,
  updateProfileErrors: {},
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
        draft.updateProfileErrors = {};
        draft.isUpdatingProfile = true;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { profile } = action;
        draft.profile = profile;
        draft.updateProfileErrors = {};
        draft.isUpdatingProfile = false;
        break;
      }

      case '@user/UPDATE_PROFILE_FAILURE': {
        const { errors } = action;
        draft.updateProfileErrors = errors;
        draft.isUpdatingProfile = false;
        break;
      }

      default:
    }
  });
}

export default persistReducer(
  {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['profile'],
  },
  UserReducer,
);
