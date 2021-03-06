import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import Form from '~/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';

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

  const errors = useSelector(state => state.auth.errors);

  function handleSubmit(data) {
    dispatch(signUpRequest(data));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        {errors.name && <span>{errors.name[0]}</span>}

        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        {errors.email && <span>{errors.email[0]}</span>}

        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        {errors.password && <span>{errors.password[0]}</span>}

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha secreta"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword[0]}</span>}

        <Button type="submit">Criar conta</Button>
      </Form>
      <Link to="/">Já tenho login</Link>
    </>
  );
}
