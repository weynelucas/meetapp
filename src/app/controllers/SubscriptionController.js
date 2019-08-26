import Subscription from '../models/Subscription';

class SubscriptionController {
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

    const subscription = await Subscription.create({
      userId: req.user.id,
      meetupId: req.meetup.id,
    });

    const { id } = subscription;
    const meetup = await subscription.getMeetup();

    return res.json({
      id,
      meetup,
    });
  }
}

export default new SubscriptionController();
