/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Platform,
  ActivityIndicator,
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, style, loading, ...rest }) {
  return (
    <TouchableNativeFeedback
      background={
        Platform.OS === 'android'
          ? TouchableNativeFeedback.SelectableBackground()
          : ''
      }
      {...rest}>
      <Container style={style}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text>{children}</Text>
        )}
      </Container>
    </TouchableNativeFeedback>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  loading: false,
  style: {},
};
