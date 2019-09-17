import * as Yup from 'yup';
import User from '../models/User';

export default class StoreUser {
  static getRules(req) {
    return Yup.object().shape({
      name: Yup.string().required(req.t('required')),
      email: Yup.string()
        .email(req.t('email.notEmail'))
        .required(req.t('required'))
        .test(
          'email-already-registered',
          req.t('email.alreadyRegistered'),
          async email => {
            if (email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string()
        .min(6, req.t('password.toShort'))
        .required(req.t('required')),
      confirmPassword: Yup.string()
        .required(req.t('required'))
        .when('password', (password, field) =>
          password
            ? field.oneOf([Yup.ref('password')], req.t('password.mismatch'))
            : field
        ),
    });
  }
}
