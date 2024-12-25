import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 40%;
`;

const Circle = styled.div`
  width: 90%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(
    green ${({ $percentage }) => $percentage}%,
    lightgray ${({ $percentage }) => $percentage}% 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// Contour intérieur pour cacher le remplissage
const InnerCircle = styled.div`
  width: 90%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
`;

const CenterText = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
`;
const Stock = styled.div``;

function Pourcentage() {
  const [percentage] = useState(50);
  return (
    <Container>
      <h2>Taux de rotation du parc</h2>
      <Circle $percentage={percentage}>
        <InnerCircle />
        <CenterText>{percentage}%</CenterText>
      </Circle>
      <Stock>
        <p>Stock: 10 voitures</p>
        <p>En location: 5 voitures</p>
      </Stock>
    </Container>
  );
}

export default Pourcentage;
