import styled from 'styled-components/native';

import Button from '../Button';

export const MeetupCard = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const MeetupBanner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  align-self: stretch;
  width: 450px;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

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
