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
     * Checking organizer subscription
     */
    if (req.meetup.userId === req.user.id) {
      return res.status(403).json({
        error: req.t('subscription.ownMeetup'),
      });
    }

    /**
     * Checking past meetup
     */
    if (req.meetup.past) {
      return res.status(403).json({
        error: req.t('subscription.pastMeetup'),
      });
    }

    /**
     * Checking duplicated subscription
     */
    const checkSubscriptionExists = await Subscription.findOne({
      where: {
        userId: req.user.id,
        meetupId: req.meetup.id,
      },
    });

    if (checkSubscriptionExists) {
      return res.status(403).json({
        error: req.t('subscription.duplicated'),
      });
    }

    /**
     * Checking subscription on two meetups on the same date
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
        error: req.t('subscription.dateMismatch'),
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
