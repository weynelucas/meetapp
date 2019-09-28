import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import ContentWrapper from '~/components/ContentWrapper';
import Feedback from '~/components/Feedback';

import {
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [oldpassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
  }, [profile]);

  function cleanPasswordFields() {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }

  function handleSubmit() {
    cleanPasswordFields();
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <ContentWrapper>
        <Form>
          <FormInput
            name="name"
            placeholder="Nome completo"
            autoCapitalize="words"
            returnKeyType="next"
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <FormInput
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
            returnKeyType="send"
            value={email}
            ref={emailRef}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={handleSubmit}
          />

          <Separator />

          <FormInput
            name="oldPassword"
            placeholder="Senha atual"
            returnKeyType="next"
            secureTextEntry
            value={oldpassword}
            ref={oldPasswordRef}
            onChangeText={text => setOldPassword(text)}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />

          <FormInput
            name="password"
            placeholder="Nova senha"
            returnKeyType="next"
            secureTextEntry
            value={password}
            ref={passwordRef}
            onChangeText={text => setPassword(text)}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />

          <FormInput
            name="confirmPassword"
            placeholder="Confirmação de senha"
            returnKeyType="send"
            secureTextEntry
            value={confirmPassword}
            ref={confirmPasswordRef}
            onChangeText={text => setConfirmPassword(text)}
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetapp</LogoutButton>
        </Form>
      </ContentWrapper>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" color={tintColor} size={20} />
  ),
};
