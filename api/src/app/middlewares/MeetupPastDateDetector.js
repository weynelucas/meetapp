/**
 * Detects when meetup is from a past date.
 */
export default (req, res, next) => {
  if (req.meetup.past) {
    return res.status(403).json({
      error: 'Não é possível criar ou alterar meetups que já aconteceram.',
    });
  }

  return next();
};
