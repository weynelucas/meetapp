import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Form from '~/components/Form';
import Input from '~/components/Input';
import BannerInput from '~/components/BannerInput';
import DatePickerInput from '~/components/DatePickerInput';
import Button from '~/components/Button';

import { Container } from './styles';

const schema = Yup.object().shape({
  banner: Yup.number()
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
  location: Yup.string().required('Este campo é obrigatório.'),
});

export default function MeetupForm({ meetup, onSubmit }) {
  function handleSubmit({ banner: bannerId, ...rest }) {
    onSubmit({ bannerId, ...rest });
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="banner" />
        <Input name="title" placeholder="Título do meetup" maxLength={60} />
        <Input
          name="description"
          placeholder="Descrição completa"
          multiline
          rows={5}
          maxLength={625}
        />
        <DatePickerInput name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <Button type="submit">
          <MdAddCircleOutline size={20} />
          Salvar meetup
        </Button>
      </Form>
    </Container>
  );
}

MeetupForm.propTypes = {
  meetup: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};

MeetupForm.defaultProps = {
  meetup: {},
  onSubmit: () => {},
};
