import React from 'react';
import { Form } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import BannerInput from '../../../components/BannerInput';

import { Container } from './styles';

export default function CreateMeetup() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <BannerInput name="bannerId" />
        <Input name="title" placeholder="Título do meetup" />
        <Input
          name="description"
          placeholder="Descrição completa"
          multiline
          rows={5}
        />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Descrição completa" />

        <Button type="submit">
          <MdAddCircleOutline size={20} />
          Salvar meetup
        </Button>
      </Form>
    </Container>
  );
}
