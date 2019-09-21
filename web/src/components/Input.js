import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export default styled(Input)`
  background: rgba(0, 0, 0, 0.2);
  padding: 13px 20px;
  border-radius: 4px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
