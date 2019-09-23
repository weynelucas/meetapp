import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

import colors from '../styles/colors';

export default styled(Form)`
  display: flex;
  flex-direction: column;

  input,
  textarea,
  select,
  > div {
    & + input,
    & + textarea,
    & + select,
    & + div {
      margin-top: 10px;
    }
  }

  span {
    color: ${colors.danger};
    opacity: 0.6;
    margin: 5px 0 10px;
    font-size: 12px;
  }

  button {
    margin-top: 20px;
    align-self: flex-end;
  }
`;
