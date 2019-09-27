import styled from 'styled-components/native';
import { FlatList, BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  margin: 62px 20px 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
`;

export const HeaderAction = styled(BorderlessButton).attrs({
  rippleColor: 'red',
})`
  padding: 5px;
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
