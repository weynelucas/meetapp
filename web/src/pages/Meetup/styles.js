import styled from 'styled-components';

export const Container = styled.div``;

export const MeetupHeader = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  margin-bottom: 50px;

  div {
    display: flex;

    button:first-child {
      margin-right: 15px;
    }
  }
`;

export const MeetupBody = styled.div`
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  p {
    margin: 25px 0 30px;
    font-size: 16px;
  }
`;

export const MeetupFooter = styled.footer`
  display: flex;

  span {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);

    svg {
      margin-right: 10px;
    }

    &:first-child {
      margin-right: 30px;
    }
  }
`;