/**
 * Detects when user trying to unsubscribe a past date meetup.
 */
export default (req, res, next) => {
  if (req.subscription.meetup.past) {
    res.status(403).json({
      error:
        'Você não pode cancelar a inscrição de um meetup que já aconteceu.',
    });
  }

  return next();
};
