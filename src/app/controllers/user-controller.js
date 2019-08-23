import User from '../models/user';

class UserController {
  async store(req, res) {
    const { id, email, name } = await User.create(req.body);
    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id, name, email } = await req.user.update(req.data);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
