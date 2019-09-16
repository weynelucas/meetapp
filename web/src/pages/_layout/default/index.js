import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';

import { Container } from './styles';

export default function DefaulLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

DefaulLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
