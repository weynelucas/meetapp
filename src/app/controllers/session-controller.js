import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/user';

class SessionControler {
  async store(req, res) {
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

    return res.json({
      user,
      token,
    });
  }
}

export default new SessionControler();
