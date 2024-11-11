import styled from "styled-components";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import SingleVoiture from "./SingleVoiture.jsx";
import { useState } from "react";
const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 80vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  position: relative;
`;
const CloseButton = styled.div`
  position: fixed;
  top: 13vh;
  left: 0px;
  cursor: pointer;
  z-index: 2;
  background-color: white;
  border-radius: 10px;
  animation: spin 2s ease infinite;

  @keyframes spin {
    0% {
      transform: translateY(-10%);
    }
    50% {
      transform: translateY(10%);
    }
    100% {
      transform: translateY(-10%);
    }
  }

  svg {
    color: black;
    font-size: 40px;
    display: block;
    margin: auto;
  }
`;

const Content = styled.div`
  position: fixed;
  width: 25vw;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  transform: ${(props) =>
    props.$closeReservation ? "translateX(-100%)" : "translateX(0%)"};
  opacity: ${(props) => (props.$closeReservation ? "0" : "1")};
  transition: all 0.5s ease;

  @media (max-width: 800px) {
    width: 95%;
    max-width: 95%;
    transition: all 0.2s ease;
    flex-wrap: wrap;
  }
`;
const ReservationContainer = styled.div``;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  .item {
    width: 90%;
    display: flex;
    flex-direction: column;

    label {
      text-align: left;
      margin-bottom: 5px;
    }

    select {
      width: 100%;
      height: 50px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      font-size: 1rem;
      color: black;
    }

    input {
      width: 100%;
      height: 50px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      font-size: 1rem;
      color: black;
    }

    button {
      width: 50%;
      height: 50px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      font-size: 1rem;
      color: black;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: #ddd;
      }

      @media (max-width: 850px) {
        width: 100%;
        transition: all 0.2s ease;
      }
    }
  }

  > :nth-child(5) {
    input {
      width: 80px;
      text-align: center;
      font-weight: bold;
      transition: all 0.2s ease;

      @media (max-width: 850px) {
        width: 80%;
        transition: all 0.2s ease;
      }
    }
  }

  > :nth-child(6) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 800px) {
    transition: all 0.2s ease;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    > :nth-child(5) {
      input {
        width: 100px;
        transition: all 0.2s ease;
      }
    }

    > :nth-child(6) {
      width: 50%;
      transition: all 0.2s ease;
    }
  }
`;

const VoituresContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 645px) {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  > * {
    width: calc(100% / 4.5);
    padding: 10px;
    transition: all 0.2s ease;
    background-color: #2e2f33;

    @media (max-width: 1469px) {
      width: calc(100% / 3.3);
    }
    @media (max-width: 1349px) {
      width: calc(100% / 3.4);
    }
    @media (max-width: 1050px) {
      width: calc(100% / 3.42);
    }
    @media (max-width: 1007px) {
      width: calc(100% / 3.5);
    }
    @media (max-width: 870px) {
      width: calc(100% / 2.3);
    }

    @media (max-width: 645px) {
      width: 80%;
    }
  }

  > :last-child {
  }
`;

function Voitures() {
  const [closeReservation, setCloseReservation] = useState(false);
  const [formData, setFormData] = useState({
    agenceDepart: "",
    agenceRetour: "",
    dateDepart: "",
    dateRetour: "",
    places: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
  };
  return (
    <Container>
      <CloseButton
        onClick={() => setCloseReservation(!closeReservation)}
        $closeReservation={closeReservation}
      >
        {closeReservation ? (
          <MdOutlineMenuOpen />
        ) : (
          <IoMdCloseCircle color="red" />
        )}
      </CloseButton>
      <Content $closeReservation={closeReservation}>
        <ReservationContainer>
          <Form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="agenceDepart">Lieu de prise en charge</label>
              <select
                name="agenceDepart"
                id="agenceDepart"
                onChange={handleChange}
                value={formData.agenceDepart}
                required
              >
                <option value="">Sélectionnez une agence</option>
                <option value="Agence de paris">Agence de paris</option>
                <option value="Agence de nantes">Agence de nantes</option>
                <option value="Agence de lyon">Agence de lyon</option>
                <option value="Agence de marseille">Agence de marseille</option>
                <option value="Agence de bordeaux">Agence de bordeaux</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="agenceRetour">Lieu de restitution</label>
              <select
                name="agenceRetour"
                id="agenceRetour"
                onChange={handleChange}
                value={formData.agenceRetour}
                required
              >
                <option value="">Sélectionnez une agence</option>
                <option value="Agence de paris">Agence de paris</option>
                <option value="Agence de nantes">Agence de nantes</option>
                <option value="Agence de lyon">Agence de lyon</option>
                <option value="Agence de marseille">Agence de marseille</option>
                <option value="Agence de bordeaux">Agence de bordeaux</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="dateDepart">Date et heure de prise</label>
              <input
                type="datetime-local"
                id="dateDepart"
                name="dateDepart"
                onChange={handleChange}
                value={formData.dateDepart}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="dateRetour">Date et heure de retour</label>
              <input
                type="datetime-local"
                id="dateRetour"
                name="dateRetour"
                onChange={handleChange}
                value={formData.dateRetour}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="places">Places</label>
              <input
                type="number"
                id="places"
                name="places"
                min="1"
                max="7"
                onChange={handleChange}
                value={formData.places}
                required
              />
            </div>
            <div className="item">
              <button type="submit">Rechercher</button>
            </div>
          </Form>
        </ReservationContainer>
      </Content>
      <VoituresContainer>
        <SingleVoiture />
        <SingleVoiture />
      </VoituresContainer>
    </Container>
  );
}

export default Voitures;
