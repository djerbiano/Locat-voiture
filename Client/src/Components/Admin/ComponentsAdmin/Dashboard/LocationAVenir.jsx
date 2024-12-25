import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdEvent } from "react-icons/md";

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
    color: rgb(28, 162, 97);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function LocationAVenir() {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/admin/locations")}>
      <MdEvent />
      <p>5</p>
      <p>Location à venir</p>
    </Container>
  );
}

export default LocationAVenir;
