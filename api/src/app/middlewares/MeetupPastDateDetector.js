/**
 * Detects if the meetup is from a past date.
 */
export default (req, res, next) => {
  if (req.meetup.past) {
    return res
      .status(403)
      .json({ error: 'You cannot change meetups that already happened.' });
  }

  return next();
};
