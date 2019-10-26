import Subscription from '../models/Subscription';
import Mailer from '../../lib/Mailer';

class CreateSubscriptionService {
  async run({ user, meetup }) {
    const { id } = await Subscription.create({
      userId: user.id,
      meetupId: meetup.id,
    });

    /**
     * Send subscription email to organizer
     */
    Mailer.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Você tem uma nova inscrição',
      template: 'subscription',
      context: {
        organizer: meetup.user.name,
        meetup: meetup.title,
        subscriber: user.name,
      },
    });

    return {
      id,
      meetup,
    };
  }
}

export default new CreateSubscriptionService();
