import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import { Container, Header, HeaderAction, HeaderTitle, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');

      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale },
          ),
        })),
      );
    }

    loadMeetups();
  }, []);

  return (
    <Background>
      <Container>
        <Header>
          <HeaderAction>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </HeaderAction>

          <HeaderTitle>31 de Maio</HeaderTitle>

          <HeaderAction>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </HeaderAction>
        </Header>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup meetup={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" color={tintColor} size={20} />
  ),
};
