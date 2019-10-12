import styled from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';

import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px 0 20px;
`;

export const Header = styled(DatePicker)`
  align-self: stretch;
  margin: 10px 0;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 'large',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingMore = styled(Loading).attrs({
  size: 'small',
})``;

export const List = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})``;

export const SubscribeButton = styled(Button).attrs({
  size: 'small',
})`
  margin-top: 15px;
`;
