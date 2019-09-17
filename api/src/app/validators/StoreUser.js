import * as Yup from 'yup';
import User from '../models/User';

export default class StoreUser {
  static getRules({ t }) {
    return Yup.object().shape({
      name: Yup.string().required(t('required')),
      email: Yup.string()
        .email(t('email.notEmail'))
        .required(t('required'))
        .test(
          'already-registered',
          t('email.alreadyRegistered'),
          async email => {
            if (email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string()
        .min(6, t('password.toShort'))
        .required(t('required')),
      confirmPassword: Yup.string()
        .required(t('required'))
        .when('password', (password, field) =>
          password
            ? field.oneOf([Yup.ref('password')], t('password.mismatch'))
            : field
        ),
    });
  }
}
