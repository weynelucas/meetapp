import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  h1 {
    font-size: 32px;
  }
`;

export const MeetupList = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 19px 30px;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    strong {
      font-size: 16px;
    }

    div {
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }

      button {
        background: none;
        color: #fff;
        margin-left: 45px;
      }
    }
  }
`;
