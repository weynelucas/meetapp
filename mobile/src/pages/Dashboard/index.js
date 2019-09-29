import React, { useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import { Container, Header, List, SubscribeButton } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [isSubscribing, setIsSubscribing] = useState(false);

  async function handleSubscription(meetupId) {
    try {
      setIsSubscribing(true);

      await api.post(`meetups/${meetupId}/subscriptions`);

      setMeetups(meetups.filter(m => m.id !== meetupId));
    } catch (err) {
      Alert.alert('Falha ao se inscrever no Meetup', err.response.data.error);
    } finally {
      setIsSubscribing(false);
    }
  }

  async function loadMeetups(date) {
    const response = await api.get('/meetups', { params: { date } });

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

  return (
    <Background>
      <Container>
        <Header onChangeDate={date => loadMeetups(date)} />

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup meetup={item}>
              <SubscribeButton
                loading={isSubscribing}
                onPress={() => handleSubscription(item.id)}>
                Realizar inscrição
              </SubscribeButton>
            </Meetup>
          )}
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
