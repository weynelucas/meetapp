import React from 'react';
import { MdEdit, MdDeleteForever, MdEventNote, MdPlace } from 'react-icons/md';

import Button from '../../components/Button';
import { Container, MeetupHeader, MeetupBody, MeetupFooter } from './styles';

export default function Meetup() {
  return (
    <Container>
      <MeetupHeader>
        Meetup de React Native
        <div>
          <Button theme="info">
            <MdEdit size={20} />
            Editar
          </Button>

          <Button>
            <MdDeleteForever size={20} />
            Cancelar
          </Button>
        </div>
      </MeetupHeader>

      <MeetupBody>
        <img
          src="http://localhost:3333/files/ba7fd1ff0311644705d6a2519b32f0ef.png"
          alt="Meetup de React Native"
        />
        <p>
          O Meetup de React Native é um evento que reúne a comunidade de
          desenvolvimento mobile utilizando React a fim de compartilhar
          conhecimento. Todos são convidados. Caso queira participar como
          palestrante do meetup envie um e-mail para
          organizacao@meetuprn.com.br.
        </p>
      </MeetupBody>

      <MeetupFooter>
        <span>
          <MdEventNote color="rgba(255,255,255,0.6)" size={20} />
          24 de Junho, às 20h
        </span>
        <span>
          <MdPlace color="rgba(255,255,255,0.6)" size={20} />
          Rua Guilherme Gembala, 260
        </span>
      </MeetupFooter>
    </Container>
  );
}
