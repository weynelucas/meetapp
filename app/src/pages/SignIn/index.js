import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const passwordRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

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
            value={email}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            placeholder="Sua senha secreta"
            secureTextEntry
            returnKeyType="send"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            onSubmitEditing={handleSubmit}
            ref={passwordRef}
          />

          <SubmitButton onPress={handleSubmit}>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
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
