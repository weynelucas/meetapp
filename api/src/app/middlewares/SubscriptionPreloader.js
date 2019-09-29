import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

/**
 * Preload subscription objects on routes with ':subscriptionId'
 */
export default async (req, res, next) => {
  const subscription = await Subscription.findByPk(req.params.subscriptionId, {
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
        ],
        attributes: ['id', 'title', 'date', 'location'],
      },
    ],
  });

  req.subscription = subscription;

  return next();
};
