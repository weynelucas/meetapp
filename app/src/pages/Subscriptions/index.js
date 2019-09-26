import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Subscriptions() {
  return <Background />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" color={tintColor} size={20} />
  ),
};
