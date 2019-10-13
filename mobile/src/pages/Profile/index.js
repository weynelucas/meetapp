import React, { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Feedback from '~/components/Feedback';

import {
  Container,
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
  const loading = useSelector(state => state.user.isUpdatingProfile);
  const errors = useSelector(state => state.user.updateProfileErrors);

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
      <ScrollView>
        <Container>
          <Form>
            <FormInput
              name="name"
              placeholder="Nome completo"
              autoCapitalize="words"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current.focus()}
            />
            {errors.name && <Feedback>{errors.name[0]}</Feedback>}

            <FormInput
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              returnKeyType="next"
              ref={emailRef}
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => oldPasswordRef.current.focus()}
            />
            {errors.email && <Feedback>{errors.email[0]}</Feedback>}

            <Separator />

            <FormInput
              name="oldPassword"
              placeholder="Senha atual"
              secureTextEntry
              returnKeyType="next"
              ref={oldPasswordRef}
              value={oldPassword}
              onChangeText={setOldPassword}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {errors.oldPassword && <Feedback>{errors.oldPassword[0]}</Feedback>}

            <FormInput
              name="password"
              placeholder="Nova senha"
              secureTextEntry
              returnKeyType="next"
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            {errors.password && <Feedback>{errors.password[0]}</Feedback>}

            <FormInput
              name="confirmPassword"
              placeholder="Confirmação de senha"
              secureTextEntry
              returnKeyType="send"
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onSubmitEditing={handleSubmit}
            />
            {errors.confirmPassword && (
              <Feedback>{errors.confirmPassword[0]}</Feedback>
            )}

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Salvar perfil
            </SubmitButton>
            <LogoutButton onPress={handleLogout}>Sair do Meetapp</LogoutButton>
          </Form>
        </Container>
      </ScrollView>
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
