import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 15px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    height: 300px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
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
