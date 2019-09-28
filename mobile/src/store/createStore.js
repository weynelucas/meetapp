import { createStore, compose, applyMiddleware } from 'redux';

export default (reducer, middlewares) => {
  const composer = __DEV__
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer(),
      )
    : compose(applyMiddleware(...middlewares));

  return createStore(reducer, composer);
};
