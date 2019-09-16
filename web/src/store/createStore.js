import { createStore, compose, applyMiddleware } from 'redux';

export default (reducer, middlewares) => {
  const composer =
    process.env.NODE_ENV === 'development'
      ? compose(
          applyMiddleware(...middlewares),
          console.tron.createEnhancer(),
        )
      : compose(applyMiddleware(...middlewares));

  return createStore(reducer, composer);
};
