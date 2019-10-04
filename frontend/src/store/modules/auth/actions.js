export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    token,
    user,
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signUpRequest(payload) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload,
  };
}

export function signUpFailure(errors) {
  return {
    type: '@auth/SIGN_UP_FAILURE',
    errors,
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
