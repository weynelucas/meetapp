import { Op } from 'sequelize';
import Mailer from '../../lib/nodemailer';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { userId: req.user.id },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: { [Op.gte]: new Date() },
          },
          attributes: ['id', 'title', 'description', 'date'],
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
