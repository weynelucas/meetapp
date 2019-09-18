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
          'Já existe um usuário cadastrado com este endereço de e-mail.',
          async email => {
            if (email && email !== req.user.email) {
              return !(await User.findOne({ where: { email } }));
            }
            return true;
          }
        ),
      password: Yup.string().min(
        6,
        'Esta senha é muito curta. Ela precisa conter pelo menos ${min} caracteres.'
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf(
                [Yup.ref('password')],
                'Os dois campos de senha não combinam.'
              )
          : field
      ),
      oldPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .test(
                'incorrect-old-password',
                'A senha antiga foi digitada incorretamente.',
                value => req.user.checkPassword(value)
              )
          : field
      ),
    });
  }
}
