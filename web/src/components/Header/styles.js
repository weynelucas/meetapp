import styled from 'styled-components';

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
    margin-left: 30px;
  }
`;
