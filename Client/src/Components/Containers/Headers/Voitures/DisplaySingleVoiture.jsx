import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 80vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  color: black;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Car = styled.div`
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    width: 100%;
  }
  img {
    width: 100%;
    aspect-ratio: 1;
    max-width: 500px;
    object-fit: contain;
  }

  .containerConfig {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 440px) {
      flex-wrap: wrap;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    span {
      margin: 10px;
    }
  }
`;

const DetailsCar = styled.div`
  width: 30%;
  padding: 20px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff7a;
  border-radius: 10px;

  @media (max-width: 900px) {
    width: 80%; 
  }
  @media (max-width: 700px) {
    width: 100%;
    padding: 10px;
  }

  button {
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    background-color: #c8152c;
    color: white;
    align-self: center;
    font-size: 1.2rem;
    &:hover {
      background-color: #ddd;
      color: black;
    }
  }
`;
function DisplaySingleVoiture({ setLoading, setModalJustClose, setContent }) {
  const { id } = useParams();
  const [oneCar, setOneCar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
      }
    };
    fetchCar();
    setLoading(false);
    // eslint-disable-next-line
  }, [id]);
  return (
    <Container>
      <Car>
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
      </Car>
      <DetailsCar>
        <h2 style={{ textTransform: "capitalize" }}>
          {oneCar?.marque} {oneCar?.modele}
        </h2>
        <br />
        <div className="description">
          <p>{oneCar?.description}</p>
        </div>
        <button type="button" onClick={() => navigate("/Reserver")}> Réserver</button>
      </DetailsCar>
    </Container>
  );
}

export default DisplaySingleVoiture;
