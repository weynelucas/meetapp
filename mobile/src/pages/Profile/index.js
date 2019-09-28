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
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const errors = useSelector(state => state.user.errors);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function cleanPasswordFields() {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        ...(oldPassword ? { oldPassword, password, confirmPassword } : {}),
      }),
    );
    cleanPasswordFields();
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);

    cleanPasswordFields();
  }, [profile]);

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
          {errors.name && <Feedback>{errors.name[0]}</Feedback>}

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
          {errors.email && <Feedback>{errors.email[0]}</Feedback>}

          <Separator />

          <FormInput
            name="oldPassword"
            placeholder="Senha atual"
            returnKeyType="next"
            secureTextEntry
            value={oldPassword}
            ref={oldPasswordRef}
            onChangeText={text => setOldPassword(text)}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {errors.oldPassword && <Feedback>{errors.oldPassword[0]}</Feedback>}

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
          {errors.password && <Feedback>{errors.password[0]}</Feedback>}

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
          {errors.confirmPassword && (
            <Feedback>{errors.confirmPassword[0]}</Feedback>
          )}

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
