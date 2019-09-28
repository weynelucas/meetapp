import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, addDays, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import ContentWrapper from '~/components/ContentWrapper';
import Background from '~/components/Background';

import { Header, HeaderAction, HeaderTitle, List } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

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
      <ContentWrapper>
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
          renderItem={({ item }) => <Meetup meetup={item} />}
        />
      </ContentWrapper>
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
