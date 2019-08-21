import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/user';

class SessionControler {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: ['id', 'email', 'password'],
      where: { email },
    });

    if (!(user && user.checkPassword(password))) {
      return res.status(401).json({
        message: 'unable to login with provided credentials.',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.expiresIn,
    });

    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      token,
    });
  }
}

export default new SessionControler();
