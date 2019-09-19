export function updateProfileRequest(payload) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload };
}

export function updateProfileSuccess(profile) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', profile };
}

export function updateProfileFailure(errors) {
  return { type: '@user/UPDATE_PROFILE_FAILURE', errors };
}
