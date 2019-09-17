import Subscription from '../models/Subscription';

/**
 * Detects duplicated subscription.
 */
export default async (req, res, next) => {
  const checkSubscriptionDuplicated = await Subscription.findOne({
    where: {
      userId: req.user.id,
      meetupId: req.meetup.id,
    },
  });

  if (checkSubscriptionDuplicated) {
    return res.status(403).json({
      error: req.t('subscription.duplicated'),
    });
  }

  return next();
};
