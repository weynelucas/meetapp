import React from 'react';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import { Container } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
