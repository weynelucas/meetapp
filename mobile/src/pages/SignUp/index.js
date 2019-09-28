import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Background from '~/components/Background';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import Feedback from '~/components/Feedback';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isSigningUp);
  const errors = useSelector(state => state.auth.signUpErrors);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function handleSubmit() {
    dispatch(signUpRequest({ name, email, password, confirmPassword }));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Nome completo"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={text => setName(text)}
          />
          {errors.name && <Feedback>{errors.name}</Feedback>}

          <FormInput
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {errors.email && <Feedback>{errors.email}</Feedback>}

          <FormInput
            placeholder="Sua senha secreta"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {errors.password && <Feedback>{errors.password}</Feedback>}

          <FormInput
            placeholder="Confirmação de senha"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          {errors.confirmPassword && (
            <Feedback>{errors.confirmPassword}</Feedback>
          )}

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho login</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SignUp.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};
