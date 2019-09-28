/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, size, ...rest }) {
  return (
    <Container size={size} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text size={size}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
};

Button.defaultProps = {
  loading: false,
  size: 'large',
};
