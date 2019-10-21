import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import Background from '~/components/Background';

import { Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Background>
      <Header />
      <Container>{children}</Container>
    </Background>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
