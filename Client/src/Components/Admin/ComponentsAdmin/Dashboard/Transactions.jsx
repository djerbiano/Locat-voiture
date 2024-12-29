import styled from "styled-components";
import GraphYear from "./GraphYear";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 60%;
`;

const ChartContainer = styled.div`
  width: 80%;
`;

const Chart1 = styled.div`
  width: 100%;
  padding: 10px;
 
`;

function Transactions() {
  return (
    <Container>
      <h2>Volume de transactions par mois</h2>
      <ChartContainer>
        <Chart1>
          <GraphYear />
        </Chart1>
      </ChartContainer>
    </Container>
  );
}

export default Transactions;
