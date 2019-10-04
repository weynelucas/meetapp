import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Content } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
