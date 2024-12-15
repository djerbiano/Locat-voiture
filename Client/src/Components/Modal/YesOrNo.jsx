import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: -10vh;
  bottom: -10vh;
  width: 100vw;
  background-color: #181c1d;
  overflow-y: scroll;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  max-height: 95vh;

  @media (max-width: 500px) {
    width: 80%;
  }


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
`;

const ContainerButton = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10%;

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

  :nth-child(1) {
    background-color: red;
  }
`;

function YesOrNo({ setModalYesOrNo, deleteBooking }) {
  return (
    <Container>
      <Content>
        <div>
          <h3>Vous voulez vraiment Supprimer ?</h3>
        </div>
        <ContainerButton>
          <button
            onClick={() => {
              setModalYesOrNo(false);
              deleteBooking();
            }}
          >
            Oui
          </button>
          <button onClick={() => setModalYesOrNo(false)}>Non</button>
        </ContainerButton>
      </Content>
    </Container>
  );
}

export default YesOrNo;
