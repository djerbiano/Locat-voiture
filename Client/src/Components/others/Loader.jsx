import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 10px solid;
  border-color: #c6c7dd;
  border-right-color: #c8152c;
  animation: spinner 1.5s infinite linear;
  z-index: 2000;
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}

export default Loader;
