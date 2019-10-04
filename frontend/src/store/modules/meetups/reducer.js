import produce from 'immer';

const INITIAL_STATE = {
  items: [],
  current: null,
  errors: {},
  isFetchingMeetups: false,
  isSavingMeetup: false,
};

export default function MeetupsReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetups/LOAD_REQUEST': {
        draft.isFetchingMeetups = true;
        break;
      }

      case '@meetups/LOAD_SUCCESS': {
        const { meetups } = action;
        draft.items = meetups;
        draft.isFetchingMeetups = false;
        break;
      }

      case '@meetups/LOAD_FAILURE': {
        draft.isFetchingMeetups = false;
        break;
      }

      case '@meetups/SET_CURRENT_SUCCESS': {
        const { meetup } = action;
        draft.current = meetup;
        break;
      }

      case '@meetup/ADD_REQUEST': {
        draft.isSavingMeetup = true;
        break;
      }

      case '@meetup/ADD_SUCCESS': {
        const { meetup } = action;
        draft.isSavingMeetup = false;
        draft.items.push(meetup);
        break;
      }

      case '@meetup/ADD_FAILURE': {
        const { errors } = action;
        draft.isSavingMeetup = false;
        draft.errors = errors;
        break;
      }

      case '@meetup/UPDATE_REQUEST': {
        draft.isSavingMeetup = true;
        break;
      }

      case '@meetup/UPDATE_SUCCESS': {
        const { meetup } = action;
        draft.isSavingMeetup = false;
        draft.items = draft.items.map(m => (m.id === meetup.id ? meetup : m));
        break;
      }

      case '@meetup/UPDATE_FAILURE': {
        const { errors } = action;
        draft.isSavingMeetup = false;
        draft.errors = errors;
        break;
      }

      case '@meetups/DELETE_SUCCESS': {
        const { meetupId } = action;
        draft.items = draft.items.filter(m => m.id !== meetupId);
        break;
      }

      default:
    }
  });
}
