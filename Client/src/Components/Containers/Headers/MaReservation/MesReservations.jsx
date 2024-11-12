import styled from "styled-components";
import Login from "./components/Login";
import { useState } from "react";
import ConsulterReservations from "./components/ConsulterReservations";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonTest = styled.button`
  position: absolute;
  top: 20vh;
  right: 10px;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
    color: white;
  }
`;
function MesReservation() {
  const [login, setLogin] = useState(false);
  return (
    <Container>
      {/*a supprimer */}
      <ButtonTest
        onClick={() => {
          setLogin(!login);
        }}
      >
        Test
      </ButtonTest>
      {login ? <Login /> : <ConsulterReservations />}
    </Container>
  );
}

export default MesReservation;
