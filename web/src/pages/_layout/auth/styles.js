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
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      & + input {
        margin-top: 10px;
      }
    }

    span {
      color: #d44059;
      opacity: 0.6;
      margin: 5px 0 10px;
      font-size: 12px;
    }

    button {
      margin-top: 15px;
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
