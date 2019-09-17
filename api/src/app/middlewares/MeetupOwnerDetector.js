/**
 * Detects when logged user is not the meetup owner.
 */
export default (req, res, next) => {
  if (req.user.id !== req.meetup.userId) {
    return res.status(403).json({
      error: "You don't have permission to perform this action",
    });
  }

  return next();
};
