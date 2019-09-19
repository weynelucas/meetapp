import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken } from 'polished';

import colors from '../styles/colors';

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 4px;
  background-color: ${props => colors[props.theme]};
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => darken(0.03, colors[props.theme])};
  }

  svg {
    margin-right: 10px;
  }
`;

Button.protoTypes = {
  theme: PropTypes.oneOf(['primary', 'info']),
};

Button.defaultProps = {
  theme: 'primary',
};

export default Button;
