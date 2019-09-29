import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';

import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';

export const Container = styled.View`
  flex: 1;
  padding: 82px 20px 0 20px;
`;

export const Header = styled(DatePicker)`
  align-self: stretch;
  margin: 10px 0;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 15px;
`;

export const List = styled(FlatList).attrs({
  showScrollIndicator: false,
})``;

export const SubscribeButton = styled(Button).attrs({
  size: 'small',
})`
  margin-top: 15px;
`;
