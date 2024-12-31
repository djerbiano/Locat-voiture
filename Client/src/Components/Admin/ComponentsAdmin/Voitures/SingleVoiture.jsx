import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateCar from "./UpdateCar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  min-height: 70vh;
  background-color: #fefefea8;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;

  h2 {
    margin: 20px 0px;
  }
`;
const ButtonRetour = styled.button`
  width: 100px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #a50a1e;
  }
`;
const Voiture = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  p {
    text-transform: capitalize;
  }
  div {
    padding: 10px;
    width: 100%;
    min-height: 600px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    img {
      position: absolute;
      bottom: 30%;
      right: 0;
      width: 70%;
      height: 70%;
      object-fit: contain;
    }

    .updateButton {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 100px;
      height: 50px;
      border-radius: 5px;
      border: none;
      padding: 5px;
      background-color: #058d16;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      &:hover {
        background-color: rgb(3, 108, 17);
      }
    }
  }
`;

function SingleVoiture({ setModalJustClose, setContent }) {
  const { idVoiture } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const isAdmin = sessionStorage.getItem("isAdmin");

  //get one car
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!isAdmin || isAdmin === "false") {
        navigate("/");
        return null;
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/cars/admin/${idVoiture}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCar(data.car);
        } else {
          setModalJustClose(true);
          setContent(data.message);
          console.error(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [idVoiture, isAdmin]);

  if (!isAdmin || isAdmin === "false") {
    return null;
  }
  
  return updateModal === true ? (
    <UpdateCar car={car} setUpdateModal={setUpdateModal} setModalJustClose={setModalJustClose} setContent={setContent} />
  ) : (
    <Container>
      <ButtonRetour type="button" onClick={() => navigate(-1)}>
        Retour
      </ButtonRetour>

      <Voiture>
        <div>
          <h3>Véhicule:</h3>
          <br />
          <p>Véhicule ID: {car?._id}</p>
          <p>Louable: {car?.available ? "oui" : "non"}</p>
          <p>Stock: {car?.stockOfCar}</p>
          <p>Marque: {car?.marque}</p>
          <p>Modèle: {car?.modele}</p>
          <p>Couleur: {car?.color}</p>
          <p>Places: {car?.place}</p>
          <p>Portes: {car?.doors}</p>
          <p>Transmission: {car?.transmission}</p>
          <p>Catégorie: {car?.category}</p>
          <p>Carburant: {car?.fuel}</p>
          <p>Prix par jour: {car?.pricePerDay} €</p>
          <br />
          <p>Description : {car?.description}</p>

          <img
            src={`${process.env.REACT_APP_URL_SERVER}/images/${
              car?.pictures?.pic1 || "avatarDefault.gif"
            }`}
            alt={car?.pictures?.pic1}
          />
          <button
            type="button"
            className="updateButton"
            onClick={() => setUpdateModal(true)}
          >
            Modifier
          </button>
        </div>
      </Voiture>
    </Container>
  );
}

export default SingleVoiture;
