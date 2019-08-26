import * as Yup from 'yup';
import User from '../models/User';

export default class UpdateUser {
  static getRules(req) {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
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
      password: Yup.string().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf(
                [Yup.ref('password')],
                "the two password fields didn't match."
              )
          : field
      ),
      oldPassword: Yup.string().when('password', (password, field) =>
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
