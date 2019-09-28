import React from 'react';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  MeetupCard,
  MeetupBannerContainer,
  MeetupBannerImage,
  MeetupContent,
  MeetupTitle,
  MeetupInfo,
  MeetupInfoText,
  MeetupActionButton,
} from './styles';

export default function Meetup({ meetup }) {
  return (
    <MeetupCard>
      <MeetupBannerContainer>
        <MeetupBannerImage source={{ uri: meetup.banner.url }} />
      </MeetupBannerContainer>

      <MeetupContent>
        <MeetupTitle>{meetup.title}</MeetupTitle>

        <MeetupInfo>
          <Icon name="date-range" size={14} color="#999" />
          <MeetupInfoText>{meetup.dateFormatted}</MeetupInfoText>
        </MeetupInfo>

        <MeetupInfo>
          <Icon name="place" size={14} color="#999" />
          <MeetupInfoText>{meetup.location}</MeetupInfoText>
        </MeetupInfo>

        <MeetupInfo>
          <Icon name="person" size={14} color="#999" />
          <MeetupInfoText>{meetup.user.name}</MeetupInfoText>
        </MeetupInfo>

        <MeetupActionButton>Realizar inscrição</MeetupActionButton>
      </MeetupContent>
    </MeetupCard>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    location: PropTypes.string,
    dateFormatted: PropTypes.string,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
