import styled from "styled-components";
import Login from "./Login";
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
function MaReservation() {
  return (
    <Container>
      <Login />
    </Container>
  )
}

export default MaReservation