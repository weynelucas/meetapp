import * as Yup from 'yup';
import User from '../models/User';

export default class UpdateUser {
  static getRules(req) {
    return Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email(req.t('email.notEmail'))
        .test(
          'email-already-registered',
          req.t('email.alreadyRegistered'),
          async email => {
            if (email && email !== req.user.email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string().min(6, req.t('password.toShort')),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required(req.t('required'))
              .oneOf([Yup.ref('password')], req.t('password.mismatch'))
          : field
      ),
      oldPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required(req.t('required'))
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
