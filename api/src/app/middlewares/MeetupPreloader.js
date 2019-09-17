import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

/**
 * Preload meetup objects on routes with ':meetupId'
 */
export default async (req, res, next) => {
  const meetup = await Meetup.findByPk(req.params.meetupId, {
    include: [
      {
        model: File,
        as: 'banner',
        attributes: ['name', 'path'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['name', 'email'],
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
};
