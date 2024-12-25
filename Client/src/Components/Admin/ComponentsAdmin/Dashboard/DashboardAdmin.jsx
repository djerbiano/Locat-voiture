import styled from "styled-components";
import Activité from "./Activité";
import Transactions from "./Transactions";
import Pourcentage from "./Pourcentage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  min-height: 50vh;
`;

const Statistiques = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
`;
function DashboardAdmin() {
  return (
    <Container>
      <Activité />
      <Statistiques>
        <Transactions />
        <Pourcentage />
      </Statistiques>
    </Container>
  );
}

export default DashboardAdmin;
