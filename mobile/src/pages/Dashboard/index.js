import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, addDays, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import {
  Container,
  Header,
  HeaderAction,
  HeaderTitle,
  List,
  SubscribeButton,
} from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
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

  useEffect(() => {
    async function loadMeetups() {
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

    loadMeetups();
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "dd  'de' MMMM", { locale }),
    [date],
  );

  return (
    <Background>
      <Container>
        <Header>
          <HeaderAction onPress={() => setDate(addDays(date, -1))}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </HeaderAction>

          <HeaderTitle>{dateFormatted}</HeaderTitle>

          <HeaderAction onPress={() => setDate(addDays(date, 1))}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </HeaderAction>
        </Header>

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
