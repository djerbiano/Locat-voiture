import styled from "styled-components";
import { BsTelephoneInboundFill } from "react-icons/bs";

const Assitance = styled.div`
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
function Assistance({ setModalContent, setModalJustClose }) {
  const modalContent = "Assistance 24 h / 24 h";
  return (
    <Assitance
      onClick={() => {
        setModalContent(modalContent);
        setModalJustClose(true);
      }}
    >
      <div className="icon">
        <BsTelephoneInboundFill />
      </div>
      <p>Assistance 24 h / 24 h</p>
    </Assitance>
  );
}

export default Assistance;
