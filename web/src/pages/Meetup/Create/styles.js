import styled from 'styled-components';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    input,
    textarea,
    select {
      & + input,
      & + textarea,
      & + select {
        margin-top: 10px;
      }
    }

    hr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin: 30px 0 20px 0;
    }

    button {
      margin-top: 20px;
      align-self: flex-end;
    }
  }
`;
