import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  errors: {},
  isUpdatingProfile: false,
};

export default function UserReducer(state = INITIAL_STATE, action) {
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
        draft.isUpdatingProfile = true;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { profile } = action.payload;
        draft.profile = profile;
        draft.errors = {};
        draft.isUpdatingProfile = false;
        break;
      }

      case '@user/UPDATE_PROFILE_FAILURE': {
        const { errors } = action.payload;
        draft.errors = errors;
        draft.isUpdatingProfile = false;
        break;
      }

      default:
    }
  });
}
