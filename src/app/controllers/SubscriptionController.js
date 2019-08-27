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
    /**
     * Check owner subscription
     */
    if (req.meetup.userId === req.user.id) {
      return res.status(403).json({
        error: 'You cannot subscribe to your own meetups',
      });
    }

    /**
     * Check past meetup
     */
    if (req.meetup.past) {
      return res.status(403).json({
        error: 'You cannot subcribe to past meetups',
      });
    }

    /**
     * Check duplicated subscription
     */
    const checkSubscriptionExists = await Subscription.findOne({
      where: {
        userId: req.user.id,
        meetupId: req.meetup.id,
      },
    });

    if (checkSubscriptionExists) {
      return res.status(403).json({
        error: 'You cannot subscribe for the same meetup twice.',
      });
    }

    /**
     * Check subscription on two meetups at same
     */
    const checkSubscriptionSameDate = await Subscription.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: req.meetup.date },
        },
      ],
    });

    if (checkSubscriptionSameDate) {
      return res.status(403).json({
        error: 'You already subscribed to another meetup at this same time',
      });
    }

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
