import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
`;

const ContainerDetails = styled.div`
  width: 70%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff7a;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerCar = styled.div`
  width: 30%;
  height: 100%;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  .containerImg {
    width: 100%;
    aspect-ratio: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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
`;

function DetailsPaiementCar({
  setLoading,
  setModalJustClose,
  setContent,
  searchCarData,
}) {
  const { id } = useParams();
  const [oneCar, setOneCar] = useState([]);



  // calculate duration
  const duration = Math.round(
    (new Date(searchCarData?.endDate) - new Date(searchCarData?.startDate)) /
      (1000 * 60 * 60 * 24)
  );
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
      <ContainerDetails></ContainerDetails>
      <ContainerCar>
        <h2 style={{ textTransform: "capitalize" }}>
          {oneCar?.marque} {oneCar?.modele}
        </h2>
        <div className="containerImg">
          <img
            src={`${process.env.REACT_APP_URL_SERVER}/images/${oneCar?.pictures?.pic1}`}
            alt={oneCar?.marque}
          />
        </div>

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
          <p>{searchCarData?.departAgence}</p>
          <p>{searchCarData?.startDate}</p>
          <h4>Retour:</h4>
          <p>{searchCarData?.retourAgence}</p>
          <p>{searchCarData?.endDate}</p>
          <h4>Durée:</h4>
          <p>{duration} jours</p>
          <h4>Détail du tarif :</h4>
          <p>Tarif journalier: {oneCar?.pricePerDay} $</p>
          <p>Total: {oneCar?.pricePerDay * duration} $</p>
        </div>
      </ContainerCar>
    </Container>
  );
}

export default DetailsPaiementCar;
