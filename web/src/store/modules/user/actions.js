export function updateProfileRequest(payload) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload };
}

export function updateProfileSuccess(profile) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', payload: { profile } };
}

export function updateProfileFailure(error) {
  return { type: '@user/UPDATE_PROFILE_FAILURE', payload: { error } };
}
