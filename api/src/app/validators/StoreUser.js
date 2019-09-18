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
          'Já existe um usuário cadastrado com este endereço de e-mail.',
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
          'Esta senha é muito curta. Ela precisa conter pelo menos ${min} caracteres.'
        )
        .required(),
      confirmPassword: Yup.string()
        .required()
        .when('password', (password, field) =>
          password
            ? field.oneOf(
                [Yup.ref('password')],
                'Os dois campos de senha não combinam.'
              )
            : field
        ),
    });
  }
}
