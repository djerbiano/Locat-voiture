import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
const Reservation = styled.div`
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
    min-width: 400px;
    min-height: 300px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  div:nth-child(1) {
    position: relative;

    img {
      position: absolute;
      bottom: 30%;
      right: 0;
      width: 50%;
      height: 50%;
      object-fit: contain;
    }
  }
`;

const Setting = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;

  select {
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
  }
`;

function SingleLocation({ setModalJustClose, setContent }) {
  const { idLocation } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const isAdmin = sessionStorage.getItem("isAdmin");

  const handleChange = (e) => {
    setUpdateStatus(e.target.value);
  };

  //get one booking
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!isAdmin || isAdmin === "false") {
        navigate("/");
        return null;
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/admin/bookings/${idLocation}`,
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
          setReservation(data.booking);
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
  }, [idLocation, isAdmin]);

  //calculate duration
  const duration = Math.ceil(
    (new Date(reservation.endDate) - new Date(reservation.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  //update booking status
  const updateBookingStatus = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/admin/bookings/updateBooking/${idLocation}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ status: updateStatus }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalJustClose(true);
        setContent(
          `Le nouveau statu de la réservation est : ${data.updatedBooking.status}`
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setModalJustClose(true);
        setContent(data.message);
      }
    } catch (error) {
      console.log(error);
      setModalJustClose(true);
      setContent(error.message);
    }
  };

  if (!isAdmin || isAdmin === "false") {
    return null;
  }
  return (
    <Container>
      <ButtonRetour type="button" onClick={() => navigate(-1)}>
        Retour
      </ButtonRetour>
      <h2>Reservation {reservation?.status}</h2>
      <div>
        <Reservation>
          <div>
            <h3>Véhicule:</h3>
            <p>Véhicule ID: {reservation?.voiture?._id}</p>
            <p>Marque: {reservation?.voiture?.marque}</p>
            <p>Modèle: {reservation?.voiture?.modele}</p>
            <p>Couleur: {reservation?.voiture?.color}</p>
            <p>Places: {reservation?.voiture?.place}</p>
            <p>Portes: {reservation?.voiture?.doors}</p>
            <p>Transmission: {reservation?.voiture?.transmission}</p>
            <p>Catégorie: {reservation?.voiture?.category}</p>
            <p>Carburant: {reservation?.voiture?.fuel}</p>
            <p>Prix par jour: {reservation?.voiture?.pricePerDay} €</p>

            <img
              src={`${process.env.REACT_APP_URL_SERVER}/images/${
                reservation?.voiture?.pictures?.pic1 || "avatarDefault.jpg"
              }`}
              alt={reservation?.voiture?.pictures?.pic1}
            />
          </div>

          <div>
            <h3>Réservation:</h3>
            <p>Réservation ID: {reservation?._id}</p>
            <p>
              Date de réservation:{" "}
              {new Date(reservation?.dateOfReservation).toLocaleString("fr-FR")}
            </p>
            <p>
              Départ: {reservation?.departAgence}{" "}
              {new Date(reservation?.startDate).toLocaleString("fr-FR")}
            </p>
            <p>
              Retour: {reservation?.retourAgence}{" "}
              {new Date(reservation?.endDate).toLocaleString("fr-FR")}
            </p>
            <p>Status: {reservation?.status}</p>
            <p>Durée: {duration ? duration : "Calcule en cours"} jours</p>
            <p>Total: {reservation?.price} €</p>
          </div>

          <div>
            <h3>Client:</h3>
            <p>Client ID: {reservation?.user?._id}</p>
            <p>Email: {reservation?.user?.email}</p>
            <p>
              Nom et prénom: {reservation?.user?.lastName}{" "}
              {reservation?.user?.name}
            </p>
            <p>Téléphone: {reservation?.user?.phone}</p>
            <p>Adresse: {reservation?.user?.address}</p>
          </div>
        </Reservation>
        <Setting>
          <h2>Changer le statut</h2>

          <Select>
            <label htmlFor="status">Statut:</label>
            <select id="status" name="status" onChange={handleChange}>
              <option value="">Modifier</option>
              <option value="En-attente">En attente</option>
              <option value="acceptée">Accepté</option>
              <option value="refusée">Refusé</option>
              <option value="annulée">Annulé</option>
              <option value="terminée">Terminée</option>
            </select>
            <ButtonRetour type="button" onClick={updateBookingStatus}>
              Modifier
            </ButtonRetour>
            <p style={{ fontSize: "0.8rem" }}>
              *status actuel {reservation?.status}
            </p>
          </Select>
        </Setting>
      </div>
    </Container>
  );
}

export default SingleLocation;
