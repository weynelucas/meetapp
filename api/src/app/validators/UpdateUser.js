/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import User from '../models/User';

export default class UpdateUser {
  static getRules(req) {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .test(
          'email-already-registered',
          'A user is already registered with this e-mail address.',
          async email => {
            if (email && email !== req.user.email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string().min(
        6,
        'This password is too short. It must contain at least ${min} characters.'
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf(
                [Yup.ref('password')],
                "The two password fields didn't match."
              )
          : field
      ),
      oldPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .test(
                'incorrect-old-password',
                req.t('password.incorrectOldPassword'),
                value => req.user.checkPassword(value)
              )
          : field
      ),
    });
  }
}
