export default (
  validator,
  { location = 'body', requestProperty = 'data' } = {}
) => {
  return async (req, res, next) => {
    const schema = validator.getRules(req);

    try {
      req[requestProperty] = await schema.validate(req[location], {
        abortEarly: false,
      });
      return next();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const fields = error.inner.reduce((obj, err) => {
          obj[err.path] = err.errors;
          return obj;
        }, {});

        return res.status(400).json(fields);
      }

      return next(error);
    }
  };
};
