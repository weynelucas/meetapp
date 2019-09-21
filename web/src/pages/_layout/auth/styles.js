import styled from 'styled-components';

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
    width: 100%;

    button {
      margin-top: 15px;
      align-self: stretch;
    }
  }

  a {
    margin-top: 20px;
    font-weight: bold;
    color: #fff;
    opacity: 0.6;

    &:hover {
      opacity: 0.8;
    }
  }
`;
