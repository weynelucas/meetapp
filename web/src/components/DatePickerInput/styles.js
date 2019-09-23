import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = styled(ReactDatePicker)`
  background: rgba(0, 0, 0, 0.2);
  padding: 13px 20px;
  border-radius: 4px;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
