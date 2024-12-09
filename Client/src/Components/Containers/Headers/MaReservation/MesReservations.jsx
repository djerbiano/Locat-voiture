import styled from "styled-components";
import { AuthContext } from "../../../../Context/AuthContext.js";
import Login from "./components/Login";
import { useContext } from "react";
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

function MesReservation( { setLoading }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Container>
      {isAuthenticated ? <ConsulterReservations setLoading={setLoading}  />  : <Login setLoading={setLoading} /> }
    </Container>
  );
}

export default MesReservation;
