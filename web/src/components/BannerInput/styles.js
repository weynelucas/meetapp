import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    height: 300px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
    }

    &:hover {
      opacity: 0.7;
    }

    input {
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.3);

      strong {
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
`;
