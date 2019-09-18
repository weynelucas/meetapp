import styled from 'styled-components';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

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

    hr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin: 30px 0 20px 0;
    }
  }
`;
