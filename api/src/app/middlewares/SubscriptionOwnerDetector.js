/**
 * Detects when organizer trying to subscribe for the meetup.
 */
export default (req, res, next) => {
  if (req.meetup.userId === req.user.id) {
    return res.status(403).json({
      error: 'Você não pode se inscrever no próprio evento.',
    });
  }

  return next();
};
