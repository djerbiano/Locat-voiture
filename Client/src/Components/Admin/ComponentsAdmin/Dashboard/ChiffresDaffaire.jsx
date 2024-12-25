import styled from "styled-components";
import { FaChartBar } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  svg {
    font-size: 40px;
    color: rgb(68, 203, 56);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function ChiffresDaffaire() {
  return (
    <Container>
      <FaChartBar />
      <p>74 000 €</p>
      <p>Chiffres d'affaire</p>
    </Container>
  );
}

export default ChiffresDaffaire;
