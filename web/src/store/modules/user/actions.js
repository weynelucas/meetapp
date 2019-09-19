export function updateProfileRequest(payload) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload };
}

export function updateProfileSuccess(user) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', user };
}

export function updateProfileFailure(errors) {
  return { type: '@user/UPDATE_PROFILE_FAILURE', errors };
}
