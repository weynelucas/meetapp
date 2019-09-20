import produce from 'immer';

const INITIAL_STATE = {
  items: [],
  errors: [],
  current: null,
  isLoadingMeetups: false,
};

export default function MeetupsReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/LOAD_REQUEST': {
        draft.isLoadingMeetups = true;
        break;
      }
        
      case '@meetups/LOAD_SUCCESS': {
        const { meetups } = action;
        draft.items = meetups;
        draft.isLoadingMeetups = false;
        break;
      }

      case '@meetups/LOAD_FAILURE': {
        const { errors } = action;
        draft.errors = errors;
        draft.isLoadingMeetups = false;
        break;
      }

      case '@meetups/SET_CURRENT_SUCCESS': {
        const { meetup } = action;
        draft.current = meetup;
        break;
      }

      default:
    }
  });
}
