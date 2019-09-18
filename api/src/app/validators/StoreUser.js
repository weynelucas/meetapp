/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import User from '../models/User';

export default class StoreUser {
  static getRules() {
    return Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
        .test(
          'email-already-registered',
          'A user is already registered with this e-mail address.',
          async email => {
            if (email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string()
        .min(
          6,
          'This password is too short. It must contain at least ${min} characters.'
        )
        .required(),
      confirmPassword: Yup.string()
        .required()
        .when('password', (password, field) =>
          password
            ? field.oneOf(
                [Yup.ref('password')],
                "The two password fields didn't match."
              )
            : field
        ),
    });
  }
}
