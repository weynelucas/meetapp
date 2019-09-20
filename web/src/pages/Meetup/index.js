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
          A maior conferência do ecossistema React da América Latina. Como nas
          conferências dos Estados Unidos e Europa, reunimos desenvolvedores,
          empresas e estudantes de tecnologia para compartilhar experiências no
          desenvolvimento de aplicações reativas.,
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
