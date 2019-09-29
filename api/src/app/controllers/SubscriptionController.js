import { Op } from 'sequelize';
import Mailer from '../../lib/nodemailer';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

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
    const { id } = await Subscription.create({
      userId: req.user.id,
      meetupId: req.meetup.id,
    });

    /**
     * Send subscription email to organizer
     */
    Mailer.sendMail({
      to: `${req.meetup.user.name} <${req.meetup.user.email}>`,
      subject: 'Você tem uma nova inscrição',
      template: 'subscription',
      context: {
        organizer: req.meetup.user.name,
        meetup: req.meetup.title,
        subscriber: req.user.name,
      },
    });

    return res.json({
      id,
      meetup: req.meetup,
    });
  }
}

export default new SubscriptionController();
