import React from 'react';
import { Form } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { parse, isValid } from 'date-fns';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BannerInput from '../../../components/BannerInput';

import { Container } from './styles';

const schema = Yup.object().shape({
  bannerId: Yup.number()
    .integer()
    .min(0)
    .required('Este campo é obrigatório.'),
  title: Yup.string()
    .trim()
    .required('Este campo é obrigatório.'),
  description: Yup.string()
    .trim()
    .required('Este campo é obrigatório.'),
  date: Yup.date()
    .typeError('Formato inválido para data.')
    .required('Este campo é obrigatório.')
    .min(new Date(), 'Não é possível registrar eventos que já aconteceram.'),
});

export default function CreateMeetup() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="bannerId" />
        <Input name="title" placeholder="Título do meetup" />
        <Input
          name="description"
          placeholder="Descrição completa"
          multiline
          rows={5}
        />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <Button type="submit">
          <MdAddCircleOutline size={20} />
          Salvar meetup
        </Button>
      </Form>
    </Container>
  );
}
