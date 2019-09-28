import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: #f94d6a;
  height: ${props => (props.size === 'small' ? '42px' : '50px')};
  border-radius: 4px;
  padding: 13px 0;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${props => (props.size === 'small' ? '16px' : '18px')};
  font-weight: bold;
  color: #fff;
`;
