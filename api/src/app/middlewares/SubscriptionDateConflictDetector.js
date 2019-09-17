import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

/**
 * Detects when user trying to subscribe for meetups that occurs on same time.
 */
export default async (req, res, next) => {
  const checkSubscriptionDateConflict = await Subscription.findOne({
    where: { userId: req.user.id },
    include: [
      {
        model: Meetup,
        as: 'meetup',
        where: { date: req.meetup.date },
      },
    ],
  });

  if (checkSubscriptionDateConflict) {
    return res.status(403).json({
      error: req.t('subscription.dateMismatch'),
    });
  }

  return next();
};
