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
          'is-unique',
          'a user is already registered with this e-mail address',
          async email => {
            if (email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string()
        .min(6)
        .required(),
      confirmPassword: Yup.string()
        .required()
        .when('password', (password, field) =>
          password
            ? field.oneOf(
                [Yup.ref('password')],
                "the two password fields didn't match"
              )
            : field
        ),
    });
  }
}
