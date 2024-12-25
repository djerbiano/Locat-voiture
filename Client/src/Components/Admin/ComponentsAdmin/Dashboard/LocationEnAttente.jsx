import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiAlertOctagon } from "react-icons/fi";

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
    color:rgb(232, 38, 38);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function LocationEnAttente() {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/admin/locations")}>
      <FiAlertOctagon />
      <p>5</p>
      <p>Location en attente</p>
    </Container>
  );
}

export default LocationEnAttente;
