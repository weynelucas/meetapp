import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 82px 20px 20px 20px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 30px 0 10px 0;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

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
