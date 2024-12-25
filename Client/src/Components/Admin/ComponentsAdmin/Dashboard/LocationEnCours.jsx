import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GiRoad } from "react-icons/gi";

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
    color:rgb(0, 0, 0);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function LocationEnCours() {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/admin/locations")}>
      <GiRoad />
      <p>2</p>
      <p>Location en cours</p>
    </Container>
  );
}

export default LocationEnCours;
