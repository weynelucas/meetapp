import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 14px 20px 11px 20px;
  border-radius: 4px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.5)',
})`
  font-size: 18px;
  color: #fff;
`;
