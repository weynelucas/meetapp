import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled(KeyboardAwareScrollView).attrs({
  resetScrollToCoords: { x: 0, y: 0 },
})`
  padding: 82px 20px 0 20px;
`;

export const Separator = styled.View`
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 30px 0 10px 0;
`;

export const Form = styled.View``;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const LogoutButton = styled(Button).attrs({
  size: 'small',
})`
  margin-top: 15px;
  background-color: #d44059;
`;
