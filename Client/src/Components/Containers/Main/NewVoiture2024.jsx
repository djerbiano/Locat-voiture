import styled from "styled-components";
import Pic2 from "../../../Assets/1.png";
import { useState } from "react";

const Vl = styled.div`
  height: 300px;
  width: 400px;
  margin: 20px;
  border-radius: 50px 0px 50px 0px;
  box-shadow: 0px 0px 10px white;

  @media (max-width: 750px) {
    width: 70vw;
    transition: all 0.2s ease;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${Pic2});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
`;

const Name = styled.div``;
const Prix = styled.div``;

const Reserver = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translateX(50%);
  text-transform: uppercase;
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$reserver ? "1" : "0")};

  &:hover {
    background-color: #a5a2a2;
    transition: all 0.2s ease;
  }
`;

const DetailsContainer = styled.div`
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: white;
  font-weight: bold;
  border-radius: 20px;
`;

const New2024 = styled.div`
  position: absolute;
  top: 20%;
  left: 0px;
  text-transform: uppercase;
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 0px 50px 50px 0px;
`;
function NewVoiture2024() {
  const [reserver, setReserver] = useState(false);
  return (
    <Vl
      onMouseEnter={() => setReserver(true)}
      onMouseLeave={() => setReserver(false)}
    >
      <ImageContainer>
        <New2024>New 2024</New2024>
        <Reserver $reserver={reserver}>Réserver</Reserver>
        <DetailsContainer>
          <Name>Mercedes-AMG GT</Name>
          <Prix>250 € / jour</Prix>
        </DetailsContainer>
      </ImageContainer>
    </Vl>
  );
}

export default NewVoiture2024;
