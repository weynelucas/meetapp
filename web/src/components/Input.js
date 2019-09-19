import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import colors from '../styles/colors';

export default styled(Input)`
  background: rgba(0, 0, 0, 0.2);
  padding: 13px 20px;
  border-radius: 4px;

  & + span {
    color: ${colors.danger};
    opacity: 0.6;
    margin: 5px 0 10px;
    font-size: 12px;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
