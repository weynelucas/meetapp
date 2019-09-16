import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>

        <nav>
          <Profile>
            <div>
              <strong>Lucas Weyne</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <button type="button">Sair</button>
          </Profile>
        </nav>
      </Content>
    </Container>
  );
}
