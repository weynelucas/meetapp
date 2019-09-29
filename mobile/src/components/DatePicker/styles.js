import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 15px;
`;

export const Button = styled(TouchableOpacity)`
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonIcon = styled(Icon).attrs({
  size: 30,
  color: `#fff`,
})`
  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `}
`;
