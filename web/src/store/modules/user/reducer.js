import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  errors: {},
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

      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { user } = action;
        draft.profile = user;
        draft.errors = {};
        break;
      }

      case '@user/UPDATE_PROFILE_FAILURE': {
        const { errors } = action;
        draft.errors = errors;
        break;
      }

      default:
    }
  });
}
