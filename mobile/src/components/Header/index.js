import React from 'react';
import logo from '~/assets/logo.png';

import { Container, Brand } from './styles';

export default function Header() {
  return (
    <Container>
      <Brand source={logo} />
    </Container>
  );
}
