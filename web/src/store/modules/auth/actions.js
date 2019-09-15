export function signInRequest(email, password) {
  return {
    type: '@user/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function signInSuccess(token) {
  return {
    type: '@user/SIGN_IN_SUCCESS',
    payload: {
      token,
    },
  };
}

export function signInFailure() {
  return {
    type: '@user/SIGN_IN_FAILURE',
  };
}
