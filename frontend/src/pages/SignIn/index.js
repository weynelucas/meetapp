import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import Form from '~/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Este campo é obrigatório.'),
  password: Yup.string()
    .trim()
    .required('Este campo é obrigatório.'),
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
        <Button type="submit">Entrar</Button>
      </Form>
      <Link to="/signup">Criar conta grátis</Link>
    </>
  );
}
