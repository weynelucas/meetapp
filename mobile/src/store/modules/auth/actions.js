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

export function signInFailure(errors) {
  return {
    type: '@auth/SIGN_IN_FAILURE',
    errors,
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

export function signUpSuccess(user) {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    user,
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
