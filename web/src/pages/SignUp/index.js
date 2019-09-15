import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório.'),
  email: Yup.string()
    .trim()
    .email('Insira um endereço de e-mail válido.')
    .required('Este campo é obrigatório.'),
  password: Yup.string()
    .trim()
    .min(6, 'A senha deve conter no mínimo 6 caracteres.')
    .required('Este campo é obrigatório.'),
  confirmPassword: Yup.string()
    .required('Este campo é obrigatório.')
    .when('password', (password, field) =>
      password
        ? field.oneOf(
            [Yup.ref('password')],
            'Os dois campos de senha não coincidem.',
          )
        : field,
    ),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, confirmPassword }) {
    dispatch(signUpRequest(name, email, password, confirmPassword));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha secreta"
        />
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/">Já tenho login</Link>
    </>
  );
}
