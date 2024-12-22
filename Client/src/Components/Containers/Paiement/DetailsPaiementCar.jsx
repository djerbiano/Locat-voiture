import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";

const Container = styled.div`
  min-width: 100%;
  min-height: 80vh;
  display: flex;
  gap: 20px;
  padding: 10px;
  transition: all 0.2s ease;
  @media (max-width: 500px) {
    transform: translateX(-5vw);
    padding: 0;
  }
  @media (max-width: 400px) {
    transform: translateX(-7vw);
  }
`;

const ContainerCar = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  color: black;

  p,
  h3 {
    margin-bottom: 10px;
  }
  p,
  h4,
  span {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const PersonnelDetails = styled.div`
  text-transform: capitalize;
  word-wrap: break-word;
  margin-bottom: 10px;
  padding: 20px;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ContainerCarDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  text-transform: capitalize;
  margin-bottom: 10px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;

  button {
    width: 150px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    background-color: #96d900;
    color: black;
    cursor: pointer;
    font-size: 1.3rem;
    align-self: end;

    @media (max-width: 800px) {
      align-self: center;
    }

    @media (max-width: 360px) {
      width: 90%;
    }

    &:hover {
      background-color: #84bd04;
    }
  }
`;

const Booking = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .containerImg {
    width: 30vw;
    @media (max-width: 800px) {
      width: 60vw;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .bookingDetails {
    min-width: 50%;
    @media (max-width: 800px) {
      min-width: 100%;
    }
    .containerConfig {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      font-weight: bold;
      font-size: 1.2rem;

      span {
        font-size: 1.2rem;
      }

      svg {
        margin: 0px 10px;
      }

      > div {
        margin-bottom: 20px;
      }
    }
  }
`;

function DetailsPaiementCar({
  setLoading,
  setModalJustClose,
  setContent,
  searchCarData,
  setPayement,
  setValidatePayement,
}) {
  const { id } = useParams();
  const [oneCar, setOneCar] = useState([]);
  const [personnelDetails, setPersonnelDetails] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // calculate duration
  const duration = Math.ceil(
    (new Date(searchCarData?.endDate) - new Date(searchCarData?.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  // get personnel details
  useEffect(() => {
    setLoading(true);
    const getPersonnel = async () => {
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_URL_SERVER
          }/api/auth/user/${sessionStorage.getItem("userId")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();

        setPersonnelDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching personnel :", error);
        setLoading(false);
        setModalJustClose(true);
        setContent("Erreur lors de la récupération de vos informations");
      }
    };

    getPersonnel();

    //eslint-disable-next-line
  }, []);

  // fetch car data
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCar = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_URL_SERVER}/cars/${id}`
          );
          const data = await response.json();
          if (data.car) {
            setOneCar(data.car);
          } else {
            setOneCar(data);
          }
        } catch (error) {
          console.error("Error fetching cars:", error);
          setLoading(false);
          setModalJustClose(true);
          setContent("Erreur lors de la récupération des voitures");
        } finally {
          setLoading(false);
        }
      };
      fetchCar();
    }

    // eslint-disable-next-line
  }, [id]);

  //handlePaymentData transfert to reserver page and CreditCard
  const handlePayment = () => {
    const user = sessionStorage.getItem("userId");
    setPayement(true);
    setValidatePayement({
      user,
      voiture: id,
      departAgence: searchCarData?.departAgence,
      retourAgence: searchCarData?.retourAgence
        ? searchCarData?.retourAgence
        : searchCarData?.departAgence,
      startDate: searchCarData?.startDate,
      endDate: searchCarData?.endDate,
      price: oneCar?.pricePerDay * duration,
      status: "En-attente",
    });
  };

  return oneCar?.message ? (
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
        color: "black",
      }}
    >
      {oneCar.message}
    </p>
  ) : (
    <Container>
      <ContainerCar>
        {token && (
          <PersonnelDetails>
            <h1>Informations personnelles :</h1>
            <p>Nom: {personnelDetails?.lastName} </p>
            <p>Prenom: {personnelDetails?.name} </p>
            <p>Email: {personnelDetails?.email} </p>
            <p>Téléphone: {personnelDetails?.phone} </p>
            <p>Adresse: {personnelDetails?.address} </p>
          </PersonnelDetails>
        )}
        <ContainerCarDetails>
          <h2>Détails de la location :</h2>
          <Booking>
            <div className="containerImg">
              <img
                src={`${process.env.REACT_APP_URL_SERVER}/images/${oneCar?.pictures?.pic1}`}
                alt={oneCar?.marque}
              />
            </div>

            <div className="bookingDetails">
              <h2>
                {oneCar?.marque} {oneCar?.modele}
              </h2>
              <div className="containerConfig">
                <div className="personnes">
                  <FaUserAlt />
                  <span>{oneCar?.place}</span>
                </div>

                <div className="door">
                  <GiCarDoor />
                  <span>{oneCar?.doors}</span>
                </div>

                <div className="transmission">
                  <TbManualGearboxFilled />
                  <span>{oneCar?.transmission}</span>
                </div>

                <div className="fuel">
                  <BsFillFuelPumpFill />
                  <span>{oneCar?.fuel}</span>
                </div>
              </div>

              <div className="detailsBooking">
                <h3>Détails de la réservation</h3>

                <h4>Départ:</h4>
                <p>{searchCarData?.departAgence?.replace(/-/g, " ")}</p>

                <p>
                  {new Date(searchCarData?.startDate)
                    .toLocaleString()
                    .replace("-", "/")
                    .slice(0, 16)}
                </p>

                <h4>Retour:</h4>
                <p>
                  {searchCarData?.retourAgence
                    ? searchCarData?.retourAgence?.replace(/-/g, " ")
                    : searchCarData?.departAgence?.replace(/-/g, " ")}
                </p>
                <p>
                  {new Date(searchCarData?.endDate)
                    .toLocaleString()
                    .replace("-", "/")
                    .slice(0, 16)}
                </p>
                <h4>Durée:</h4>
                <p>{duration} jours</p>
                <h4>Détail du tarif :</h4>
                <p>Tarif journalier: {oneCar?.pricePerDay} $</p>
                <p>Total: {oneCar?.pricePerDay * duration} $</p>
              </div>
            </div>
          </Booking>
          {token ? (
            <button onClick={handlePayment}>Payer</button>
          ) : (
            <button
              style={{ minWidth: "170px" }}
              onClick={() => navigate("/MesReservation")}
            >
              Connectez-vous
            </button>
          )}
        </ContainerCarDetails>
      </ContainerCar>
    </Container>
  );
}

export default DetailsPaiementCar;
