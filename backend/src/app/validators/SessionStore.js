/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

export default class SessionStore {
  static getRules() {
    return Yup.object().shape({
      email: Yup.string()
        .trim()
        .required(),
      password: Yup.string()
        .trim()
        .required(),
    });
  }
}
