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
    } catch (errors) {
      const fields = errors.inner.reduce((obj, err) => {
        obj[err.path] = err.errors;
        return obj;
      }, {});

      return res.status(400).json(fields);
    }
  };
};
