import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(),
  password: Yup.string()
    .trim()
    .required(),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/signup">Criar conta grátis</Link>
    </>
  );
}
