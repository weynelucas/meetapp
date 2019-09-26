import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';

export default function Subscriptions() {
  return <View />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" color={tintColor} size={20} />
  ),
};
