import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import locale from 'date-fns/locale/pt-BR';
import { format, parseISO, isAfter } from 'date-fns';

import api from '~/services/api';

import Meetup from '~/components/Meetup';

import { List, UnsubscribeButton } from './styles';

function Subscriptions({ isFocused }) {
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
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  return (
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
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" color={tintColor} size={20} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
