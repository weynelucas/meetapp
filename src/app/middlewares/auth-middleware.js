import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/user';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.split(' ').length === 2)) {
    return res.status(401).json({
      message: 'authentication credetials were not provided.',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, config.secret);
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ message: 'user not found.' });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
