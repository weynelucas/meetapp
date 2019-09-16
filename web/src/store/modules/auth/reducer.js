import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  errors: {},
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'persist/REHYDRATE': {
        const { payload } = action;
        draft = Object.assign(draft, {
          ...(payload ? payload.auth : {}),
          loading: false,
          errors: {},
        });
        break;
      }

      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action;
        draft.token = token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.signed = false;
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        draft.errors = {};
        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        const { errors } = action;
        draft.loading = true;
        draft.errors = errors;
        break;
      }

      default:
    }
  });
}
