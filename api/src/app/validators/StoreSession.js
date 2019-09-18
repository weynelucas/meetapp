/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    default: 'This field is invalid.',
    required: 'This field is required.',
  },
  string: {
    min: 'Ensure this field has at least ${min} characters.',
    max: 'Ensure this field has no more than ${max} characters.',
    email: 'Enter a valid e-mail address.',
  },
});

export default class StoreSession {
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
