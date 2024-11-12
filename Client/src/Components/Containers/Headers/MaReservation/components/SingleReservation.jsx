import styled from "styled-components";
import Logo from "../../../../../Assets/TESLA-Model-Y.jpg";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 60%;
  min-height: 450px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 1260px) {
    width: 80%;
  }

  @media (max-width: 970px) {
    width: 90%;
  }

  @media (max-width: 750px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const VoitureContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerPhoto = styled.div`
  width: 200px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-image: url(${Logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 10px;
  margin-bottom: 10px;
`;

const VoitureInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

const ReservationContainer = styled.div`
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  > p {
    margin-bottom: 20px;
  }
  div {
    button {
      padding: 10px 20px;
      background-color: #96d900;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border: none;
      font-size: 1.1rem;
      font-weight: bold;

      &:hover {
        background-color: #7bb005;
      }
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Lieux = styled.div`
  min-height: 50px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #96d900;
  svg {
    margin: 0 10px;
    height: 100%;
  }

  @media (max-width: 750px) {
    margin-bottom: 20px;
  }

  @media (max-width: 408px) {
    width: 100%;
    font-size: 3.7vw;
  }

  @media (max-width: 354px) {
    flex-direction: column;
    font-size: 1rem;

    svg {
      margin: 10px;
      font-size: 1.5rem;
    }
  }
`;
function SingleReservation() {
  return (
    <Container>
      <Content>
        <VoitureContainer>
          <ContainerPhoto></ContainerPhoto>

          <VoitureInfos>
            <p>clio 3</p>
            <div>
              <p>150 € / jour</p>
            </div>
          </VoitureInfos>
        </VoitureContainer>

        <ReservationContainer>
          <Lieux>
            <h3>Agence de paris</h3>
            <FaArrowRightArrowLeft />
            <h3>Agence de lyon</h3>
          </Lieux>
          <h4>Numéro de réservation</h4>
          <p>12456</p>
          <h4>Date et heure de départ</h4>
          <p>2024-01-01 10:00</p>
          <h4>Date et heure de retour</h4>
          <p>2024-01-02 18:00</p>
          <h4>Durée de location</h4>
          <p>2 jours</p>
          <h4>Prix total</h4>
          <p>300 €</p>
          <div>
            <button>Supprimer la réservation</button>
          </div>
        </ReservationContainer>
      </Content>
    </Container>
  );
}

export default SingleReservation;
