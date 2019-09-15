import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  max-width: 315px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      background: rgba(0, 0, 0, 0.2);
      padding: 15px 20px;
      border-radius: 4px;

      & + input {
        margin-top: 10px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    button {
      margin-top: 15px;
      border-radius: 4px;
      background-color: #f94d6a;
      padding: 15px 20px;
      font-weight: bold;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${darken(0.03, '#f94d6a')};
      }
    }
  }

  a {
    margin-top: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.6);
  }
`;
