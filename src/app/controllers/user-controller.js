import * as yup from 'yup';
import User from '../models/user';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
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
                "The two password fields didn't match."
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
}

export default new UserController();
