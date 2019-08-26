import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.data;

    const user = await User.findOne({ email });

    if (!(user && user.checkPassword(password))) {
      return res.status(401).json({
        error: 'unable to login with provided credentials.',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.expiresIn,
    });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new SessionControler();
