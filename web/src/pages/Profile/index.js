import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { ProfileForm } from './styles';

export default function Profile() {
  return (
    <ProfileForm>
      <Input name="name" type="text" placeholder="Nome completo" />
      <Input name="email" type="email" placeholder="E-mail" />

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
