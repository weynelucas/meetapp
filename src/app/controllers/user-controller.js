import * as yup from 'yup';
import User from '../models/user';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
        .test(
          'is-unique',
          'a user is already registered with this e-mail address.',
          async email => {
            const user = await User.findOne({ where: { email } });
            return user === null;
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

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }

    const { id, email, name } = await User.create(req.body);
    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup
        .string()
        .email()
        .test(
          'is-unique',
          'a user is already registered with this e-mail address.',
          async email => {
            if (email && email !== req.user.email) {
              const user = await User.findOne({ where: { email } });
              return user === null;
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

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }

    const { id, name, email } = await req.user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
