import styled from "styled-components";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Content = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 1.2rem;
`;

const TitleReservation = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;
const SectionReservation = styled.div`
  width: 70%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReservationDetails = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  .date {
    display: flex;

    svg {
      margin: 0 10px;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #c8152c;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 20px;

    &:hover {
      background-color: #ddd;
      color: #333;
    }
  }
`;

const TitleReservationPassees = styled.h2`
  color: #333;
  margin: 20px;
`;
const SectionReservationPassees = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const SingleReservationPassees = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ccc;
  border-radius: 10px;

  .lieux {
    display: flex;
    svg {
      margin: 0 10px;
    }
  }

  .date {
    display: flex;

    svg {
      margin: 0 10px;
    }
  }

  .consulterReservation {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      padding: 10px 20px;
      background-color: #c8152c;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 20px;

      &:hover {
        background-color: #ddd;
        color: #333;
      }
    }
  }
`;

function ConsulterReservations() {
  const navigate = useNavigate();
  return (
    <Content>
      <TitleReservation>Ma réservation</TitleReservation>
      <SectionReservation>
        <ReservationDetails>
          <p>DUPOND Jean</p>
          <p>jean@gmail.fr</p>
          <p>+33752436521</p>
          <div className="date">
            <p>01/01/2024</p>
            <FaArrowRightArrowLeft />
            <p>05/01/2024</p>
          </div>
          <button>Actualisez vos données</button>
        </ReservationDetails>
      </SectionReservation>

      <TitleReservationPassees>
        Historique des réservations
      </TitleReservationPassees>
      <SectionReservationPassees>
        <SingleReservationPassees>
          <div className="lieux">
            <p>Agence de paris</p>
            <FaArrowRightArrowLeft />
            <p>Agence de nantes</p>
          </div>
          <div className="date">
            <p>01/01/2024</p>
            <FaArrowRightArrowLeft />
            <p>05/01/2024</p>
          </div>

          <div className="consulterReservation">
            <button onClick={() => navigate("/MesReservation/Reservation")}>
              Consulter la réservation
            </button>
          </div>
        </SingleReservationPassees>

        <SingleReservationPassees>
        <div className="lieux">
          <p>Agence de paris</p>
          <FaArrowRightArrowLeft />
          <p>Agence de nantes</p>
        </div>
        <div className="date">
          <p>01/01/2024</p>
          <FaArrowRightArrowLeft />
          <p>05/01/2024</p>
        </div>

        <div className="consulterReservation">
          <button onClick={() => navigate("/MesReservation/Reservation")}>
            Consulter la réservation
          </button>
        </div>
      </SingleReservationPassees>

      <SingleReservationPassees>
      <div className="lieux">
        <p>Agence de paris</p>
        <FaArrowRightArrowLeft />
        <p>Agence de nantes</p>
      </div>
      <div className="date">
        <p>01/01/2024</p>
        <FaArrowRightArrowLeft />
        <p>05/01/2024</p>
      </div>

      <div className="consulterReservation">
        <button onClick={() => navigate("/MesReservation/Reservation")}>
          Consulter la réservation
        </button>
      </div>
    </SingleReservationPassees>
      </SectionReservationPassees>
    </Content>
  );
}

export default ConsulterReservations;
