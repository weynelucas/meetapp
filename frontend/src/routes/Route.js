/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from '~/pages/_layout/auth';
import DefaultLayout from '~/pages/_layout/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  if (!isSignedIn && isPrivate) {
    return <Redirect to="/" />;
  }

  if (isSignedIn && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = isPrivate ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
