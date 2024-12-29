import styled from "styled-components";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import SingleVoitureReservation from "./SingleVoitureReservation.jsx";
import SingleVoiture from "./SingleVoiture.jsx";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 80vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
  z-index: 2;
  background-color: white;
  border-radius: 10px;
  animation: move 2s ease infinite;

  @keyframes move {
    0% {
      transform: translateY(-5%);
    }
    50% {
      transform: translateY(5%);
    }
    100% {
      transform: translateY(-5%);
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
    props.$closeReservation ? "translateX(-200%)" : "translateX(0%)"};
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
      background-color: #c8152c;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
        color: black;
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

function Voitures({
  setLoading,
  searchCar,
  setSearchCar,
  setModalJustClose,
  setContent,
  searchCarData,
  setSearchCarData,
  setSearchWithiVoiturePage,
  searchWithiVoiturePage,
}) {
  const [car, setCar] = useState([]);
  const [closeReservation, setCloseReservation] = useState(true);
  const [formData, setFormData] = useState({
    departAgence: "",
    retourAgence: "",
    startDate: "",
    endDate: "",
    place: 1,
  });

  // récupération des voiture si la recherche est effectuée sur la page d'accueil ou afficher toutes les voitures
  useEffect(() => {
    if (!searchWithiVoiturePage) {
      setLoading(true);
      let findCar = searchCar
        ? `${process.env.REACT_APP_URL_SERVER}/bookings/bookingAvailable`
        : `${process.env.REACT_APP_URL_SERVER}/cars/all`;

      const getCars = async () => {
        try {
          const response = await fetch(findCar, {
            method: searchCar ? "POST" : "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: searchCar
              ? JSON.stringify({
                  departAgence: searchCarData.departAgence,
                  retourAgence: searchCarData.autreAgence
                    ? searchCarData.retourAgence
                    : searchCarData.departAgence,
                  startDate: searchCarData.startDate,
                  endDate: searchCarData.endDate,
                  place: searchCarData.place,
                })
              : null,
          });
          const data = await response.json();

          if (data.cars.length > 0) {
            setCar(data.cars);
          } else {
            setCar(data);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching cars:", error);
          setLoading(false);
          setModalJustClose(true);
          setContent("Erreur lors de la récupération des voitures");
        }
      };

      getCars();
    }
    // eslint-disable-next-line
  }, [searchCar, searchCarData, searchWithiVoiturePage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCloseReservation(true);
    setSearchWithiVoiturePage(true);
    setSearchCarData(formData);
    setSearchCar(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/bookings/bookingAvailable`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departAgence: formData.departAgence,
            retourAgence: formData.autreAgence
              ? formData.retourAgence
              : formData.departAgence,
            startDate: formData.startDate,
            endDate: formData.endDate,
            place: formData.place,
          }),
        }
      );
      const data = await response.json();
      if (data.cars.length > 0) {
        setCar(data.cars);
      } else {
        setCar(data);
      }

      setLoading(false);
      setSearchWithiVoiturePage(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Erreur lors de la récupération des voitures");
    }
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
              <label htmlFor="departAgence">Lieu de prise en charge</label>
              <select
                name="departAgence"
                id="departAgence"
                onChange={handleChange}
                value={formData.departAgence}
                required
              >
                <option value="">Sélectionnez une agence</option>
                <option value="Agence-de-paris">Agence-de-paris</option>
                <option value="Agence-de-nantes">Agence-de-nantes</option>
                <option value="Agence-de-lyon">Agence-de-lyon</option>
                <option value="Agence-de-marseille">Agence-de-marseille</option>
                <option value="Agence-de-bordeaux">Agence-de-bordeaux</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="retourAgence">Lieu de restitution</label>
              <select
                name="retourAgence"
                id="retourAgence"
                onChange={handleChange}
                value={formData.retourAgence}
                required
              >
                <option value="">Sélectionnez une agence</option>
                <option value="Agence-de-paris">Agence-de-paris</option>
                <option value="Agence-de-nantes">Agence-de-nantes</option>
                <option value="Agence-de-lyon">Agence-de-lyon</option>
                <option value="Agence-de-marseille">Agence-de-marseille</option>
                <option value="Agence-de-bordeaux">Agence-de-bordeaux</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="startDate">Date et heure de prise</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                onChange={handleChange}
                value={formData.startDate}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="endDate">Date et heure de retour</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                onChange={handleChange}
                value={formData.endDate}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="place">place</label>
              <input
                type="number"
                id="place"
                name="place"
                min="1"
                max="7"
                onChange={handleChange}
                value={formData.place}
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
        {searchCar === true ? (
          car?.message ? (
            <p
              style={{
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "transparent",
                fontSize: "2rem",
                width: "100%",
              }}
            >
              {car.message}
            </p>
          ) : (
            car?.map((car) => (
              <SingleVoitureReservation
                key={car._id}
                car={car}
                searchCarData={searchCarData}
              />
            ))
          )
        ) : car?.message ? (
          <p
            style={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "transparent",
              fontSize: "2rem",
              width: "100%",
            }}
          >
            {car.message}
          </p>
        ) : (
          car?.map((car) => <SingleVoiture key={car._id} car={car} />)
        )}
      </VoituresContainer>
    </Container>
  );
}

export default Voitures;
