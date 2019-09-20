export function loadMeetupsRequest() {
  return {
    type: '@meetups/LOAD_REQUEST',
  };
}

export function loadMeetupsSuccess(meetups) {
  return {
    type: '@meetups/LOAD_SUCCESS',
    meetups,
  };
}

export function loadMeetupsFailure(errors) {
  return {
    type: '@meetups/LOAD_FAILURE',
    errors,
  };
}

export function setCurrentMeetupRequest(meetupId) {
  return {
    type: '@meetups/SET_CURRENT_REQUEST',
    meetupId,
  };
}

export function setCurrentMeetupSuccess(meetup) {
  return {
    type: '@meetups/SET_CURRENT_SUCCESS',
    meetup,
  };
}

export function deleteMeetupRequest(meetupId) {
  return {
    type: '@meetups/DELETE_REQUEST',
    meetupId,
  };
}

export function deleteMeetupSuccess(meetupId) {
  return {
    type: '@meetups/DELETE_SUCCESS',
    meetupId,
  };
}
