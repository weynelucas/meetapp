import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { userId: req.user.id },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
          attributes: ['id', 'title', 'date', 'location'],
          where: {
            date: { [Op.gte]: new Date() },
          },
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const { user, meetup } = req;
    const subscription = await CreateSubscriptionService.run({
      user,
      meetup,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    await req.subscription.destroy();

    return res.status(204).json();
  }
}

export default new SubscriptionController();
