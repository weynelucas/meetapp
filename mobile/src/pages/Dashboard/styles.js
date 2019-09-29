import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 82px 20px 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const HeaderAction = styled(TouchableOpacity)`
  padding: 5px;
  align-items: center;
  justify-content: center;
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
