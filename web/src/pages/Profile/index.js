import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { ProfileForm } from './styles';
import { updateProfileRequest } from '../../store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const errors = useSelector(state => state.user.errors || {});

  function handleSubmit({
    name,
    email,
    oldPassword,
    password,
    confirmPassword,
  }) {
    dispatch(
      updateProfileRequest({
        name,
        email,
        ...(oldPassword ? { oldPassword, password, confirmPassword } : {}),
      }),
    );
  }

  return (
    <ProfileForm initialData={profile} onSubmit={handleSubmit}>
      <Input name="name" type="text" placeholder="Nome completo" />
      {errors.name && <span>{errors.name[0]}</span>}

      <Input name="email" type="email" placeholder="E-mail" />
      {errors.email && <span>{errors.email[0]}</span>}

      <hr />

      <Input name="oldPassword" type="password" placeholder="Senha atual" />
      {errors.oldPassword && <span>{errors.oldPassword[0]}</span>}

      <Input name="password" type="password" placeholder="Nova senha" />
      {errors.password && <span>{errors.password[0]}</span>}

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirmação de senha"
      />
      {errors.confirmPassword && <span>{errors.confirmPassword[0]}</span>}

      <Button type="submit">
        <MdAddCircleOutline size={20} color="#fff" />
        Salvar perfil
      </Button>
    </ProfileForm>
  );
}
