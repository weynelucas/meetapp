import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const List = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})``;

export const UnsubscribeButton = styled(Button).attrs({
  size: 'small',
})`
  margin-top: 15px;
  background-color: #d44059;
`;
