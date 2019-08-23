import * as yup from 'yup';
import User from '../models/user';

export default class StoreUser {
  static getRules() {
    return yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
        .test(
          'is-unique',
          'a user is already registered with this e-mail address.',
          async email => {
            if (email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: yup
        .string()
        .min(6)
        .required(),
      confirmPassword: yup
        .string()
        .required()
        .when('password', (password, field) =>
          password
            ? field.oneOf(
                [yup.ref('password')],
                "the two password fields didn't match."
              )
            : field
        ),
    });
  }
}
