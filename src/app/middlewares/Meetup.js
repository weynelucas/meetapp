import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupMiddleware {
  /**
   * Middleware to check if meetup exists.
   * If the meetup exists, `req.meetup` will be set with the instance of
   * found model
   */
  async checkObject(req, res, next) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path'],
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({
        error: 'Meetup not found.',
      });
    }
    req.meetup = meetup;
    return next();
  }

  /**
   * Middleware to check if the logged user is the meetup owner.
   */
  async isOwner(req, res, next) {
    if (req.user.id !== req.meetup.userId) {
      return res.status(403).json({
        error: "You don't have permission to perform this action",
      });
    }

    return next();
  }

  /**
   * Middleware to check if the logged user is trying to change
   * a past meetup.
   */
  async isPastDate(req, res, next) {
    if (req.meetup.past) {
      return res
        .status(403)
        .json({ error: 'You cannot change meetups that already happened.' });
    }

    return next();
  }
}

export default new MeetupMiddleware();
