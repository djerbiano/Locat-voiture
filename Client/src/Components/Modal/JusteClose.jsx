import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: -10vh;
  bottom: -10vh;
  width: 100vw;
  background-color: #181c1d;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 50vw;
  min-height: 50vh;
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      margin: 20px 0px;
      font-weight: bold;
      
    }
  }

  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: darkgreen;
    }
  }
`;

function JusteClose({ setModalJustClose, content }) {
  return (
    <Container>
      <Content>
        <div>
          <h3>{content}</h3>
        </div>
        <button onClick={() => setModalJustClose(false)}>Fermer</button>
      </Content>
    </Container>
  );
}

export default JusteClose;
