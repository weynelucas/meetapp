import React from 'react';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { ProfileForm } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  return (
    <ProfileForm>
      <Input
        name="name"
        type="text"
        placeholder="Nome completo"
        value={profile.name}
      />
      <Input
        name="email"
        type="email"
        placeholder="E-mail"
        value={profile.email}
      />

      <hr />

      <Input name="oldPassword" type="password" placeholder="Senha atual" />
      <Input name="password" type="password" placeholder="Nova senha" />
      <Input
        name="passwordConfirm"
        type="password"
        placeholder="Confirmação de senha"
      />
      <Button type="submit">
        <MdAddCircleOutline size={20} color="#fff" />
        Salvar perfil
      </Button>
    </ProfileForm>
  );
}
