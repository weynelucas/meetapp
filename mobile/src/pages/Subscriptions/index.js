import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO, isAfter } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List, UnsubscribeButton } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  async function loadSubscriptions() {
    const response = await api.get('/subscriptions');

    const data = response.data.map(({ id, meetup }) => ({
      id,
      meetup: {
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale },
        ),
      },
    }));

    setSubscriptions(data);
  }

  function canUnsubscribe({ date }) {
    return isAfter(parseISO(date), new Date());
  }

  async function handleUnsubscripe(subscriptionId) {
    try {
      setIsUnsubscribing(true);
      await api.delete(`/subscriptions/${subscriptionId}/`);

      setSubscriptions(subscriptions.filter(s => s.id !== subscriptionId));
    } catch (err) {
      Alert.alert('Falha ao cancelar inscrição', err.response.data.error);
    } finally {
      setIsUnsubscribing(false);
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  return (
    <Background>
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup meetup={item.meetup}>
              {canUnsubscribe(item.meetup) ? (
                <UnsubscribeButton
                  loading={isUnsubscribing}
                  onPress={() => handleUnsubscripe(item.id)}>
                  Cancelar inscrição
                </UnsubscribeButton>
              ) : (
                <></>
              )}
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" color={tintColor} size={20} />
  ),
};
