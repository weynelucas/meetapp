import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.data;

    const user = await User.findOne({ where: { email } });

    if (!(user && user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Impossível fazer o login com as credenciais fornecidas.',
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
