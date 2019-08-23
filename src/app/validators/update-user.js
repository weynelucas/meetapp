import * as yup from 'yup';
import User from '../models/user';

export default class UpdateUser {
  static getRules(req) {
    return yup.object().shape({
      name: yup.string(),
      email: yup
        .string()
        .email()
        .test(
          'is-unique',
          'a user is already registered with this e-mail address.',
          async email => {
            if (email && email !== req.user.email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: yup.string().min(6),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password
            ? field
                .required()
                .oneOf(
                  [yup.ref('password')],
                  "the two password fields didn't match."
                )
            : field
        ),
      oldPassword: yup
        .string()
        .when('password', (password, field) =>
          password
            ? field
                .required()
                .test(
                  'is-invalid',
                  'your old password was entered incorrectly',
                  value => req.user.checkPassword(value)
                )
            : field
        ),
    });
  }
}
