import React, { forwardRef } from 'react';
import { ViewPropTypes } from 'react-native';

import { Container, TInput } from './styles';

function Input({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  style: ViewPropTypes.style,
};

Input.defaultProps = {
  style: {},
};

export default forwardRef(Input);
