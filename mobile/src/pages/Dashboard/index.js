import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, addDays, parseISO, isBefore, startOfDay } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import {
  Container,
  Header,
  HeaderAction,
  HeaderActionIcon,
  HeaderTitle,
  List,
  SubscribeButton,
} from './styles';

export default function Dashboard() {
  const today = new Date();

  const [date, setDate] = useState(today);
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

  const hasPreviousDate = useMemo(() => {
    return isBefore(startOfDay(addDays(date, -1)), startOfDay(today));
  }, [date]); // eslint-disable-line

  return (
    <Background>
      <Container>
        <Header>
          <HeaderAction
            onPress={() => setDate(addDays(date, -1))}
            disabled={hasPreviousDate}>
            <HeaderActionIcon
              disabled={hasPreviousDate}
              name="keyboard-arrow-left"
            />
          </HeaderAction>

          <HeaderTitle>{dateFormatted}</HeaderTitle>

          <HeaderAction onPress={() => setDate(addDays(date, 1))}>
            <HeaderActionIcon name="keyboard-arrow-right" />
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
