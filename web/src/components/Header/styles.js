import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 50px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 940px;
  margin: 0 auto;

  @media (max-width: 960px) {
    padding: 0 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: flex-start;

  div {
    strong {
      display: block;
    }

    a {
      text-align: right;
      display: block;
      margin-top: 5px;
      font-size: 12px;
      color: #fff;
      opacity: 0.6;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  button {
    border-radius: 4px;
    padding: 10px 20px;
    font-weight: bold;
    margin-left: 30px;
    background-color: #d44059;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.03, '#d44059')};
    }
  }
`;
