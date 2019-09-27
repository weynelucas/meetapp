import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Button from '../Button';

export const MeetupCard = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const MeetupBannerContainer = styled.View`
  align-self: stretch;
  height: 150px;
`;

export const MeetupBannerImage = styled.Image.attrs({
  ...StyleSheet.absoluteFillObject,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
})``;

export const MeetupContent = styled.View`
  padding: 20px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const MeetupInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

export const MeetupInfoText = styled.Text`
  flex: 1;
  color: #999;
  font-size: 13px;
  margin-left: 5px;
`;

export const MeetupActionButton = styled(Button)`
  margin-top: 13px;
  padding: 11px 0 7px 0;
`;
