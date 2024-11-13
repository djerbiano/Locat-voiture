import styled from "styled-components";
import { IoCarSportSharp } from "react-icons/io5";

const VoituressNeuves = styled.div`
  height: 300px;
  width: 400px;
  margin: 20px;
  border-radius: 0px 50px 0px 50px;
  box-shadow: 0px 0px 10px white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .icon {
    font-size: 3em;
    color: #96d900;
    margin-bottom: 10px;
  }

  @media (max-width: 750px) {
    width: 70vw;
    transition: all 0.2s ease;
  }

  p {
    margin: 0px 20px;
    font-size: 1.1em;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }
`;
function VoituresNeuves({ setModalContent, setModalJustClose }) {
  const modalContent =
    "Roulez avec style et confort grâce à notre flotte de voitures neuves. " +
    "Tous nos véhicules sont récents, bien entretenus et équipés des dernières technologies pour garantir votre sécurité. " +
    "Profitez d'une conduite agréable avec des modèles modernes offrant confort et performance. " +
    "Parce que votre satisfaction est notre priorité, nous renouvelons régulièrement notre parc automobile.";
  return (
    <VoituressNeuves
      onClick={() => {
        setModalContent(modalContent);
        setModalJustClose(true);
      }}
    >
      <div className="icon">
        <IoCarSportSharp />
      </div>
      <p>Des voitures de location neuves</p>
    </VoituressNeuves>
  );
}

export default VoituresNeuves;
