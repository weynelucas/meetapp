import jwt from 'jsonwebtoken';
import config from '../../config/auth';
import User from '../models/User';

/**
 * Middleware that authenticates callers using a JWT.
 * If the token is valid, `req.user` will be set with the JSON object
 * decoded to be used by later middleware for authorization and access control.
 */
export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.split(' ').length === 2)) {
    return res.status(401).json({
      error: 'As credenciais de autenticação não foram fornecidas.',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, config.secret);
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
