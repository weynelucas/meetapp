import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignInLink,
  SignInLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const passwordRef = useRef();

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            placeholder="Sua senha secreta"
            secureTextEntry
            returnKeyType="send"
            autoCapitalize="none"
            ref={passwordRef}
          />
          <SubmitButton>Entrar</SubmitButton>
        </Form>

        <SignInLink onPress={() => navigation.navigate('SignUp')}>
          <SignInLinkText>Criar conta gratuita</SignInLinkText>
        </SignInLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SignIn.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};
