import React, { useState, useEffect } from 'react';
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
  const errors = useSelector(state => state.user.errors);

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
      <Container>
        <Form>
          <FormInput
            name="name"
            placeholder="Nome completo"
            autoCapitalize="words"
            value={name}
            onChangeText={text => setName(text)}
          />
          {errors.name && <Feedback>{errors.name[0]}</Feedback>}

          <FormInput
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {errors.email && <Feedback>{errors.email[0]}</Feedback>}

          <Separator />

          <FormInput
            name="oldPassword"
            placeholder="Senha atual"
            secureTextEntry
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
          {errors.oldPassword && <Feedback>{errors.oldPassword[0]}</Feedback>}

          <FormInput
            name="password"
            placeholder="Nova senha"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {errors.password && <Feedback>{errors.password[0]}</Feedback>}

          <FormInput
            name="confirmPassword"
            placeholder="Confirmação de senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            onSubmitEditing={handleSubmit}
          />
          {errors.confirmPassword && (
            <Feedback>{errors.confirmPassword[0]}</Feedback>
          )}

          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetapp</LogoutButton>
        </Form>
      </Container>
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
