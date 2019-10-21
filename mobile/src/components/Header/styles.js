import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  height: ${getStatusBarHeight() + 64};
`;

export const Brand = styled.Image`
  width: 24px;
  height: 24px;
`;
