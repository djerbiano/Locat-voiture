import styled from "styled-components";
import LocationEnAttente from "./LocationEnAttente";
import LocationEnCours from "./LocationEnCours";
import LocationAVenir from "./LocationAVenir";
import ChiffresDaffaire from "./ChiffresDaffaire";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h2 {
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 100%;



  div {
    width: 200px;
    height: 100px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }
`;
function Activité() {

  return (
    <Container>
      <h2>Activités</h2>
      <Content>
        <LocationEnAttente />
        <LocationEnCours />
        <LocationAVenir />
        <ChiffresDaffaire />
      </Content>
    </Container>
  );
}

export default Activité;
